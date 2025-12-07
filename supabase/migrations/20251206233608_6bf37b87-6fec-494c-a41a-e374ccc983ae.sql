-- Drop existing policies and create new PUBLIC policies for admin operations
-- This allows all operations without requiring Supabase Auth

-- SERVICES
DROP POLICY IF EXISTS "Anyone can view services" ON public.services;
DROP POLICY IF EXISTS "Authenticated users can insert services" ON public.services;
DROP POLICY IF EXISTS "Authenticated users can update services" ON public.services;
DROP POLICY IF EXISTS "Authenticated users can delete services" ON public.services;

CREATE POLICY "Public select services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public insert services" ON public.services FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update services" ON public.services FOR UPDATE USING (true);
CREATE POLICY "Public delete services" ON public.services FOR DELETE USING (true);

-- INDUSTRIES
DROP POLICY IF EXISTS "Anyone can view industries" ON public.industries;
DROP POLICY IF EXISTS "Authenticated users can insert industries" ON public.industries;
DROP POLICY IF EXISTS "Authenticated users can update industries" ON public.industries;
DROP POLICY IF EXISTS "Authenticated users can delete industries" ON public.industries;

CREATE POLICY "Public select industries" ON public.industries FOR SELECT USING (true);
CREATE POLICY "Public insert industries" ON public.industries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update industries" ON public.industries FOR UPDATE USING (true);
CREATE POLICY "Public delete industries" ON public.industries FOR DELETE USING (true);

-- HOMEPAGE
DROP POLICY IF EXISTS "Anyone can view homepage" ON public.homepage;
DROP POLICY IF EXISTS "Authenticated users can insert homepage" ON public.homepage;
DROP POLICY IF EXISTS "Authenticated users can update homepage" ON public.homepage;

CREATE POLICY "Public select homepage" ON public.homepage FOR SELECT USING (true);
CREATE POLICY "Public insert homepage" ON public.homepage FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update homepage" ON public.homepage FOR UPDATE USING (true);
CREATE POLICY "Public delete homepage" ON public.homepage FOR DELETE USING (true);

-- CONTACT MESSAGES
DROP POLICY IF EXISTS "Anyone can insert contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Authenticated users can view contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Authenticated users can update contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Authenticated users can delete contact_messages" ON public.contact_messages;

CREATE POLICY "Public select contact_messages" ON public.contact_messages FOR SELECT USING (true);
CREATE POLICY "Public insert contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update contact_messages" ON public.contact_messages FOR UPDATE USING (true);
CREATE POLICY "Public delete contact_messages" ON public.contact_messages FOR DELETE USING (true);

-- USERS
DROP POLICY IF EXISTS "Authenticated users can view users" ON public.users;
DROP POLICY IF EXISTS "Authenticated users can insert users" ON public.users;
DROP POLICY IF EXISTS "Authenticated users can update users" ON public.users;
DROP POLICY IF EXISTS "Authenticated users can delete users" ON public.users;

CREATE POLICY "Public select users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Public insert users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update users" ON public.users FOR UPDATE USING (true);
CREATE POLICY "Public delete users" ON public.users FOR DELETE USING (true);

-- SITE SETTINGS
DROP POLICY IF EXISTS "Anyone can view site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Authenticated users can insert site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Authenticated users can update site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Authenticated users can delete site_settings" ON public.site_settings;

CREATE POLICY "Public select site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public insert site_settings" ON public.site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update site_settings" ON public.site_settings FOR UPDATE USING (true);
CREATE POLICY "Public delete site_settings" ON public.site_settings FOR DELETE USING (true);

-- USER ROLES
DROP POLICY IF EXISTS "Authenticated users can view user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "Authenticated users can insert user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "Authenticated users can update user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "Authenticated users can delete user_roles" ON public.user_roles;

CREATE POLICY "Public select user_roles" ON public.user_roles FOR SELECT USING (true);
CREATE POLICY "Public insert user_roles" ON public.user_roles FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update user_roles" ON public.user_roles FOR UPDATE USING (true);
CREATE POLICY "Public delete user_roles" ON public.user_roles FOR DELETE USING (true);