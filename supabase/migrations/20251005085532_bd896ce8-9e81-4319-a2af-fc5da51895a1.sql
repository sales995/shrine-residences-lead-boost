-- Add explicit policy to deny anonymous INSERT to profiles
CREATE POLICY "Deny anonymous profile creation"
ON public.profiles
FOR INSERT
TO anon
WITH CHECK (false);

-- Allow authenticated users to insert their own profile
CREATE POLICY "Users can create own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Update table comment to document the security model
COMMENT ON TABLE public.profiles IS 'User profile information. Protected by RLS - users can only view and update their own profile. Profile creation happens automatically via trigger on user signup or manually by the user themselves.';