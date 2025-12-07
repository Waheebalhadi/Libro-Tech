-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  role_ar TEXT,
  role_en TEXT,
  company_ar TEXT,
  company_en TEXT,
  content_ar TEXT NOT NULL,
  content_en TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  avatar_url TEXT,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

-- Create faqs table
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_ar TEXT NOT NULL,
  question_en TEXT NOT NULL,
  answer_ar TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

-- Create partners table
CREATE TABLE public.partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- RLS Policies for testimonials
CREATE POLICY "Anyone can view testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert testimonials" ON public.testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update testimonials" ON public.testimonials FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete testimonials" ON public.testimonials FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for faqs
CREATE POLICY "Anyone can view faqs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert faqs" ON public.faqs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update faqs" ON public.faqs FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete faqs" ON public.faqs FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for partners
CREATE POLICY "Anyone can view partners" ON public.partners FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert partners" ON public.partners FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update partners" ON public.partners FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete partners" ON public.partners FOR DELETE USING (auth.role() = 'authenticated');

-- Insert default testimonials data
INSERT INTO public.testimonials (name_ar, name_en, role_ar, role_en, company_ar, company_en, content_ar, content_en, rating) VALUES
('أحمد محمد', 'Ahmed Mohammed', 'مدير شركة تقنية', 'Tech Company Director', 'شركة الابتكار', 'Innovation Co.', 'تجربة رائعة مع Libro Tech! ساعدونا في تحويل أعمالنا بشكل كامل. الآن ندير كل شيء من مكان واحد بسهولة تامة.', 'Amazing experience with Libro Tech! They helped us completely transform our business. Now we manage everything from one place with complete ease.', 5),
('سارة العلي', 'Sara Al-Ali', 'مديرة موارد بشرية', 'HR Manager', 'مجموعة النمو', 'Growth Group', 'نظام الموارد البشرية وفر علينا وقتاً كبيراً. الدعم الفني ممتاز والفريق متعاون جداً. أنصح الجميع بهم!', 'The HR system saved us a lot of time. Technical support is excellent and the team is very cooperative. I recommend them to everyone!', 5),
('خالد العمري', 'Khaled Al-Omari', 'صاحب مطعم', 'Restaurant Owner', 'مطاعم الذواقة', 'Gourmet Restaurants', 'منذ استخدامنا لنظام إدارة المطاعم، زادت مبيعاتنا بنسبة 40%. نظام سهل الاستخدام وفعال جداً.', 'Since we started using the restaurant management system, our sales increased by 40%. Easy to use and very effective system.', 5);

-- Insert default FAQs data
INSERT INTO public.faqs (question_ar, question_en, answer_ar, answer_en, display_order) VALUES
('ما هي الخدمات التي تقدمونها؟', 'What services do you offer?', 'نقدم مجموعة شاملة من الحلول التقنية تشمل: أنظمة إدارة الموارد البشرية (HRMS)، إدارة علاقات العملاء (CRM)، إدارة المخزون، أنظمة الفوترة، جدولة المواعيد، وأنظمة إدارة العمليات (BPM). كل هذه الأنظمة متكاملة وتعمل معاً بسلاسة.', 'We offer a comprehensive range of technology solutions including: Human Resource Management Systems (HRMS), Customer Relationship Management (CRM), Inventory Management, Billing Systems, Appointment Scheduling, and Business Process Management (BPM).', 1),
('كم يستغرق تنفيذ النظام؟', 'How long does system implementation take?', 'يعتمد وقت التنفيذ على حجم المشروع وتعقيده. عادةً ما يستغرق التنفيذ الأساسي من 2-4 أسابيع، بينما المشاريع الكبيرة قد تحتاج 2-3 أشهر. نحرص على تقديم جدول زمني واضح قبل البدء.', 'Implementation time depends on the project size and complexity. Basic implementation usually takes 2-4 weeks, while larger projects may need 2-3 months.', 2),
('هل تقدمون تدريباً على استخدام الأنظمة؟', 'Do you provide training on using the systems?', 'نعم، نقدم تدريباً شاملاً لفريقك على جميع الأنظمة. يشمل التدريب جلسات مباشرة، مقاطع فيديو تعليمية، ودليل استخدام مفصل. كما نوفر دعماً مستمراً بعد التدريب.', 'Yes, we provide comprehensive training for your team on all systems. Training includes live sessions, tutorial videos, and detailed user guides.', 3),
('هل بياناتي آمنة معكم؟', 'Is my data safe with you?', 'نعم، أمان بياناتك هو أولويتنا القصوى. نستخدم تشفير SSL/TLS، نسخ احتياطي يومي، وخوادم آمنة بمعايير عالمية. كما نلتزم بجميع قوانين حماية البيانات.', 'Yes, your data security is our top priority. We use SSL/TLS encryption, daily backups, and secure servers with international standards.', 4),
('ما هي تكلفة الاشتراك؟', 'What is the subscription cost?', 'نقدم خطط اشتراك مرنة تناسب جميع أحجام الأعمال. تبدأ الأسعار من باقات أساسية للشركات الصغيرة وتصل إلى حلول مخصصة للمؤسسات الكبيرة. تواصل معنا للحصول على عرض سعر مخصص.', 'We offer flexible subscription plans suitable for all business sizes. Prices start from basic packages for small businesses to custom solutions for large enterprises.', 5),
('هل يمكن تخصيص النظام حسب احتياجاتي؟', 'Can the system be customized to my needs?', 'بالتأكيد! جميع أنظمتنا قابلة للتخصيص بالكامل. نعمل معك لفهم متطلباتك الخاصة ونصمم حلولاً تناسب سير العمل في شركتك تماماً.', 'Absolutely! All our systems are fully customizable. We work with you to understand your specific requirements and design solutions that perfectly fit your workflow.', 6);

-- Insert default partners data
INSERT INTO public.partners (name, logo_url, display_order) VALUES
('Microsoft', NULL, 1),
('Google', NULL, 2),
('Amazon', NULL, 3),
('Salesforce', NULL, 4),
('Oracle', NULL, 5),
('SAP', NULL, 6);

-- Insert default services data
INSERT INTO public.services (name_ar, name_en, description_ar, description_en, icon_url) VALUES
('إدارة الموارد البشرية', 'Human Resources Management', 'نظام متكامل لإدارة الموظفين، الرواتب، الحضور والانصراف، الإجازات، والتقييم', 'Comprehensive system for employee management, payroll, attendance, leaves, and evaluation', NULL),
('إدارة علاقات العملاء', 'Customer Relationship Management', 'تتبع العملاء المحتملين، إدارة المبيعات، خدمة العملاء، وتحليل سلوك العملاء', 'Track leads, manage sales, customer service, and analyze customer behavior', NULL),
('إدارة المخزون', 'Inventory Management', 'تتبع المخزون في الوقت الفعلي، إدارة المستودعات، تنبيهات إعادة الطلب', 'Real-time inventory tracking, warehouse management, reorder alerts', NULL),
('الفوترة الإلكترونية', 'Electronic Invoicing', 'إنشاء الفواتير، تتبع المدفوعات، التكامل مع هيئة الزكاة والضريبة', 'Create invoices, track payments, integrate with tax authority', NULL),
('جدولة المواعيد', 'Appointment Scheduling', 'نظام حجز ذكي، تذكيرات تلقائية، إدارة التقويم والمواعيد', 'Smart booking system, automatic reminders, calendar management', NULL),
('إدارة العمليات', 'Business Process Management', 'أتمتة سير العمل، إدارة المهام، تتبع الأداء والإنتاجية', 'Workflow automation, task management, performance tracking', NULL);

-- Insert default industries data
INSERT INTO public.industries (name_ar, name_en, description_ar, description_en, icon_url) VALUES
('شركات تجارية', 'Commercial Companies', 'إدارة شاملة للعمليات التجارية، المبيعات، المشتريات، والموارد البشرية مع تقارير تحليلية متقدمة', 'Comprehensive management for commercial operations, sales, procurement, and HR with advanced analytical reports', NULL),
('مصانع', 'Factories', 'تتبع خطوط الإنتاج، إدارة المخزون والمواد الخام، مراقبة الجودة، وجدولة الصيانة', 'Track production lines, manage inventory and raw materials, quality control, and maintenance scheduling', NULL),
('مطاعم وكافيهات', 'Restaurants & Cafes', 'نظام متكامل لإدارة الطلبات، المخزون، الموظفين، والحجوزات مع تكامل نقاط البيع', 'Complete system for orders, inventory, staff, and reservations management with POS integration', NULL),
('مكاتب خدمات', 'Service Offices', 'تنظيم سير العمل، إدارة المشاريع والعملاء، جدولة المواعيد، والفوترة الإلكترونية', 'Workflow organization, project and client management, appointment scheduling, and electronic invoicing', NULL),
('متاجر إلكترونية', 'E-commerce Stores', 'إدارة المتجر، الطلبات، الشحن، المدفوعات، والمخزون مع تكامل منصات البيع المتعددة', 'Store, orders, shipping, payments, and inventory management with multi-platform sales integration', NULL);

-- Insert default pricing data
INSERT INTO public.pricing (name_ar, name_en, description_ar, description_en, price, features_ar, features_en) VALUES
('الباقة الأساسية', 'Starter Plan', 'مثالية للشركات الصغيرة والناشئة', 'Perfect for small and startup businesses', 299, '["نظام إدارة واحد", "دعم فني عبر البريد", "تحديثات مجانية", "تخزين 5GB", "مستخدم واحد"]'::jsonb, '["One management system", "Email support", "Free updates", "5GB storage", "One user"]'::jsonb),
('الباقة الاحترافية', 'Professional Plan', 'الأكثر طلباً للشركات المتوسطة', 'Most popular for medium businesses', 699, '["3 أنظمة إدارة", "دعم فني على مدار الساعة", "تحديثات وميزات جديدة", "تخزين 50GB", "حتى 10 مستخدمين", "تقارير متقدمة"]'::jsonb, '["3 management systems", "24/7 support", "Updates and new features", "50GB storage", "Up to 10 users", "Advanced reports"]'::jsonb),
('باقة المؤسسات', 'Enterprise Plan', 'للمؤسسات الكبيرة والشركات', 'For large enterprises and corporations', 1499, '["جميع الأنظمة", "مدير حساب مخصص", "تدريب فريق العمل", "تخزين غير محدود", "مستخدمين غير محدودين", "تخصيص كامل"]'::jsonb, '["All systems", "Dedicated account manager", "Team training", "Unlimited storage", "Unlimited users", "Full customization"]'::jsonb);

-- Insert default blog posts
INSERT INTO public.blog (title_ar, title_en, content_ar, content_en, author, image_url, published_at) VALUES
('التحول الرقمي: مفتاح النجاح في عصر التكنولوجيا', 'Digital Transformation: Key to Success', 'اكتشف كيف يمكن للتحول الرقمي أن يحول أعمالك ويزيد من كفاءتها. في هذا المقال نستعرض أهم استراتيجيات التحول الرقمي وكيفية تطبيقها في شركتك.', 'Discover how digital transformation can improve your business efficiency. In this article, we explore the most important digital transformation strategies and how to apply them in your company.', 'Libro Tech', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop', now()),
('أهمية أنظمة ERP في إدارة الموارد', 'Importance of ERP Systems', 'تعرف على كيفية تحسين إدارة موارد شركتك من خلال أنظمة ERP. نستعرض أهم مميزات هذه الأنظمة وكيف تساعد في تحسين الكفاءة وتقليل التكاليف.', 'Learn how to improve your company resource management with ERP. We review the main features of these systems and how they help improve efficiency and reduce costs.', 'Libro Tech', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', now()),
('التسويق الذكي: استراتيجيات النجاح', 'Smart Marketing Strategies', 'استراتيجيات تسويقية ذكية لزيادة المبيعات وبناء علاقات قوية مع العملاء. تعرف على أحدث أساليب التسويق الرقمي وكيفية تطبيقها.', 'Smart marketing strategies to increase sales and build strong relationships with customers. Learn about the latest digital marketing methods and how to apply them.', 'Libro Tech', 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=600&h=400&fit=crop', now());