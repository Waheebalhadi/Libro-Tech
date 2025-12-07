-- Create user_roles table (separate from users for security)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at timestamp without time zone DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create policies for user_roles
CREATE POLICY "Anyone can view user_roles"
ON public.user_roles FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert user_roles"
ON public.user_roles FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update user_roles"
ON public.user_roles FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete user_roles"
ON public.user_roles FOR DELETE
USING (true);

-- Create site_settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_url text,
  favicon_url text,
  company_name_ar text,
  company_name_en text,
  company_email text,
  company_phone text,
  company_address_ar text,
  company_address_en text,
  company_description_ar text,
  company_description_en text,
  social_facebook text,
  social_twitter text,
  social_instagram text,
  social_linkedin text,
  social_youtube text,
  seo_title_ar text,
  seo_title_en text,
  seo_description_ar text,
  seo_description_en text,
  seo_keywords_ar text,
  seo_keywords_en text,
  default_language text DEFAULT 'ar',
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now()
);

-- Enable RLS on site_settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for site_settings
CREATE POLICY "Anyone can view site_settings"
ON public.site_settings FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert site_settings"
ON public.site_settings FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update site_settings"
ON public.site_settings FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete site_settings"
ON public.site_settings FOR DELETE
USING (true);

-- Insert default settings row
INSERT INTO public.site_settings (
  company_name_ar,
  company_name_en,
  default_language
) VALUES (
  'ليبرو تك',
  'Libro Tech',
  'ar'
) ON CONFLICT DO NOTHING;