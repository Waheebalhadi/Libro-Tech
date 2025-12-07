-- Fix RLS policies for sensitive tables
-- Remove overly permissive policies and replace with proper ones

-- ======== about_us table ========
DROP POLICY IF EXISTS "Anyone can delete about_us" ON public.about_us;
DROP POLICY IF EXISTS "Anyone can insert about_us" ON public.about_us;
DROP POLICY IF EXISTS "Anyone can update about_us" ON public.about_us;

CREATE POLICY "Authenticated users can insert about_us" ON public.about_us
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update about_us" ON public.about_us
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete about_us" ON public.about_us
  FOR DELETE USING (auth.role() = 'authenticated');

-- ======== blog table ========
DROP POLICY IF EXISTS "Anyone can delete blog" ON public.blog;
DROP POLICY IF EXISTS "Anyone can insert blog" ON public.blog;
DROP POLICY IF EXISTS "Anyone can update blog" ON public.blog;

CREATE POLICY "Authenticated users can insert blog" ON public.blog
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update blog" ON public.blog
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete blog" ON public.blog
  FOR DELETE USING (auth.role() = 'authenticated');

-- ======== blog_categories table ========
DROP POLICY IF EXISTS "Anyone can delete blog_categories" ON public.blog_categories;
DROP POLICY IF EXISTS "Anyone can insert blog_categories" ON public.blog_categories;
DROP POLICY IF EXISTS "Anyone can update blog_categories" ON public.blog_categories;

CREATE POLICY "Authenticated users can insert blog_categories" ON public.blog_categories
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update blog_categories" ON public.blog_categories
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete blog_categories" ON public.blog_categories
  FOR DELETE USING (auth.role() = 'authenticated');

-- ======== contact_messages table ========
-- Keep INSERT public for contact form, but restrict other operations
DROP POLICY IF EXISTS "Anyone can delete contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Anyone can update contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Anyone can view contact_messages" ON public.contact_messages;

CREATE POLICY "Authenticated users can view contact_messages" ON public.contact_messages
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update contact_messages" ON public.contact_messages
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete contact_messages" ON public.contact_messages
  FOR DELETE USING (auth.role() = 'authenticated');

-- ======== pricing table ========
DROP POLICY IF EXISTS "Anyone can delete pricing" ON public.pricing;
DROP POLICY IF EXISTS "Anyone can insert pricing" ON public.pricing;
DROP POLICY IF EXISTS "Anyone can update pricing" ON public.pricing;

CREATE POLICY "Authenticated users can insert pricing" ON public.pricing
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update pricing" ON public.pricing
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete pricing" ON public.pricing
  FOR DELETE USING (auth.role() = 'authenticated');

-- ======== site_settings table ========
DROP POLICY IF EXISTS "Anyone can delete site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Anyone can insert site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Anyone can update site_settings" ON public.site_settings;

CREATE POLICY "Authenticated users can insert site_settings" ON public.site_settings
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update site_settings" ON public.site_settings
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete site_settings" ON public.site_settings
  FOR DELETE USING (auth.role() = 'authenticated');

-- ======== users table ========
DROP POLICY IF EXISTS "Anyone can delete users" ON public.users;
DROP POLICY IF EXISTS "Anyone can insert users" ON public.users;
DROP POLICY IF EXISTS "Anyone can update users" ON public.users;
DROP POLICY IF EXISTS "Anyone can view users" ON public.users;

CREATE POLICY "Authenticated users can view users" ON public.users
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert users" ON public.users
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update users" ON public.users
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete users" ON public.users
  FOR DELETE USING (auth.role() = 'authenticated');

-- ======== user_roles table ========
DROP POLICY IF EXISTS "Anyone can delete user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "Anyone can insert user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "Anyone can update user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "Anyone can view user_roles" ON public.user_roles;

CREATE POLICY "Authenticated users can view user_roles" ON public.user_roles
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert user_roles" ON public.user_roles
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update user_roles" ON public.user_roles
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete user_roles" ON public.user_roles
  FOR DELETE USING (auth.role() = 'authenticated');