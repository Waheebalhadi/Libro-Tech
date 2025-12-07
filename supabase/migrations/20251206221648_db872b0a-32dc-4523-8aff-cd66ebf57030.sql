-- Enable RLS on services table
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Anyone can view services"
ON public.services FOR SELECT
USING (true);

-- Allow authenticated users to insert services
CREATE POLICY "Authenticated users can insert services"
ON public.services FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update services
CREATE POLICY "Authenticated users can update services"
ON public.services FOR UPDATE
USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete services
CREATE POLICY "Authenticated users can delete services"
ON public.services FOR DELETE
USING (auth.role() = 'authenticated');

-- Create storage bucket for service icons
INSERT INTO storage.buckets (id, name, public)
VALUES ('service-icons', 'service-icons', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for service-icons bucket
CREATE POLICY "Public can view service icons"
ON storage.objects FOR SELECT
USING (bucket_id = 'service-icons');

CREATE POLICY "Authenticated users can upload service icons"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'service-icons' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update service icons"
ON storage.objects FOR UPDATE
USING (bucket_id = 'service-icons' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete service icons"
ON storage.objects FOR DELETE
USING (bucket_id = 'service-icons' AND auth.role() = 'authenticated');