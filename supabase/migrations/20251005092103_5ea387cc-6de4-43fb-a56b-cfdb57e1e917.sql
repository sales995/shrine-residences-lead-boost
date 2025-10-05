-- Fix audit log security: Remove unrestricted INSERT policy
-- Audit logs should only be inserted by backend system processes using service role

-- Drop both the old permissive policy and any existing restrictive policy
DROP POLICY IF EXISTS "System can insert audit logs" ON public.lead_access_log;
DROP POLICY IF EXISTS "Deny public audit log insertion" ON public.lead_access_log;

-- Create a new restricted policy that denies all public INSERT operations
-- Backend code using service role will bypass RLS entirely
CREATE POLICY "Audit logs restricted to service role"
ON public.lead_access_log
FOR INSERT
TO authenticated, anon
WITH CHECK (false);

-- Note: Backend edge functions using service role key can still insert audit logs
-- because service role bypasses RLS policies entirely