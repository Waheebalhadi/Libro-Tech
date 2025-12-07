import { useLanguage } from '@/contexts/LanguageContext';
import { Star, Quote } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Testimonial {
  id: string;
  name_ar: string;
  name_en: string;
  role_ar: string | null;
  role_en: string | null;
  company_ar: string | null;
  company_en: string | null;
  content_ar: string;
  content_en: string;
  rating: number;
  avatar_url: string | null;
}

export default function TestimonialsSection() {
  const { isRTL } = useLanguage();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;
        setTestimonials(data || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-8 w-40 bg-muted rounded-full mx-auto mb-4 animate-pulse" />
            <div className="h-10 w-80 bg-muted rounded mx-auto mb-4 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-8 rounded-2xl bg-card border border-border animate-pulse">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="w-5 h-5 bg-muted rounded" />
                  ))}
                </div>
                <div className="h-24 bg-muted rounded mb-6" />
                <div className="flex items-center gap-4 pt-6 border-t border-border">
                  <div className="w-12 h-12 rounded-full bg-muted" />
                  <div>
                    <div className="h-4 w-24 bg-muted rounded mb-2" />
                    <div className="h-3 w-32 bg-muted rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            {isRTL ? 'آراء عملائنا' : 'Client Testimonials'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {isRTL ? 'ماذا يقول عملاؤنا عنا' : 'What Our Clients Say About Us'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isRTL 
              ? 'نفخر بثقة عملائنا ورضاهم عن خدماتنا وحلولنا المتكاملة'
              : 'We are proud of our clients trust and satisfaction with our services and integrated solutions'
            }
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Quote className="h-6 w-6 text-primary" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground leading-relaxed mb-6 min-h-[100px]">
                "{isRTL ? testimonial.content_ar : testimonial.content_en}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                {testimonial.avatar_url ? (
                  <img 
                    src={testimonial.avatar_url} 
                    alt={isRTL ? testimonial.name_ar : testimonial.name_en}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-lg">
                    {(isRTL ? testimonial.name_ar : testimonial.name_en).charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-foreground">
                    {isRTL ? testimonial.name_ar : testimonial.name_en}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {isRTL ? testimonial.role_ar : testimonial.role_en} - {isRTL ? testimonial.company_ar : testimonial.company_en}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
