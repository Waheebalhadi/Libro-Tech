import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTASection from '@/components/sections/CTASection';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Briefcase, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import SectionTitle from '@/components/ui/SectionTitle';
import PageHero from '@/components/ui/PageHero';

interface Service {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string | null;
  description_ar: string | null;
  icon_url: string | null;
}

export default function Solutions() {
  const { t, isRTL } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;
        setServices(data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const colorPalette = [
    'from-primary to-primary/70',
    'from-blue-500 to-blue-400',
    'from-emerald-500 to-emerald-400',
    'from-orange-500 to-orange-400',
    'from-pink-500 to-pink-400',
    'from-cyan-500 to-cyan-400',
    'from-violet-500 to-violet-400',
    'from-amber-500 to-amber-400',
    'from-teal-500 to-teal-400',
    'from-rose-500 to-rose-400',
  ];

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const Chevron = isRTL ? ChevronLeft : ChevronRight;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <PageHero
          badge={isRTL ? 'حلولنا المتكاملة' : 'Our Integrated Solutions'}
          title={t('solutions.title')}
          subtitle={t('solutions.subtitle')}
        />

        {/* Services Grid */}
        <section className="section-light py-20 lg:py-28" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="p-8 rounded-3xl bg-card border border-border animate-pulse">
                    <div className="w-16 h-16 bg-muted rounded-2xl mb-6" />
                    <div className="h-6 w-3/4 bg-muted rounded mb-3" />
                    <div className="h-4 w-full bg-muted rounded mb-2" />
                    <div className="h-4 w-2/3 bg-muted rounded" />
                  </div>
                ))}
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-20">
                <Briefcase className="h-20 w-20 text-muted-foreground/30 mx-auto mb-6" />
                <p className="text-muted-foreground text-xl">
                  {isRTL ? 'لا توجد خدمات حالياً' : 'No services available'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    className={`group p-8 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 animate-fade-in ${isRTL ? 'text-right' : 'text-left'}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${colorPalette[index % colorPalette.length]} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg overflow-hidden`}>
                      {service.icon_url ? (
                        <img 
                          src={service.icon_url} 
                          alt={isRTL ? service.name_ar : service.name_en}
                          className="w-10 h-10 object-contain"
                        />
                      ) : (
                        <Briefcase className="h-8 w-8 text-primary-foreground" />
                      )}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {isRTL ? service.name_ar : service.name_en}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                      {isRTL ? service.description_ar : service.description_en}
                    </p>

                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      <div className={`flex items-center gap-2 text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>{isRTL ? 'واجهة سهلة الاستخدام' : 'Easy to use interface'}</span>
                      </div>
                      <div className={`flex items-center gap-2 text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>{isRTL ? 'تقارير وتحليلات متقدمة' : 'Advanced reports & analytics'}</span>
                      </div>
                    </div>

                    {/* Learn More Link */}
                    <Link 
                      to="/contact"
                      className={`inline-flex items-center gap-2 text-primary font-semibold text-sm group/link ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      {isRTL ? 'اطلب عرض سعر' : 'Request Quote'}
                      <Chevron className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="text-center mt-20">
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-3xl p-10 md:p-14 max-w-3xl mx-auto border border-primary/10">
                <SectionTitle
                  darkText={isRTL ? 'هل تحتاج مساعدة في' : 'Need help'}
                  highlightText={isRTL ? 'اختيار الحل المناسب؟' : 'choosing the right solution?'}
                  className="mb-4"
                  size="md"
                />
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  {isRTL 
                    ? 'فريقنا جاهز لمساعدتك في تحديد أفضل الحلول التي تناسب احتياجات عملك'
                    : 'Our team is ready to help you identify the best solutions for your business needs'
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
