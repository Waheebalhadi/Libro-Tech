-- Drop existing INSERT/UPDATE/DELETE policies and recreate with anon access
DO $$
BEGIN
  -- Drop existing upload/update/delete policies
  DROP POLICY IF EXISTS "Authenticated users can upload to homepage-assets" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can upload to service-icons" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can upload to industry-media" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can upload to media-library" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can upload to blog-assets" ON storage.objects;
  
  DROP POLICY IF EXISTS "Authenticated users can update in homepage-assets" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can update in service-icons" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can update in industry-media" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can update in media-library" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can update in blog-assets" ON storage.objects;
  
  DROP POLICY IF EXISTS "Authenticated users can delete from homepage-assets" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can delete from service-icons" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can delete from industry-media" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can delete from media-library" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can delete from blog-assets" ON storage.objects;
END $$;

-- Create INSERT policies (allow all users to upload)
CREATE POLICY "Anyone can upload to homepage-assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'homepage-assets');

CREATE POLICY "Anyone can upload to service-icons"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'service-icons');

CREATE POLICY "Anyone can upload to industry-media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'industry-media');

CREATE POLICY "Anyone can upload to media-library"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'media-library');

CREATE POLICY "Anyone can upload to blog-assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog-assets');

-- Create UPDATE policies (allow all users to update)
CREATE POLICY "Anyone can update in homepage-assets"
ON storage.objects FOR UPDATE
USING (bucket_id = 'homepage-assets');

CREATE POLICY "Anyone can update in service-icons"
ON storage.objects FOR UPDATE
USING (bucket_id = 'service-icons');

CREATE POLICY "Anyone can update in industry-media"
ON storage.objects FOR UPDATE
USING (bucket_id = 'industry-media');

CREATE POLICY "Anyone can update in media-library"
ON storage.objects FOR UPDATE
USING (bucket_id = 'media-library');

CREATE POLICY "Anyone can update in blog-assets"
ON storage.objects FOR UPDATE
USING (bucket_id = 'blog-assets');

-- Create DELETE policies (allow all users to delete)
CREATE POLICY "Anyone can delete from homepage-assets"
ON storage.objects FOR DELETE
USING (bucket_id = 'homepage-assets');

CREATE POLICY "Anyone can delete from service-icons"
ON storage.objects FOR DELETE
USING (bucket_id = 'service-icons');

CREATE POLICY "Anyone can delete from industry-media"
ON storage.objects FOR DELETE
USING (bucket_id = 'industry-media');

CREATE POLICY "Anyone can delete from media-library"
ON storage.objects FOR DELETE
USING (bucket_id = 'media-library');

CREATE POLICY "Anyone can delete from blog-assets"
ON storage.objects FOR DELETE
USING (bucket_id = 'blog-assets');