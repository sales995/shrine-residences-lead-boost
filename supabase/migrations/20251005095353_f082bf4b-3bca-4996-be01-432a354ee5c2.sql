-- Add RESTRICTIVE policies for profiles table to prevent policy conflicts
-- These act as a hard floor that MUST be satisfied for any operation

CREATE POLICY "Profiles owner-or-admin (restrictive select)"
ON public.profiles
AS RESTRICTIVE
FOR SELECT
TO authenticated, anon
USING (auth.uid() = id OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Profiles owner-or-admin (restrictive update)"
ON public.profiles
AS RESTRICTIVE
FOR UPDATE
TO authenticated, anon
USING (auth.uid() = id OR has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (auth.uid() = id OR has_role(auth.uid(), 'admin'::app_role));

-- Add RESTRICTIVE policies for leads table to enforce admin-only access
-- Service role edge functions bypass RLS, so lead submissions will still work

CREATE POLICY "Leads admin-only (restrictive select)"
ON public.leads
AS RESTRICTIVE
FOR SELECT
TO authenticated, anon
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Leads admin-only (restrictive delete)"
ON public.leads
AS RESTRICTIVE
FOR DELETE
TO authenticated, anon
USING (has_role(auth.uid(), 'admin'::app_role));