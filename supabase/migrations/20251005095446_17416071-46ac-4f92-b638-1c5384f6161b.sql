-- Remove conflicting blanket deny policy on profiles to avoid ambiguous evaluation
DROP POLICY IF EXISTS "Block anonymous profile reads" ON public.profiles;