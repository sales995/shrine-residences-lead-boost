-- Fix profiles table RLS policies
-- Drop all existing SELECT policies to start fresh
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Profiles owner-or-admin (restrictive select)" ON public.profiles;
DROP POLICY IF EXISTS "Profiles owner-or-admin (restrictive update)" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Create a single, clear SELECT policy (permissive)
-- Only authenticated users can view their own profile OR admins can view any profile
CREATE POLICY "Users can view own profile, admins view all"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  auth.uid() = id 
  OR has_role(auth.uid(), 'admin'::app_role)
);

-- Create a single, clear UPDATE policy (permissive)
-- Only authenticated users can update their own profile OR admins can update any profile
CREATE POLICY "Users can update own profile, admins update all"
ON public.profiles
FOR UPDATE
TO authenticated
USING (
  auth.uid() = id 
  OR has_role(auth.uid(), 'admin'::app_role)
)
WITH CHECK (
  auth.uid() = id 
  OR has_role(auth.uid(), 'admin'::app_role)
);

-- Ensure INSERT policies are secure
DROP POLICY IF EXISTS "Deny anonymous profile creation" ON public.profiles;
DROP POLICY IF EXISTS "Users can create own profile" ON public.profiles;

-- Only allow profile creation for the authenticated user's own ID
-- This should typically be done via trigger, not direct insert
CREATE POLICY "Users can only insert own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Explicitly deny DELETE to prevent profile deletion
CREATE POLICY "Prevent profile deletion"
ON public.profiles
FOR DELETE
TO authenticated
USING (false);