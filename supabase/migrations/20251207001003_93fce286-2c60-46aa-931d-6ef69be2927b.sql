-- Drop existing restrictive policies and create permissive ones for services
DROP POLICY IF EXISTS "Public delete services" ON public.services;
DROP POLICY IF EXISTS "Public insert services" ON public.services;
DROP POLICY IF EXISTS "Public select services" ON public.services;
DROP POLICY IF EXISTS "Public update services" ON public.services;

CREATE POLICY "Anyone can view services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Anyone can insert services" ON public.services FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update services" ON public.services FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete services" ON public.services FOR DELETE USING (true);

-- Drop existing restrictive policies and create permissive ones for industries
DROP POLICY IF EXISTS "Public delete industries" ON public.industries;
DROP POLICY IF EXISTS "Public insert industries" ON public.industries;
DROP POLICY IF EXISTS "Public select industries" ON public.industries;
DROP POLICY IF EXISTS "Public update industries" ON public.industries;

CREATE POLICY "Anyone can view industries" ON public.industries FOR SELECT USING (true);
CREATE POLICY "Anyone can insert industries" ON public.industries FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update industries" ON public.industries FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete industries" ON public.industries FOR DELETE USING (true);

-- Drop existing restrictive policies and create permissive ones for blog
DROP POLICY IF EXISTS "Anyone can view blog" ON public.blog;
DROP POLICY IF EXISTS "Authenticated users can delete blog" ON public.blog;
DROP POLICY IF EXISTS "Authenticated users can insert blog" ON public.blog;
DROP POLICY IF EXISTS "Authenticated users can update blog" ON public.blog;

CREATE POLICY "Anyone can view blog" ON public.blog FOR SELECT USING (true);
CREATE POLICY "Anyone can insert blog" ON public.blog FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update blog" ON public.blog FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete blog" ON public.blog FOR DELETE USING (true);

-- Drop existing restrictive policies and create permissive ones for blog_categories
DROP POLICY IF EXISTS "Anyone can view blog_categories" ON public.blog_categories;
DROP POLICY IF EXISTS "Authenticated users can delete blog_categories" ON public.blog_categories;
DROP POLICY IF EXISTS "Authenticated users can insert blog_categories" ON public.blog_categories;
DROP POLICY IF EXISTS "Authenticated users can update blog_categories" ON public.blog_categories;

CREATE POLICY "Anyone can view blog_categories" ON public.blog_categories FOR SELECT USING (true);
CREATE POLICY "Anyone can insert blog_categories" ON public.blog_categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update blog_categories" ON public.blog_categories FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete blog_categories" ON public.blog_categories FOR DELETE USING (true);