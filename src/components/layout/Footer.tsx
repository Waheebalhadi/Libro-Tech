import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube, ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import logoFull from '@/assets/logo-full.png';
interface SiteSettings {
  logo_url: string | null;
  company_name_ar: string | null;
  company_name_en: string | null;
  company_email: string | null;
  company_phone: string | null;
  company_address_ar: string | null;
  company_address_en: string | null;
  company_description_ar: string | null;
  company_description_en: string | null;
  social_facebook: string | null;
  social_twitter: string | null;
  social_instagram: string | null;
  social_linkedin: string | null;
  social_youtube: string | null;
}
export default function Footer() {
  const {
    t,
    isRTL
  } = useLanguage();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const {
          data,
          error
        } = await supabase.from('site_settings').select('*').limit(1).maybeSingle();
        if (error) throw error;
        setSettings(data);
      } catch (error) {
        console.error('Error fetching site settings:', error);
      }
    };
    fetchSettings();
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const quickLinks = [{
    path: '/',
    label: isRTL ? 'الرئيسية' : 'Home'
  }, {
    path: '/about',
    label: isRTL ? 'من نحن' : 'About Us'
  }, {
    path: '/solutions',
    label: isRTL ? 'الحلول' : 'Solutions'
  }, {
    path: '/industries',
    label: isRTL ? 'القطاعات' : 'Industries'
  }, {
    path: '/blog',
    label: isRTL ? 'المدونة' : 'Blog'
  }, {
    path: '/contact',
    label: isRTL ? 'تواصل معنا' : 'Contact Us'
  }];
  const solutions = [{
    path: '/solutions#bpm',
    label: isRTL ? 'إدارة العمليات' : 'BPM'
  }, {
    path: '/solutions#hrms',
    label: isRTL ? 'الموارد البشرية' : 'HRMS'
  }, {
    path: '/solutions#crm',
    label: isRTL ? 'علاقات العملاء' : 'CRM'
  }, {
    path: '/solutions#inventory',
    label: isRTL ? 'إدارة المخزون' : 'Inventory'
  }, {
    path: '/solutions#scheduling',
    label: isRTL ? 'جدولة المواعيد' : 'Scheduling'
  }, {
    path: '/solutions#invoicing',
    label: isRTL ? 'الفواتير' : 'Invoicing'
  }];

  // Build social links from settings
  const socialLinks = [settings?.social_facebook ? {
    icon: Facebook,
    href: settings.social_facebook,
    label: 'Facebook'
  } : null, settings?.social_twitter ? {
    icon: Twitter,
    href: settings.social_twitter,
    label: 'Twitter'
  } : null, settings?.social_linkedin ? {
    icon: Linkedin,
    href: settings.social_linkedin,
    label: 'LinkedIn'
  } : null, settings?.social_instagram ? {
    icon: Instagram,
    href: settings.social_instagram,
    label: 'Instagram'
  } : null, settings?.social_youtube ? {
    icon: Youtube,
    href: settings.social_youtube,
    label: 'YouTube'
  } : null].filter(Boolean) as {
    icon: typeof Facebook;
    href: string;
    label: string;
  }[];

  // Fallback social links if none configured
  const defaultSocialLinks = [{
    icon: Facebook,
    href: '#',
    label: 'Facebook'
  }, {
    icon: Twitter,
    href: '#',
    label: 'Twitter'
  }, {
    icon: Linkedin,
    href: '#',
    label: 'LinkedIn'
  }, {
    icon: Instagram,
    href: '#',
    label: 'Instagram'
  }];
  const displaySocialLinks = socialLinks.length > 0 ? socialLinks : defaultSocialLinks;

  // Get company info from settings or use defaults
  const companyName = isRTL ? settings?.company_name_ar || 'ليبرو تك' : settings?.company_name_en || 'Libro Tech';
  const companyDescription = isRTL ? settings?.company_description_ar || 'شريكك الموثوق في رحلة التحول الرقمي. نقدم حلولاً تقنية متكاملة لإدارة أعمالك بكفاءة واحترافية.' : settings?.company_description_en || 'Your trusted partner in the digital transformation journey. We provide integrated technology solutions to manage your business efficiently and professionally.';
  const companyAddress = isRTL ? settings?.company_address_ar || 'الرياض، المملكة العربية السعودية' : settings?.company_address_en || 'Riyadh, Saudi Arabia';
  const companyPhone = settings?.company_phone || '+966 50 000 0000';
  const companyEmail = settings?.company_email || 'info@librotech.sa';
  const logoUrl = settings?.logo_url || logoFull;
  return <footer className="relative bg-gradient-to-b from-foreground to-foreground/95 text-background overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 ${isRTL ? '-right-40' : '-left-40'} w-80 h-80 rounded-full bg-primary/5`} />
        <div className={`absolute -bottom-20 ${isRTL ? '-left-20' : '-right-20'} w-60 h-60 rounded-full bg-primary/5`} />
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6 sm:col-span-2 lg:col-span-1">
            <img src={logoUrl} alt={companyName} className="h-12 w-auto brightness-0 invert" />
            <p className="text-background/70 leading-relaxed text-sm">
              {companyDescription}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {displaySocialLinks.map((social, index) => <a key={index} href={social.href} target={social.href !== '#' ? '_blank' : undefined} rel={social.href !== '#' ? 'noopener noreferrer' : undefined} className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300" aria-label={social.label}>
                  <social.icon className="h-5 w-5" />
                </a>)}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              {isRTL ? 'روابط سريعة' : 'Quick Links'}
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-primary rounded-full" />
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(link => <li key={link.path}>
                  <Link to={link.path} className="text-background/70 hover:text-primary text-sm transition-all duration-300 hover:translate-x-1 inline-block">
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              {isRTL ? 'حلولنا' : 'Our Solutions'}
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-primary rounded-full" />
            </h3>
            <ul className="space-y-3">
              {solutions.map(solution => <li key={solution.path}>
                  <Link to={solution.path} className="text-background/70 hover:text-primary text-sm transition-all duration-300 hover:translate-x-1 inline-block">
                    {solution.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              {isRTL ? 'تواصل معنا' : 'Contact Us'}
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-primary rounded-full" />
            </h3>
            <ul className="space-y-4">
              <li className={`flex items-start gap-3 group ${isRTL ? 'flex-row' : 'flex-row'}`}>
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-all duration-300">
                  <MapPin className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <span className="text-background/70 text-sm pt-2">
                  {companyAddress}
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-all duration-300">
                  <Phone className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <a href={`tel:${companyPhone.replace(/\s/g, '')}`} className="text-background/70 hover:text-primary text-sm transition-colors" dir="ltr">
                  {companyPhone}
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-all duration-300">
                  <Mail className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <a href={`mailto:${companyEmail}`} className="text-background/70 hover:text-primary text-sm transition-colors">
                  {companyEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-background/50 text-sm text-center sm:text-start flex items-center gap-1">
              © {new Date().getFullYear()} {companyName}. {isRTL ? 'جميع الحقوق محفوظة' : 'All rights reserved'}
              
            </p>
            <div className="flex items-center gap-6 text-sm text-background/50">
              <Link to="/privacy" className="hover:text-primary transition-colors">
                {isRTL ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                {isRTL ? 'الشروط والأحكام' : 'Terms of Service'}
              </Link>
              <button onClick={scrollToTop} className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300" aria-label="Scroll to top">
                <ArrowUp className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>;
}