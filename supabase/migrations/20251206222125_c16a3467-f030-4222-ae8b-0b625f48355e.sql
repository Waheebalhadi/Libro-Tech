-- Enable RLS on industries table
ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Anyone can view industries"
ON public.industries FOR SELECT
USING (true);

-- Allow authenticated users to manage industries
CREATE POLICY "Authenticated users can insert industries"
ON public.industries FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update industries"
ON public.industries FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete industries"
ON public.industries FOR DELETE
USING (auth.role() = 'authenticated');

-- Create storage bucket for industry media
INSERT INTO storage.buckets (id, name, public)
VALUES ('industry-media', 'industry-media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for industry-media bucket
CREATE POLICY "Public can view industry media"
ON storage.objects FOR SELECT
USING (bucket_id = 'industry-media');

CREATE POLICY "Authenticated users can upload industry media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'industry-media' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update industry media"
ON storage.objects FOR UPDATE
USING (bucket_id = 'industry-media' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete industry media"
ON storage.objects FOR DELETE
USING (bucket_id = 'industry-media' AND auth.role() = 'authenticated');