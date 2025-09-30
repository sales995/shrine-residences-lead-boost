-- Add unique constraint on phone number to prevent duplicates
ALTER TABLE public.leads ADD CONSTRAINT leads_phone_unique UNIQUE (phone);

-- Add check constraint for valid Indian mobile numbers (10 digits starting with 6-9)
ALTER TABLE public.leads ADD CONSTRAINT leads_phone_format_check 
  CHECK (phone ~ '^[6-9][0-9]{9}$');