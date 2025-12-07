-- Create a general media storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('media-library', 'media-library', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for media-library bucket
CREATE POLICY "Public can view media library"
ON storage.objects FOR SELECT
USING (bucket_id = 'media-library');

CREATE POLICY "Authenticated users can upload to media library"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'media-library' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update media library"
ON storage.objects FOR UPDATE
USING (bucket_id = 'media-library' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete from media library"
ON storage.objects FOR DELETE
USING (bucket_id = 'media-library' AND auth.role() = 'authenticated');

-- Create a blog-assets bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-assets', 'blog-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for blog-assets bucket
CREATE POLICY "Public can view blog assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-assets');

CREATE POLICY "Authenticated users can upload blog assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update blog assets"
ON storage.objects FOR UPDATE
USING (bucket_id = 'blog-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete blog assets"
ON storage.objects FOR DELETE
USING (bucket_id = 'blog-assets' AND auth.role() = 'authenticated');