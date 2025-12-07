-- Create storage bucket for homepage images
INSERT INTO storage.buckets (id, name, public)
VALUES ('homepage-assets', 'homepage-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for homepage-assets bucket
CREATE POLICY "Public can view homepage assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'homepage-assets');

CREATE POLICY "Authenticated users can upload homepage assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'homepage-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update homepage assets"
ON storage.objects FOR UPDATE
USING (bucket_id = 'homepage-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete homepage assets"
ON storage.objects FOR DELETE
USING (bucket_id = 'homepage-assets' AND auth.role() = 'authenticated');

-- Enable RLS on homepage table
ALTER TABLE public.homepage ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Anyone can view homepage"
ON public.homepage FOR SELECT
USING (true);

-- Allow authenticated users to update homepage
CREATE POLICY "Authenticated users can update homepage"
ON public.homepage FOR UPDATE
USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert homepage data
CREATE POLICY "Authenticated users can insert homepage"
ON public.homepage FOR INSERT
WITH CHECK (auth.role() = 'authenticated');