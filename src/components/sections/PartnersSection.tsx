import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  display_order: number;
}

export default function PartnersSection() {
  const { isRTL } = useLanguage();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const { data, error } = await supabase
          .from('partners')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setPartners(data || []);
      } catch (error) {
        console.error('Error fetching partners:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 bg-background border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-4 w-32 bg-muted rounded mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center justify-center p-4">
                <div className="w-16 h-16 rounded-xl bg-muted animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (partners.length === 0) return null;

  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-muted-foreground text-sm uppercase tracking-wider font-medium">
            {isRTL ? 'شركاء النجاح' : 'Trusted Partners'}
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
          {partners.map((partner) => {
            const content = (
              <div className="group flex items-center justify-center p-4 rounded-xl hover:bg-muted/50 transition-colors">
                {partner.logo_url ? (
                  <img 
                    src={partner.logo_url} 
                    alt={partner.name}
                    className="w-16 h-16 object-contain group-hover:scale-110 transition-transform"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center text-muted-foreground font-bold text-xl group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                    {partner.name.slice(0, 3).toUpperCase()}
                  </div>
                )}
              </div>
            );

            return partner.website_url ? (
              <a 
                key={partner.id} 
                href={partner.website_url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {content}
              </a>
            ) : (
              <div key={partner.id}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
