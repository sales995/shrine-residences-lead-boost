-- Drop the existing restrictive INSERT policy
DROP POLICY IF EXISTS "Public can submit lead forms" ON public.leads;

-- Create a PERMISSIVE INSERT policy to allow public lead submissions
CREATE POLICY "Public can submit lead forms"
ON public.leads
FOR INSERT
TO public
WITH CHECK (true);

-- Ensure the SELECT policies remain restrictive (admin-only viewing)
-- Drop and recreate the admin SELECT policy as PERMISSIVE
DROP POLICY IF EXISTS "Only authenticated admins can view leads" ON public.leads;

CREATE POLICY "Only authenticated admins can view leads"
ON public.leads
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Drop the restrictive deny anonymous SELECT policy (no longer needed with permissive approach)
DROP POLICY IF EXISTS "Deny anonymous access to leads" ON public.leads;

-- Ensure the DELETE policy is PERMISSIVE for admins
DROP POLICY IF EXISTS "Admins can delete leads" ON public.leads;

CREATE POLICY "Admins can delete leads"
ON public.leads
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add table comment to document the security model
COMMENT ON TABLE public.leads IS 'Lead form submissions. RLS enabled: anyone can submit (INSERT), only authenticated admins can view (SELECT) and delete (DELETE).';