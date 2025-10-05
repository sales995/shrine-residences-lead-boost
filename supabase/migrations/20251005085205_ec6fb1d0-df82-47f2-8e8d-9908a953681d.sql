-- Ensure RLS is enabled on leads table
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Drop existing SELECT policy to recreate it more explicitly
DROP POLICY IF EXISTS "Admins can view all leads" ON public.leads;

-- Create explicit SELECT policy that only allows authenticated admins
CREATE POLICY "Only authenticated admins can view leads"
ON public.leads
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add explicit policy to deny all public/anonymous SELECT access
CREATE POLICY "Deny anonymous access to leads"
ON public.leads
FOR SELECT
TO anon
USING (false);

-- Update the INSERT policy to be more explicit about its purpose
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;

CREATE POLICY "Public can submit lead forms"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Add a comment documenting the security model
COMMENT ON TABLE public.leads IS 'Contains sensitive customer contact information. Protected by RLS - only authenticated admin users can view leads, but anyone can submit via lead forms.';