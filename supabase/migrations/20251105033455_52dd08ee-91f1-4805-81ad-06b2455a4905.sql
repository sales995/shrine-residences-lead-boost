-- Create table to track available units
CREATE TABLE public.available_units (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  units_remaining INTEGER NOT NULL DEFAULT 40,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.available_units ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Anyone can view available units" 
ON public.available_units 
FOR SELECT 
USING (true);

-- Create policy for authenticated users to update (admin only)
CREATE POLICY "Authenticated users can update units" 
ON public.available_units 
FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Insert initial record
INSERT INTO public.available_units (units_remaining) VALUES (40);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.available_units;