-- Drop the existing restrictive SELECT policy on profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

-- Create a PERMISSIVE SELECT policy allowing authenticated users to view their own profile
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Explicitly block anonymous SELECT access
CREATE POLICY "Block anonymous profile reads"
ON public.profiles
FOR SELECT
TO anon
USING (false);

-- Update table comment to document the security model
COMMENT ON TABLE public.profiles IS 'User profile information. RLS enabled: authenticated users can only view and update their own profile. Anonymous access is explicitly blocked.';