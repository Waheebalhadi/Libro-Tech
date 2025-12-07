import * as React from 'react';
import { createContext, useContext, ReactNode } from 'react';

const { useState } = React;

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.solutions': 'الحلول',
    'nav.industries': 'القطاعات',
    'nav.blog': 'المدونة',
    'nav.pricing': 'الأسعار',
    'nav.contact': 'تواصل معنا',
    'nav.demo': 'جرب النظام',
    'nav.getStarted': 'ابدأ الآن',

    // Hero
    'hero.title': 'شريك نجاحك في التحول الرقمي',
    'hero.subtitle': 'نساعد الشركات على التحول إلى إدارة تكنولوجية متكاملة من خلال حلول مبتكرة تناسب جميع قطاعات العمل',
    'hero.cta.primary': 'احصل على استشارة مجانية',
    'hero.cta.secondary': 'اكتشف حلولنا',
    'hero.stats.clients': 'عميل راضٍ',
    'hero.stats.projects': 'مشروع منجز',
    'hero.stats.experience': 'سنوات خبرة',

    // About
    'about.title': 'من نحن',
    'about.subtitle': 'Libro Tech - شريك نجاحك التقني',
    'about.description': 'نحن شركة تقنية متخصصة في تطوير الأنظمة الإدارية والحلول الرقمية المتكاملة.',
    'about.mission.title': 'رسالتنا',
    'about.mission.text': 'تمكين الشركات من تحقيق أقصى إمكاناتها من خلال حلول تقنية مبتكرة.',
    'about.vision.title': 'رؤيتنا',
    'about.vision.text': 'أن نكون الشريك التقني الأول للمؤسسات في المنطقة العربية.',
    'about.values.title': 'قيمنا',
    'about.values.text': 'الابتكار، الجودة، الشفافية، والتميز.',

    // Solutions
    'solutions.title': 'حلولنا',
    'solutions.subtitle': 'أنظمة متكاملة لإدارة أعمالك',
    'solutions.bpm.title': 'إدارة العمليات BPM',
    'solutions.bpm.desc': 'أتمتة وتحسين العمليات التجارية',
    'solutions.hrms.title': 'الموارد البشرية HRMS',
    'solutions.hrms.desc': 'نظام متكامل لإدارة شؤون الموظفين',
    'solutions.inventory.title': 'إدارة المخزون',
    'solutions.inventory.desc': 'تتبع المخزون في الوقت الفعلي',
    'solutions.crm.title': 'إدارة العملاء CRM',
    'solutions.crm.desc': 'بناء علاقات قوية مع العملاء',
    'solutions.scheduling.title': 'الجدولة والحجوزات',
    'solutions.scheduling.desc': 'إدارة المواعيد والحجوزات',
    'solutions.invoicing.title': 'الفواتير والمحاسبة',
    'solutions.invoicing.desc': 'نظام فوترة متكامل',

    // Industries
    'industries.title': 'القطاعات المستفيدة',
    'industries.subtitle': 'حلول مخصصة لكل قطاع',
    'industries.companies': 'الشركات',
    'industries.factories': 'المصانع',
    'industries.restaurants': 'المطاعم',
    'industries.offices': 'المكاتب',
    'industries.ecommerce': 'المتاجر الإلكترونية',
    'industries.healthcare': 'القطاع الصحي',

    // Blog
    'blog.title': 'المدونة',
    'blog.subtitle': 'آخر المقالات والأخبار',
    'blog.readMore': 'اقرأ المزيد',

    // Pricing
    'pricing.title': 'الأسعار والباقات',
    'pricing.subtitle': 'اختر الباقة المناسبة لعملك',
    'pricing.starter': 'الباقة الأساسية',
    'pricing.professional': 'الباقة الاحترافية',
    'pricing.enterprise': 'باقة المؤسسات',
    'pricing.custom': 'باقة مخصصة',
    'pricing.month': '/شهر',
    'pricing.contactUs': 'تواصل معنا',
    'pricing.getStarted': 'ابدأ الآن',
    'pricing.popular': 'الأكثر طلباً',

    // Contact
    'contact.title': 'تواصل معنا',
    'contact.subtitle': 'نحن هنا لمساعدتك',
    'contact.form.name': 'الاسم الكامل',
    'contact.form.email': 'البريد الإلكتروني',
    'contact.form.phone': 'رقم الهاتف',
    'contact.form.company': 'اسم الشركة',
    'contact.form.message': 'رسالتك',
    'contact.form.submit': 'إرسال الرسالة',
    'contact.info.address': 'العنوان',
    'contact.info.email': 'البريد الإلكتروني',
    'contact.info.phone': 'الهاتف',

    // Footer
    'footer.description': 'شريك نجاحك في التحول الرقمي',
    'footer.links': 'روابط سريعة',
    'footer.services': 'خدماتنا',
    'footer.contact': 'تواصل معنا',
    'footer.rights': 'جميع الحقوق محفوظة',

    // Common
    'common.learnMore': 'اعرف المزيد',
    'common.viewAll': 'عرض الكل',
    'common.loading': 'جاري التحميل...',
    'common.save': 'حفظ التغييرات',
    'common.saving': 'جاري الحفظ...',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.add': 'إضافة',
    'common.refresh': 'تحديث',
    'common.search': 'بحث',
    'common.filter': 'فلترة',
    'common.actions': 'إجراءات',
    'common.confirmDelete': 'تأكيد الحذف',
    'common.deleteConfirmMessage': 'هل أنت متأكد من حذف هذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.',
    'common.noData': 'لا توجد بيانات',
    'common.unsavedChanges': 'لديك تغييرات غير محفوظة',

    // Admin
    'admin.dashboard': 'لوحة التحكم',
    'admin.homepage': 'الصفحة الرئيسية',
    'admin.services': 'الخدمات',
    'admin.industries': 'القطاعات',
    'admin.blog': 'المقالات',
    'admin.media': 'الوسائط',
    'admin.messages': 'الرسائل',
    'admin.users': 'المستخدمين',
    'admin.settings': 'الإعدادات',
    'admin.mainSite': 'الموقع الرئيسي',
    'admin.logout': 'خروج',
    'admin.welcome': 'مرحباً',
    'admin.welcomeMessage': 'مرحباً بك في لوحة تحكم Libro Tech',
    'admin.quickLinks': 'روابط سريعة',
    'admin.comingSoon': 'المزيد قادم قريباً',
    'admin.comingSoonDesc': 'سيتم إضافة إحصائيات ورسوم بيانية وميزات إضافية',
    
    // Admin - Homepage
    'admin.homepage.title': 'إدارة الصفحة الرئيسية',
    'admin.homepage.desc': 'تعديل محتوى قسم الهيرو والركائز الأساسية',
    'admin.homepage.heroTitle': 'العنوان الرئيسي',
    'admin.homepage.heroSubtitle': 'العنوان الفرعي',
    'admin.homepage.heroImage': 'صورة الخلفية',
    'admin.homepage.pillars': 'الركائز',
    'admin.homepage.pillar': 'الركيزة',
    'admin.homepage.pillarTitle': 'عنوان الركيزة',
    'admin.homepage.pillarDesc': 'وصف الركيزة',
    'admin.homepage.preview': 'معاينة',
    
    // Admin - Services
    'admin.services.title': 'إدارة الخدمات',
    'admin.services.desc': 'إضافة وتعديل الخدمات المقدمة',
    'admin.services.add': 'إضافة خدمة',
    'admin.services.edit': 'تعديل الخدمة',
    'admin.services.name': 'اسم الخدمة',
    'admin.services.description': 'وصف الخدمة',
    'admin.services.icon': 'أيقونة الخدمة',
    
    // Admin - Industries
    'admin.industries.title': 'إدارة القطاعات',
    'admin.industries.desc': 'إضافة وتعديل القطاعات المستهدفة',
    'admin.industries.add': 'إضافة قطاع',
    'admin.industries.edit': 'تعديل القطاع',
    'admin.industries.name': 'اسم القطاع',
    'admin.industries.description': 'وصف القطاع',
    
    // Admin - Blog
    'admin.blog.title': 'إدارة المقالات',
    'admin.blog.desc': 'إضافة وتعديل مقالات المدونة',
    'admin.blog.add': 'إضافة مقالة',
    'admin.blog.edit': 'تعديل المقالة',
    'admin.blog.articleTitle': 'عنوان المقالة',
    'admin.blog.content': 'محتوى المقالة',
    'admin.blog.category': 'التصنيف',
    'admin.blog.author': 'الكاتب',
    'admin.blog.image': 'صورة المقالة',
    'admin.blog.categories': 'التصنيفات',
    'admin.blog.manageCategories': 'إدارة التصنيفات',
    'admin.blog.addCategory': 'إضافة تصنيف',
    'admin.blog.categoryName': 'اسم التصنيف',
    
    // Admin - Messages
    'admin.messages.title': 'رسائل التواصل',
    'admin.messages.desc': 'عرض وإدارة رسائل الزوار',
    'admin.messages.from': 'من',
    'admin.messages.email': 'البريد الإلكتروني',
    'admin.messages.phone': 'الهاتف',
    'admin.messages.message': 'الرسالة',
    'admin.messages.date': 'التاريخ',
    'admin.messages.status': 'الحالة',
    'admin.messages.new': 'جديد',
    'admin.messages.read': 'مقروء',
    'admin.messages.replied': 'تم الرد',
    'admin.messages.archived': 'مؤرشف',
    'admin.messages.markAsRead': 'تحديد كمقروء',
    'admin.messages.archive': 'أرشفة',
    'admin.messages.projectType': 'نوع المشروع',
    'admin.messages.all': 'الكل',
    'admin.messages.filterByStatus': 'فلترة حسب الحالة',
    'admin.messages.filterByDate': 'فلترة حسب التاريخ',
    'admin.messages.noMessages': 'لا توجد رسائل',
    
    // Admin - Users
    'admin.users.title': 'إدارة المستخدمين',
    'admin.users.desc': 'إضافة وتعديل حسابات المستخدمين',
    'admin.users.add': 'إضافة مستخدم',
    'admin.users.edit': 'تعديل المستخدم',
    'admin.users.name': 'الاسم',
    'admin.users.email': 'البريد الإلكتروني',
    'admin.users.role': 'الدور',
    'admin.users.password': 'كلمة المرور',
    'admin.users.admin': 'مدير',
    'admin.users.moderator': 'مشرف',
    'admin.users.user': 'مستخدم',
    
    // Admin - Settings
    'admin.settings.title': 'إعدادات الموقع',
    'admin.settings.desc': 'تخصيص الموقع والمعلومات الأساسية',
    'admin.settings.logoIdentity': 'الشعار والهوية',
    'admin.settings.companyInfo': 'بيانات الشركة',
    'admin.settings.seoLanguages': 'SEO واللغات',
    'admin.settings.logo': 'الشعار',
    'admin.settings.favicon': 'أيقونة الموقع',
    'admin.settings.companyName': 'اسم الشركة',
    'admin.settings.companyDesc': 'وصف الشركة',
    'admin.settings.companyEmail': 'البريد الإلكتروني',
    'admin.settings.companyPhone': 'رقم الهاتف',
    'admin.settings.companyAddress': 'العنوان',
    'admin.settings.socialLinks': 'روابط التواصل الاجتماعي',
    'admin.settings.defaultLanguage': 'اللغة الافتراضية',
    'admin.settings.seoTitle': 'عنوان SEO',
    'admin.settings.seoDesc': 'وصف SEO',
    'admin.settings.seoKeywords': 'الكلمات المفتاحية',
    
    // Admin - Media
    'admin.media.title': 'مكتبة الوسائط',
    'admin.media.desc': 'إدارة الصور والملفات',
    'admin.media.upload': 'رفع ملف',
    'admin.media.folders': 'المجلدات',
    'admin.media.allFiles': 'جميع الملفات',
    'admin.media.images': 'الصور',
    'admin.media.documents': 'المستندات',
    'admin.media.videos': 'الفيديوهات',
    
    // Languages
    'lang.arabic': 'العربية',
    'lang.english': 'English',
    'lang.ar': 'عربي',
    'lang.en': 'EN',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.solutions': 'Solutions',
    'nav.industries': 'Industries',
    'nav.blog': 'Blog',
    'nav.pricing': 'Pricing',
    'nav.contact': 'Contact',
    'nav.demo': 'Try Demo',
    'nav.getStarted': 'Get Started',

    // Hero
    'hero.title': 'Your Partner in Digital Transformation',
    'hero.subtitle': 'We help businesses transform into integrated technology management',
    'hero.cta.primary': 'Get Free Consultation',
    'hero.cta.secondary': 'Explore Solutions',
    'hero.stats.clients': 'Happy Clients',
    'hero.stats.projects': 'Projects Done',
    'hero.stats.experience': 'Years Experience',

    // About
    'about.title': 'About Us',
    'about.subtitle': 'Libro Tech - Your Tech Success Partner',
    'about.description': 'We are a technology company specializing in developing management systems and integrated digital solutions.',
    'about.mission.title': 'Our Mission',
    'about.mission.text': 'Enabling companies to achieve their full potential through innovative solutions.',
    'about.vision.title': 'Our Vision',
    'about.vision.text': 'To be the first technology partner for organizations in the Arab region.',
    'about.values.title': 'Our Values',
    'about.values.text': 'Innovation, Quality, Transparency, and Excellence.',

    // Solutions
    'solutions.title': 'Our Solutions',
    'solutions.subtitle': 'Integrated Systems for Your Business',
    'solutions.bpm.title': 'Business Process Management',
    'solutions.bpm.desc': 'Automate and optimize business processes',
    'solutions.hrms.title': 'HRMS/ERP',
    'solutions.hrms.desc': 'Comprehensive system for employee management',
    'solutions.inventory.title': 'Inventory Management',
    'solutions.inventory.desc': 'Real-time inventory tracking',
    'solutions.crm.title': 'CRM',
    'solutions.crm.desc': 'Build strong customer relationships',
    'solutions.scheduling.title': 'Scheduling & Booking',
    'solutions.scheduling.desc': 'Manage appointments and bookings',
    'solutions.invoicing.title': 'Invoicing & Accounting',
    'solutions.invoicing.desc': 'Complete invoicing system',

    // Industries
    'industries.title': 'Industries We Serve',
    'industries.subtitle': 'Customized Solutions for Every Sector',
    'industries.companies': 'Companies',
    'industries.factories': 'Factories',
    'industries.restaurants': 'Restaurants',
    'industries.offices': 'Offices',
    'industries.ecommerce': 'E-commerce',
    'industries.healthcare': 'Healthcare',

    // Blog
    'blog.title': 'Blog',
    'blog.subtitle': 'Latest Articles & News',
    'blog.readMore': 'Read More',

    // Pricing
    'pricing.title': 'Pricing Plans',
    'pricing.subtitle': 'Choose the Right Plan for Your Business',
    'pricing.starter': 'Starter',
    'pricing.professional': 'Professional',
    'pricing.enterprise': 'Enterprise',
    'pricing.custom': 'Custom',
    'pricing.month': '/month',
    'pricing.contactUs': 'Contact Us',
    'pricing.getStarted': 'Get Started',
    'pricing.popular': 'Most Popular',

    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'We\'re Here to Help',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.phone': 'Phone Number',
    'contact.form.company': 'Company Name',
    'contact.form.message': 'Your Message',
    'contact.form.submit': 'Send Message',
    'contact.info.address': 'Address',
    'contact.info.email': 'Email',
    'contact.info.phone': 'Phone',

    // Footer
    'footer.description': 'Your partner in digital transformation',
    'footer.links': 'Quick Links',
    'footer.services': 'Our Services',
    'footer.contact': 'Contact Us',
    'footer.rights': 'All Rights Reserved',

    // Common
    'common.learnMore': 'Learn More',
    'common.viewAll': 'View All',
    'common.loading': 'Loading...',
    'common.save': 'Save Changes',
    'common.saving': 'Saving...',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.refresh': 'Refresh',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.actions': 'Actions',
    'common.confirmDelete': 'Confirm Delete',
    'common.deleteConfirmMessage': 'Are you sure you want to delete this item? This action cannot be undone.',
    'common.noData': 'No data available',
    'common.unsavedChanges': 'You have unsaved changes',

    // Admin
    'admin.dashboard': 'Dashboard',
    'admin.homepage': 'Homepage',
    'admin.services': 'Services',
    'admin.industries': 'Industries',
    'admin.blog': 'Blog',
    'admin.media': 'Media',
    'admin.messages': 'Messages',
    'admin.users': 'Users',
    'admin.settings': 'Settings',
    'admin.mainSite': 'Main Site',
    'admin.logout': 'Logout',
    'admin.welcome': 'Welcome',
    'admin.welcomeMessage': 'Welcome to Libro Tech Dashboard',
    'admin.quickLinks': 'Quick Links',
    'admin.comingSoon': 'More Coming Soon',
    'admin.comingSoonDesc': 'Statistics, charts and additional features will be added',
    
    // Admin - Homepage
    'admin.homepage.title': 'Manage Homepage',
    'admin.homepage.desc': 'Edit hero section and pillars content',
    'admin.homepage.heroTitle': 'Main Title',
    'admin.homepage.heroSubtitle': 'Subtitle',
    'admin.homepage.heroImage': 'Background Image',
    'admin.homepage.pillars': 'Pillars',
    'admin.homepage.pillar': 'Pillar',
    'admin.homepage.pillarTitle': 'Pillar Title',
    'admin.homepage.pillarDesc': 'Pillar Description',
    'admin.homepage.preview': 'Preview',
    
    // Admin - Services
    'admin.services.title': 'Manage Services',
    'admin.services.desc': 'Add and edit services',
    'admin.services.add': 'Add Service',
    'admin.services.edit': 'Edit Service',
    'admin.services.name': 'Service Name',
    'admin.services.description': 'Service Description',
    'admin.services.icon': 'Service Icon',
    
    // Admin - Industries
    'admin.industries.title': 'Manage Industries',
    'admin.industries.desc': 'Add and edit target industries',
    'admin.industries.add': 'Add Industry',
    'admin.industries.edit': 'Edit Industry',
    'admin.industries.name': 'Industry Name',
    'admin.industries.description': 'Industry Description',
    
    // Admin - Blog
    'admin.blog.title': 'Manage Blog',
    'admin.blog.desc': 'Add and edit blog articles',
    'admin.blog.add': 'Add Article',
    'admin.blog.edit': 'Edit Article',
    'admin.blog.articleTitle': 'Article Title',
    'admin.blog.content': 'Article Content',
    'admin.blog.category': 'Category',
    'admin.blog.author': 'Author',
    'admin.blog.image': 'Article Image',
    'admin.blog.categories': 'Categories',
    'admin.blog.manageCategories': 'Manage Categories',
    'admin.blog.addCategory': 'Add Category',
    'admin.blog.categoryName': 'Category Name',
    
    // Admin - Messages
    'admin.messages.title': 'Contact Messages',
    'admin.messages.desc': 'View and manage visitor messages',
    'admin.messages.from': 'From',
    'admin.messages.email': 'Email',
    'admin.messages.phone': 'Phone',
    'admin.messages.message': 'Message',
    'admin.messages.date': 'Date',
    'admin.messages.status': 'Status',
    'admin.messages.new': 'New',
    'admin.messages.read': 'Read',
    'admin.messages.replied': 'Replied',
    'admin.messages.archived': 'Archived',
    'admin.messages.markAsRead': 'Mark as Read',
    'admin.messages.archive': 'Archive',
    'admin.messages.projectType': 'Project Type',
    'admin.messages.all': 'All',
    'admin.messages.filterByStatus': 'Filter by Status',
    'admin.messages.filterByDate': 'Filter by Date',
    'admin.messages.noMessages': 'No messages',
    
    // Admin - Users
    'admin.users.title': 'Manage Users',
    'admin.users.desc': 'Add and edit user accounts',
    'admin.users.add': 'Add User',
    'admin.users.edit': 'Edit User',
    'admin.users.name': 'Name',
    'admin.users.email': 'Email',
    'admin.users.role': 'Role',
    'admin.users.password': 'Password',
    'admin.users.admin': 'Admin',
    'admin.users.moderator': 'Moderator',
    'admin.users.user': 'User',
    
    // Admin - Settings
    'admin.settings.title': 'Site Settings',
    'admin.settings.desc': 'Customize site and basic information',
    'admin.settings.logoIdentity': 'Logo & Identity',
    'admin.settings.companyInfo': 'Company Info',
    'admin.settings.seoLanguages': 'SEO & Languages',
    'admin.settings.logo': 'Logo',
    'admin.settings.favicon': 'Favicon',
    'admin.settings.companyName': 'Company Name',
    'admin.settings.companyDesc': 'Company Description',
    'admin.settings.companyEmail': 'Email',
    'admin.settings.companyPhone': 'Phone Number',
    'admin.settings.companyAddress': 'Address',
    'admin.settings.socialLinks': 'Social Links',
    'admin.settings.defaultLanguage': 'Default Language',
    'admin.settings.seoTitle': 'SEO Title',
    'admin.settings.seoDesc': 'SEO Description',
    'admin.settings.seoKeywords': 'SEO Keywords',
    
    // Admin - Media
    'admin.media.title': 'Media Library',
    'admin.media.desc': 'Manage images and files',
    'admin.media.upload': 'Upload File',
    'admin.media.folders': 'Folders',
    'admin.media.allFiles': 'All Files',
    'admin.media.images': 'Images',
    'admin.media.documents': 'Documents',
    'admin.media.videos': 'Videos',
    
    // Languages
    'lang.arabic': 'Arabic',
    'lang.english': 'English',
    'lang.ar': 'AR',
    'lang.en': 'EN',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'libro-tech-language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check if there's a saved language in localStorage
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage === 'ar' || savedLanguage === 'en') {
      return savedLanguage;
    }
    // Default to Arabic on first visit
    return 'ar';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'font-arabic' : 'font-english'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
