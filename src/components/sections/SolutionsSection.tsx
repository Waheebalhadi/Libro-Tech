import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Briefcase
} from 'lucide-react';
import { useEffect, useState } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import { supabase } from '@/integrations/supabase/client';

interface Service {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string | null;
  description_ar: string | null;
  icon_url: string | null;
}

export default function SolutionsSection() {
  const { isRTL } = useLanguage();
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
    'bg-primary',
    'bg-blue-500',
    'bg-emerald-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-cyan-500',
  ];

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const Chevron = isRTL ? ChevronLeft : ChevronRight;

  if (isLoading) {
    return (
      <section id="solutions" className="section-light py-16 sm:py-20 lg:py-24" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="h-6 sm:h-8 w-40 sm:w-48 bg-muted rounded-full mx-auto mb-4 animate-pulse" />
            <div className="h-8 sm:h-10 w-72 sm:w-96 bg-muted rounded mx-auto mb-4 animate-pulse" />
            <div className="h-5 sm:h-6 w-64 sm:w-80 bg-muted rounded mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="p-6 sm:p-8 rounded-2xl bg-card border border-border animate-pulse">
                <div className="w-14 sm:w-16 h-14 sm:h-16 bg-muted rounded-2xl mb-5 sm:mb-6" />
                <div className="h-5 sm:h-6 w-3/4 bg-muted rounded mb-3" />
                <div className="h-4 w-full bg-muted rounded mb-2" />
                <div className="h-4 w-2/3 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return null;
  }

  return (
    <section id="solutions" className="section-light py-16 sm:py-20 lg:py-24" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            {isRTL ? 'حلولنا المتكاملة' : 'Our Integrated Solutions'}
          </span>
          <SectionTitle
            darkText={isRTL ? 'أنظمة ذكية' : 'Smart Systems to'}
            highlightText={isRTL ? 'لإدارة كل جوانب' : 'Manage Every Aspect'}
            darkTextEnd={isRTL ? 'عملك' : 'of Your Business'}
            className="mb-4"
          />
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            {isRTL 
              ? 'منظومة متكاملة من الحلول التقنية المترابطة التي تعمل معاً لتحقيق أقصى كفاءة لعملك'
              : 'An integrated ecosystem of interconnected technology solutions that work together to achieve maximum efficiency for your business'
            }
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {/* Icon */}
              <div className={`w-14 sm:w-16 h-14 sm:h-16 ${colorPalette[index % colorPalette.length]} rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg overflow-hidden`}>
                {service.icon_url ? (
                  <img 
                    src={service.icon_url} 
                    alt={isRTL ? service.name_ar : service.name_en}
                    className="w-8 sm:w-10 h-8 sm:h-10 object-contain"
                  />
                ) : (
                  <Briefcase className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground" />
                )}
              </div>
              
              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                {isRTL ? service.name_ar : service.name_en}
              </h3>
              
              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-5 sm:mb-6 line-clamp-3 text-sm sm:text-base">
                {isRTL ? service.description_ar : service.description_en}
              </p>

              {/* Learn More Link */}
              <Link 
                to="/solutions"
                className={`inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {isRTL ? 'اكتشف المزيد' : 'Learn More'}
                <Chevron className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-10 sm:mt-12">
          <Link to="/solutions">
            <Button size="lg" className={`bg-gradient-to-r from-primary to-primary/90 hover:opacity-90 shadow-lg px-6 sm:px-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {isRTL ? 'استكشف جميع الحلول' : 'Explore All Solutions'}
              <Arrow className={`h-5 w-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
