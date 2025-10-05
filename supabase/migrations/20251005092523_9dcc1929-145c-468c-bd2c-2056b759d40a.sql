-- Secure lead submissions and rate limiting policies

-- 1) Leads: deny public inserts (edge function with service role will bypass RLS)
DROP POLICY IF EXISTS "Public can submit lead forms" ON public.leads;
DROP POLICY IF EXISTS "Deny public lead inserts" ON public.leads; -- in case it exists from previous attempts
CREATE POLICY "Deny public lead inserts"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (false);

-- 2) submission_rate_limit: replace blanket denial with admin-only management (service role bypasses RLS)
DROP POLICY IF EXISTS "System manages rate limits" ON public.submission_rate_limit;
DROP POLICY IF EXISTS "Admins can view rate limits" ON public.submission_rate_limit;
DROP POLICY IF EXISTS "Admins can manage rate limits" ON public.submission_rate_limit;

CREATE POLICY "Admins can view rate limits"
ON public.submission_rate_limit
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage rate limits"
ON public.submission_rate_limit
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 3) Ensure unique identifier index for atomic upserts
CREATE UNIQUE INDEX IF NOT EXISTS submission_rate_limit_identifier_key ON public.submission_rate_limit(identifier);
