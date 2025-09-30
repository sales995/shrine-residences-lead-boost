-- Create leads table to store contact form submissions
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  message TEXT,
  source TEXT NOT NULL, -- Which form: 'hero', 'contact', etc.
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  CONSTRAINT phone_format CHECK (phone ~ '^[0-9+\-\s()]+$')
);

-- Add index for faster queries
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX idx_leads_source ON public.leads(source);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert leads (public forms)
CREATE POLICY "Anyone can insert leads"
  ON public.leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy for viewing leads (for future admin access)
CREATE POLICY "Service role can view all leads"
  ON public.leads
  FOR SELECT
  TO service_role
  USING (true);

-- Add comment for documentation
COMMENT ON TABLE public.leads IS 'Stores contact form submissions from various CTAs on the website';
COMMENT ON COLUMN public.leads.source IS 'Identifies which form the lead came from: hero, contact, lead-form, etc.';