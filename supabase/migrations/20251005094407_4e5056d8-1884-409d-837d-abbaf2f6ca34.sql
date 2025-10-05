-- Drop the flawed permissive policy
DROP POLICY IF EXISTS "Deny anonymous access to user_roles" ON public.user_roles;

-- Create a RESTRICTIVE SELECT policy that enforces owner-only access
-- This acts as a hard limit that MUST be satisfied for any SELECT query
CREATE POLICY "Users can only access own roles"
ON public.user_roles
AS RESTRICTIVE
FOR SELECT
TO authenticated, anon
USING (auth.uid() = user_id);