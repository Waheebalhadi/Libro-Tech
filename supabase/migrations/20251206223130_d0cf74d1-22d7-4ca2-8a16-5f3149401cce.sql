-- Drop existing storage policies if they exist and recreate them properly
DO $$
BEGIN
  -- Drop existing policies for storage.objects if they exist
  DROP POLICY IF EXISTS "Public read access for homepage-assets" ON storage.objects;
  DROP POLICY IF EXISTS "Public read access for service-icons" ON storage.objects;
  DROP POLICY IF EXISTS "Public read access for industry-media" ON storage.objects;
  DROP POLICY IF EXISTS "Public read access for media-library" ON storage.objects;
  DROP POLICY IF EXISTS "Public read access for blog-assets" ON storage.objects;
  
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

-- Create SELECT policies (public read access)
CREATE POLICY "Public read access for homepage-assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'homepage-assets');

CREATE POLICY "Public read access for service-icons"
ON storage.objects FOR SELECT
USING (bucket_id = 'service-icons');

CREATE POLICY "Public read access for industry-media"
ON storage.objects FOR SELECT
USING (bucket_id = 'industry-media');

CREATE POLICY "Public read access for media-library"
ON storage.objects FOR SELECT
USING (bucket_id = 'media-library');

CREATE POLICY "Public read access for blog-assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-assets');

-- Create INSERT policies (authenticated users can upload)
CREATE POLICY "Authenticated users can upload to homepage-assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'homepage-assets');

CREATE POLICY "Authenticated users can upload to service-icons"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'service-icons');

CREATE POLICY "Authenticated users can upload to industry-media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'industry-media');

CREATE POLICY "Authenticated users can upload to media-library"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media-library');

CREATE POLICY "Authenticated users can upload to blog-assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog-assets');

-- Create UPDATE policies (authenticated users can update)
CREATE POLICY "Authenticated users can update in homepage-assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'homepage-assets');

CREATE POLICY "Authenticated users can update in service-icons"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'service-icons');

CREATE POLICY "Authenticated users can update in industry-media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'industry-media');

CREATE POLICY "Authenticated users can update in media-library"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'media-library');

CREATE POLICY "Authenticated users can update in blog-assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'blog-assets');

-- Create DELETE policies (authenticated users can delete)
CREATE POLICY "Authenticated users can delete from homepage-assets"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'homepage-assets');

CREATE POLICY "Authenticated users can delete from service-icons"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'service-icons');

CREATE POLICY "Authenticated users can delete from industry-media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'industry-media');

CREATE POLICY "Authenticated users can delete from media-library"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'media-library');

CREATE POLICY "Authenticated users can delete from blog-assets"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'blog-assets');