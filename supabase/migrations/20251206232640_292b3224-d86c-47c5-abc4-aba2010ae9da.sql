-- Drop all existing RESTRICTIVE policies and recreate as PERMISSIVE

-- about_us
DROP POLICY IF EXISTS "Anyone can view about_us" ON public.about_us;
DROP POLICY IF EXISTS "Authenticated users can delete about_us" ON public.about_us;
DROP POLICY IF EXISTS "Authenticated users can insert about_us" ON public.about_us;
DROP POLICY IF EXISTS "Authenticated users can update about_us" ON public.about_us;

CREATE POLICY "Anyone can view about_us" ON public.about_us FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert about_us" ON public.about_us FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update about_us" ON public.about_us FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete about_us" ON public.about_us FOR DELETE TO authenticated USING (true);

-- blog
DROP POLICY IF EXISTS "Anyone can view blog" ON public.blog;
DROP POLICY IF EXISTS "Authenticated users can delete blog" ON public.blog;
DROP POLICY IF EXISTS "Authenticated users can insert blog" ON public.blog;
DROP POLICY IF EXISTS "Authenticated users can update blog" ON public.blog;

CREATE POLICY "Anyone can view blog" ON public.blog FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert blog" ON public.blog FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update blog" ON public.blog FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete blog" ON public.blog FOR DELETE TO authenticated USING (true);

-- blog_categories
DROP POLICY IF EXISTS "Anyone can view blog_categories" ON public.blog_categories;
DROP POLICY IF EXISTS "Authenticated users can delete blog_categories" ON public.blog_categories;
DROP POLICY IF EXISTS "Authenticated users can insert blog_categories" ON public.blog_categories;
DROP POLICY IF EXISTS "Authenticated users can update blog_categories" ON public.blog_categories;

CREATE POLICY "Anyone can view blog_categories" ON public.blog_categories FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert blog_categories" ON public.blog_categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update blog_categories" ON public.blog_categories FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete blog_categories" ON public.blog_categories FOR DELETE TO authenticated USING (true);

-- contact_messages
DROP POLICY IF EXISTS "Anyone can insert contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Authenticated users can delete contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Authenticated users can update contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Authenticated users can view contact_messages" ON public.contact_messages;

CREATE POLICY "Anyone can insert contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can view contact_messages" ON public.contact_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can update contact_messages" ON public.contact_messages FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete contact_messages" ON public.contact_messages FOR DELETE TO authenticated USING (true);

-- faqs
DROP POLICY IF EXISTS "Anyone can view faqs" ON public.faqs;
DROP POLICY IF EXISTS "Authenticated users can delete faqs" ON public.faqs;
DROP POLICY IF EXISTS "Authenticated users can insert faqs" ON public.faqs;
DROP POLICY IF EXISTS "Authenticated users can update faqs" ON public.faqs;

CREATE POLICY "Anyone can view faqs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert faqs" ON public.faqs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update faqs" ON public.faqs FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete faqs" ON public.faqs FOR DELETE TO authenticated USING (true);

-- homepage
DROP POLICY IF EXISTS "Anyone can view homepage" ON public.homepage;
DROP POLICY IF EXISTS "Authenticated users can insert homepage" ON public.homepage;
DROP POLICY IF EXISTS "Authenticated users can update homepage" ON public.homepage;

CREATE POLICY "Anyone can view homepage" ON public.homepage FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert homepage" ON public.homepage FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update homepage" ON public.homepage FOR UPDATE TO authenticated USING (true);

-- industries
DROP POLICY IF EXISTS "Anyone can view industries" ON public.industries;
DROP POLICY IF EXISTS "Authenticated users can delete industries" ON public.industries;
DROP POLICY IF EXISTS "Authenticated users can insert industries" ON public.industries;
DROP POLICY IF EXISTS "Authenticated users can update industries" ON public.industries;

CREATE POLICY "Anyone can view industries" ON public.industries FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert industries" ON public.industries FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update industries" ON public.industries FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete industries" ON public.industries FOR DELETE TO authenticated USING (true);

-- partners
DROP POLICY IF EXISTS "Anyone can view partners" ON public.partners;
DROP POLICY IF EXISTS "Authenticated users can delete partners" ON public.partners;
DROP POLICY IF EXISTS "Authenticated users can insert partners" ON public.partners;
DROP POLICY IF EXISTS "Authenticated users can update partners" ON public.partners;

CREATE POLICY "Anyone can view partners" ON public.partners FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert partners" ON public.partners FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update partners" ON public.partners FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete partners" ON public.partners FOR DELETE TO authenticated USING (true);

-- pricing
DROP POLICY IF EXISTS "Anyone can view pricing" ON public.pricing;
DROP POLICY IF EXISTS "Authenticated users can delete pricing" ON public.pricing;
DROP POLICY IF EXISTS "Authenticated users can insert pricing" ON public.pricing;
DROP POLICY IF EXISTS "Authenticated users can update pricing" ON public.pricing;

CREATE POLICY "Anyone can view pricing" ON public.pricing FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert pricing" ON public.pricing FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update pricing" ON public.pricing FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete pricing" ON public.pricing FOR DELETE TO authenticated USING (true);

-- services
DROP POLICY IF EXISTS "Allow admin delete services" ON public.services;
DROP POLICY IF EXISTS "Allow admin insert services" ON public.services;
DROP POLICY IF EXISTS "Allow admin update services" ON public.services;
DROP POLICY IF EXISTS "Allow read services" ON public.services;
DROP POLICY IF EXISTS "Anyone can view services" ON public.services;
DROP POLICY IF EXISTS "Authenticated users can delete services" ON public.services;
DROP POLICY IF EXISTS "Authenticated users can insert services" ON public.services;
DROP POLICY IF EXISTS "Authenticated users can update services" ON public.services;

CREATE POLICY "Anyone can view services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert services" ON public.services FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update services" ON public.services FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete services" ON public.services FOR DELETE TO authenticated USING (true);

-- site_settings
DROP POLICY IF EXISTS "Anyone can view site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Authenticated users can delete site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Authenticated users can insert site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Authenticated users can update site_settings" ON public.site_settings;

CREATE POLICY "Anyone can view site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert site_settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update site_settings" ON public.site_settings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete site_settings" ON public.site_settings FOR DELETE TO authenticated USING (true);

-- testimonials
DROP POLICY IF EXISTS "Anyone can view testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Authenticated users can delete testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Authenticated users can insert testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Authenticated users can update testimonials" ON public.testimonials;

CREATE POLICY "Anyone can view testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert testimonials" ON public.testimonials FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update testimonials" ON public.testimonials FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete testimonials" ON public.testimonials FOR DELETE TO authenticated USING (true);

-- user_roles
DROP POLICY IF EXISTS "Authenticated users can delete user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "Authenticated users can insert user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "Authenticated users can update user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "Authenticated users can view user_roles" ON public.user_roles;

CREATE POLICY "Authenticated users can view user_roles" ON public.user_roles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert user_roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update user_roles" ON public.user_roles FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete user_roles" ON public.user_roles FOR DELETE TO authenticated USING (true);

-- users
DROP POLICY IF EXISTS "Authenticated users can delete users" ON public.users;
DROP POLICY IF EXISTS "Authenticated users can insert users" ON public.users;
DROP POLICY IF EXISTS "Authenticated users can update users" ON public.users;
DROP POLICY IF EXISTS "Authenticated users can view users" ON public.users;

CREATE POLICY "Authenticated users can view users" ON public.users FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert users" ON public.users FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update users" ON public.users FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete users" ON public.users FOR DELETE TO authenticated USING (true);