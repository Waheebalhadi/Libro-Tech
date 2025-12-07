import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import SectionTitle from '@/components/ui/SectionTitle';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  id: string;
  question_ar: string;
  question_en: string;
  answer_ar: string;
  answer_en: string;
  display_order: number;
}

export default function FAQSection() {
  const { isRTL } = useLanguage();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const { data, error } = await supabase
          .from('faqs')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setFaqs(data || []);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  if (isLoading) {
    return (
      <section className="section-gradient py-16 sm:py-20 lg:py-24" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <div className="h-6 sm:h-8 w-28 sm:w-32 bg-muted rounded-full mb-4 animate-pulse" />
              <div className="h-8 sm:h-10 w-56 sm:w-64 bg-muted rounded mb-4 animate-pulse" />
              <div className="h-5 sm:h-6 w-40 sm:w-48 bg-muted rounded animate-pulse" />
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4 sm:p-5 animate-pulse">
                  <div className="h-5 sm:h-6 w-3/4 bg-muted rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (faqs.length === 0) return null;

  return (
    <section className="section-gradient py-16 sm:py-20 lg:py-24" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Header */}
          <div className={`lg:sticky lg:top-32 ${isRTL ? 'text-right' : 'text-left'}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              {isRTL ? 'الأسئلة الشائعة' : 'FAQ'}
            </span>
            <SectionTitle
              darkText={isRTL ? 'أسئلة' : 'Frequently Asked'}
              highlightText={isRTL ? 'يكثر طرحها' : 'Questions'}
              className="mb-4"
            />
            <p className="text-muted-foreground text-base sm:text-lg mb-6">
              {isRTL 
                ? 'إجابات على أكثر الأسئلة شيوعاً حول خدماتنا وأنظمتنا.'
                : 'Answers to the most common questions about our services and systems.'
              }
            </p>
            <p className="text-muted-foreground text-sm sm:text-base">
              {isRTL ? 'لم تجد إجابتك؟ ' : 'Didn\'t find your answer? '}
              <Link to="/contact" className="text-primary font-semibold hover:underline">
                {isRTL ? 'تواصل معنا' : 'Contact us'}
              </Link>
            </p>
          </div>

          {/* Right Side - Accordion */}
          <div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.id}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-4 sm:px-5 data-[state=open]:border-primary/30 data-[state=open]:shadow-md transition-all duration-200"
                >
                  <AccordionTrigger className={`text-sm sm:text-base font-semibold text-foreground hover:text-primary py-4 sm:py-5 hover:no-underline ${isRTL ? 'text-right flex-row-reverse' : 'text-left'}`}>
                    {isRTL ? faq.question_ar : faq.question_en}
                  </AccordionTrigger>
                  <AccordionContent className={`text-muted-foreground leading-relaxed pb-4 sm:pb-5 text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? faq.answer_ar : faq.answer_en}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
