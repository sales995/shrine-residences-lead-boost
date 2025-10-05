-- Create rate limiting table to track submission attempts
CREATE TABLE IF NOT EXISTS public.submission_rate_limit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier text NOT NULL, -- IP address or browser fingerprint
  submission_count integer DEFAULT 1,
  first_submission_at timestamp with time zone DEFAULT now(),
  last_submission_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on rate limit table
ALTER TABLE public.submission_rate_limit ENABLE ROW LEVEL SECURITY;

-- Only allow system to manage rate limits (no public access)
CREATE POLICY "System manages rate limits"
ON public.submission_rate_limit
FOR ALL
USING (false);

-- Create index for faster lookups
CREATE INDEX idx_rate_limit_identifier ON public.submission_rate_limit(identifier);
CREATE INDEX idx_rate_limit_last_submission ON public.submission_rate_limit(last_submission_at);

-- Create audit log table for lead access tracking
CREATE TABLE IF NOT EXISTS public.lead_access_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  action text NOT NULL, -- 'view', 'export', 'delete'
  lead_id uuid,
  metadata jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.lead_access_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs"
ON public.lead_access_log
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- System can insert audit logs
CREATE POLICY "System can insert audit logs"
ON public.lead_access_log
FOR INSERT
WITH CHECK (true);

-- Add message length constraint to leads table
ALTER TABLE public.leads 
ADD CONSTRAINT leads_message_length_check 
CHECK (char_length(message) <= 1000);

-- Add name length constraint
ALTER TABLE public.leads 
ADD CONSTRAINT leads_name_length_check 
CHECK (char_length(name) <= 100 AND char_length(name) > 0);

-- Add email length constraint
ALTER TABLE public.leads 
ADD CONSTRAINT leads_email_length_check 
CHECK (char_length(email) <= 255);

-- Function to clean up old rate limit entries (older than 24 hours)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.submission_rate_limit
  WHERE last_submission_at < now() - interval '24 hours';
END;
$$;

COMMENT ON TABLE public.submission_rate_limit IS 'Tracks submission attempts to prevent bot spam. Records are automatically cleaned after 24 hours.';
COMMENT ON TABLE public.lead_access_log IS 'Audit log for tracking admin access to lead data for compliance and security monitoring.';