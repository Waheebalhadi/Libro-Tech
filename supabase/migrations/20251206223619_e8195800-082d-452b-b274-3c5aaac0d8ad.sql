-- Enable RLS and add policies for remaining tables

-- about_us table
ALTER TABLE public.about_us ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view about_us"
ON public.about_us FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert about_us"
ON public.about_us FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update about_us"
ON public.about_us FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete about_us"
ON public.about_us FOR DELETE
USING (true);

-- blog table
ALTER TABLE public.blog ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view blog"
ON public.blog FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert blog"
ON public.blog FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update blog"
ON public.blog FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete blog"
ON public.blog FOR DELETE
USING (true);

-- contact_messages table
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view contact_messages"
ON public.contact_messages FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert contact_messages"
ON public.contact_messages FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update contact_messages"
ON public.contact_messages FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete contact_messages"
ON public.contact_messages FOR DELETE
USING (true);

-- pricing table
ALTER TABLE public.pricing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view pricing"
ON public.pricing FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert pricing"
ON public.pricing FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update pricing"
ON public.pricing FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete pricing"
ON public.pricing FOR DELETE
USING (true);

-- users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view users"
ON public.users FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert users"
ON public.users FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update users"
ON public.users FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete users"
ON public.users FOR DELETE
USING (true);