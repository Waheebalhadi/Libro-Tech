import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTASection from '@/components/sections/CTASection';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Building2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import SectionTitle from '@/components/ui/SectionTitle';
import PageHero from '@/components/ui/PageHero';

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

// Fallback images for industries
const fallbackImages: Record<string, string> = {
  'commercial': industryCommercial,
  'factor': industryFactory,
  'restaurant': industryRestaurant,
  'cafe': industryRestaurant,
  'service': industryServices,
  'office': industryServices,
  'ecommerce': industryEcommerce,
  'e-commerce': industryEcommerce,
};

const getIndustryImage = (name: string, iconUrl: string | null): string => {
  if (iconUrl) return iconUrl;
  const nameLower = name.toLowerCase();
  for (const [key, value] of Object.entries(fallbackImages)) {
    if (nameLower.includes(key)) return value;
  }
  return industryCommercial;
};

const getIndustryLink = (name: string): string => {
  const nameLower = name.toLowerCase();
  if (nameLower.includes('commercial')) return '/industries/commercial';
  if (nameLower.includes('factor')) return '/industries/factories';
  if (nameLower.includes('restaurant') || nameLower.includes('cafe')) return '/industries/restaurants';
  if (nameLower.includes('service') || nameLower.includes('office')) return '/industries/services';
  if (nameLower.includes('ecommerce') || nameLower.includes('e-commerce')) return '/industries/ecommerce';
  return '/industries';
};

export default function Industries() {
  const { t, isRTL } = useLanguage();
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const { data, error } = await supabase
          .from('industries')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;
        setIndustries(data || []);
      } catch (error) {
        console.error('Error fetching industries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIndustries();
  }, []);

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <PageHero
          badge={isRTL ? 'القطاعات المستفيدة' : 'Industries We Serve'}
          title={t('industries.title')}
          subtitle={t('industries.subtitle')}
        />

        {/* Industries Grid */}
        <section className="section-muted py-20 lg:py-28" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="rounded-3xl bg-card border border-border animate-pulse overflow-hidden">
                    <div className="h-56 bg-muted" />
                    <div className="p-6">
                      <div className="h-6 w-3/4 bg-muted rounded mb-3" />
                      <div className="h-4 w-full bg-muted rounded mb-2" />
                      <div className="h-4 w-2/3 bg-muted rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : industries.length === 0 ? (
              <div className="text-center py-20">
                <Building2 className="h-20 w-20 text-muted-foreground/30 mx-auto mb-6" />
                <p className="text-muted-foreground text-xl">
                  {isRTL ? 'لا توجد قطاعات حالياً' : 'No industries available'}
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {industries.map((industry, index) => (
                  <Link 
                    key={industry.id} 
                    to={getIndustryLink(industry.name_en)}
                    className={`group relative overflow-hidden rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 animate-fade-in ${index === 0 ? 'sm:col-span-2 lg:col-span-1 lg:row-span-2' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Image */}
                    <div className={`relative overflow-hidden ${index === 0 ? 'h-72 sm:h-96 lg:h-full lg:min-h-[450px]' : 'h-56'}`}>
                      <img 
                        src={getIndustryImage(industry.name_en, industry.icon_url)} 
                        alt={isRTL ? industry.name_ar : industry.name_en}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
                      
                      {/* Arrow Icon */}
                      <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} w-12 h-12 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110`}>
                        <Arrow className="w-6 h-6 text-primary-foreground" />
                      </div>

                      {/* Content Overlay for large card */}
                      {index === 0 && (
                        <div className={`absolute bottom-0 left-0 right-0 p-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                          <h3 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">
                            {isRTL ? industry.name_ar : industry.name_en}
                          </h3>
                          <p className="text-primary-foreground/80 text-sm sm:text-base leading-relaxed mb-5 max-w-md">
                            {isRTL ? industry.description_ar : industry.description_en}
                          </p>
                          <div className={`flex items-center gap-2 text-primary-foreground font-medium ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span>{isRTL ? 'اكتشف المزيد' : 'Learn More'}</span>
                            <Arrow className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Content for regular cards */}
                    {index !== 0 && (
                      <div className={`p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                          {isRTL ? industry.name_ar : industry.name_en}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
                          {isRTL ? industry.description_ar : industry.description_en}
                        </p>
                        <div className={`flex items-center gap-2 text-primary font-medium text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span>{isRTL ? 'اكتشف المزيد' : 'Learn More'}</span>
                          <Arrow className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                        </div>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="text-center mt-20">
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-3xl p-10 md:p-14 max-w-3xl mx-auto border border-primary/10">
                <SectionTitle
                  darkText={isRTL ? 'لا تجد' : "Don't see your"}
                  highlightText={isRTL ? 'قطاعك؟' : 'industry?'}
                  className="mb-4"
                  size="md"
                />
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  {isRTL 
                    ? 'نقدم حلولاً مخصصة لجميع القطاعات. تواصل معنا لمناقشة احتياجات عملك'
                    : 'We offer customized solutions for all industries. Contact us to discuss your business needs'
                  }
                </p>
                <Link to="/contact">
                  <Button size="lg" className={`bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 px-10 py-6 rounded-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {isRTL ? 'تواصل معنا الآن' : 'Contact Us Now'}
                    <Arrow className={`h-5 w-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
