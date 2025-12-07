import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Building2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import SectionTitle from '@/components/ui/SectionTitle';

import industryCommercial from '@/assets/industry-commercial.jpg';
import industryFactory from '@/assets/industry-factory.jpg';
import industryRestaurant from '@/assets/industry-restaurant.jpg';
import industryServices from '@/assets/industry-services.jpg';
import industryEcommerce from '@/assets/industry-ecommerce.jpg';

interface Industry {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string | null;
  description_ar: string | null;
  icon_url: string | null;
}

const fallbackIndustries = [
  { id: '1', name_ar: 'شركات تجارية', name_en: 'Commercial Companies', description_ar: 'إدارة شاملة للعمليات التجارية، المبيعات، المشتريات، والموارد البشرية', description_en: 'Comprehensive management for commercial operations, sales, and HR', icon_url: industryCommercial, link: '/industries/commercial' },
  { id: '2', name_ar: 'مصانع', name_en: 'Factories', description_ar: 'تتبع خطوط الإنتاج، إدارة المخزون والمواد الخام، مراقبة الجودة', description_en: 'Track production lines, manage inventory and raw materials', icon_url: industryFactory, link: '/industries/factories' },
  { id: '3', name_ar: 'مطاعم وكافيهات', name_en: 'Restaurants & Cafes', description_ar: 'نظام متكامل لإدارة الطلبات، المخزون، الموظفين، والحجوزات', description_en: 'Complete system for orders, inventory, and reservations', icon_url: industryRestaurant, link: '/industries/restaurants' },
  { id: '4', name_ar: 'مكاتب خدمات', name_en: 'Service Offices', description_ar: 'تنظيم سير العمل، إدارة المشاريع والعملاء، جدولة المواعيد', description_en: 'Workflow organization, project and client management', icon_url: industryServices, link: '/industries/services' },
  { id: '5', name_ar: 'متاجر إلكترونية', name_en: 'E-commerce Stores', description_ar: 'إدارة المتجر، الطلبات، الشحن، المدفوعات، والمخزون', description_en: 'Store, orders, shipping, payments, and inventory management', icon_url: industryEcommerce, link: '/industries/ecommerce' },
];

export default function IndustriesSection() {
  const { isRTL } = useLanguage();
  const [industries, setIndustries] = useState<(Industry & { link?: string })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const { data, error } = await supabase.from('industries').select('*').order('created_at', { ascending: true });
        if (error) throw error;
        if (data && data.length > 0) {
          const mappedIndustries = data.map(ind => ({ ...ind, link: getIndustryLink(ind.name_en) }));
          setIndustries(mappedIndustries);
        } else {
          setIndustries(fallbackIndustries);
        }
      } catch (error) {
        console.error('Error fetching industries:', error);
        setIndustries(fallbackIndustries);
      } finally {
        setIsLoading(false);
      }
    };
    fetchIndustries();
  }, []);

  const getIndustryLink = (name: string): string => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('commercial')) return '/industries/commercial';
    if (nameLower.includes('factor')) return '/industries/factories';
    if (nameLower.includes('restaurant') || nameLower.includes('cafe')) return '/industries/restaurants';
    if (nameLower.includes('service') || nameLower.includes('office')) return '/industries/services';
    if (nameLower.includes('ecommerce') || nameLower.includes('e-commerce')) return '/industries/ecommerce';
    return '/industries';
  };

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  if (isLoading) {
    return (
      <section id="industries" className="section-muted py-16 sm:py-20 lg:py-24" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="h-6 sm:h-8 w-32 sm:w-40 bg-muted rounded-full mx-auto mb-4 animate-pulse" />
            <div className="h-8 sm:h-10 w-64 sm:w-80 bg-muted rounded mx-auto mb-4 animate-pulse" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`rounded-2xl bg-card border border-border animate-pulse ${i === 1 ? 'sm:col-span-2 lg:col-span-2' : ''}`}>
                <div className={`bg-muted ${i === 1 ? 'h-48 sm:h-64' : 'h-40 sm:h-48'}`} />
                <div className="p-5 sm:p-6"><div className="h-5 sm:h-6 w-3/4 bg-muted rounded mb-2" /><div className="h-4 w-full bg-muted rounded" /></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="industries" className="section-muted py-16 sm:py-20 lg:py-24" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            {isRTL ? 'من نخدم' : 'Who We Serve'}
          </span>
          <SectionTitle
            darkText={isRTL ? 'القطاعات' : 'Industries'}
            highlightText={isRTL ? 'المستفيدة' : 'We Serve'}
            className="mb-4"
          />
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            {isRTL ? 'حلول Libro Tech مصممة لتلبية احتياجات مختلف القطاعات والصناعات بكفاءة عالية' : 'Libro Tech solutions are designed to efficiently meet the needs of various sectors and industries'}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {industries.map((industry, index) => (
            <Link key={industry.id} to={industry.link || '/industries'} className={`group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${index === 0 ? 'sm:col-span-2 lg:col-span-2' : ''}`}>
              <div className={`relative overflow-hidden ${index === 0 ? 'h-48 sm:h-64' : 'h-40 sm:h-48'}`}>
                {industry.icon_url ? (
                  <img src={industry.icon_url} alt={isRTL ? industry.name_ar : industry.name_en} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center"><Building2 className="h-12 sm:h-16 w-12 sm:w-16 text-primary/30" /></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                <div className={`absolute top-3 sm:top-4 ${isRTL ? 'left-3 sm:left-4' : 'right-3 sm:right-4'} w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300`}>
                  <Arrow className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                </div>
              </div>
              <div className={`p-5 sm:p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{isRTL ? industry.name_ar : industry.name_en}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{isRTL ? industry.description_ar : industry.description_en}</p>
                <div className={`flex items-center gap-2 mt-3 sm:mt-4 text-primary font-medium text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span>{isRTL ? 'اكتشف المزيد' : 'Learn More'}</span>
                  <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-12">
          <Link to="/industries" className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
            {isRTL ? 'استكشف جميع القطاعات' : 'Explore All Industries'}
            <Arrow className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
