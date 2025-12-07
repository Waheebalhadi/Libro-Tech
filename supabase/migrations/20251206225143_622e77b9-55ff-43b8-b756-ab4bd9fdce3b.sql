-- Create blog_categories table
CREATE TABLE public.blog_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_categories
CREATE POLICY "Anyone can view blog_categories" 
ON public.blog_categories FOR SELECT USING (true);

CREATE POLICY "Anyone can insert blog_categories" 
ON public.blog_categories FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update blog_categories" 
ON public.blog_categories FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete blog_categories" 
ON public.blog_categories FOR DELETE USING (true);

-- Add category_id to blog table
ALTER TABLE public.blog ADD COLUMN category_id UUID REFERENCES public.blog_categories(id);

-- Add author column to blog table
ALTER TABLE public.blog ADD COLUMN author TEXT;

-- Insert some default categories
INSERT INTO public.blog_categories (name_ar, name_en) VALUES
('التحول الرقمي', 'Digital Transformation'),
('المحاسبة', 'Accounting'),
('التسويق الذكي', 'Smart Marketing'),
('إدارة الأعمال', 'Business Management');