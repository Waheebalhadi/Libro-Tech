import { useLanguage } from '@/contexts/LanguageContext';
import GradientBanner from '@/components/ui/GradientBanner';

export default function CTASection() {
  const { isRTL } = useLanguage();

  return (
    <section className="py-12 sm:py-16 lg:py-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <GradientBanner
          title={isRTL 
            ? 'معاك طول الوقت عبر دعم فنّي مميز لخدمتك'
            : 'We\'re With You All The Way With Outstanding Technical Support'
          }
          description={isRTL 
            ? 'لو عندك أي أسئلة أو استفسارات أو اقتراحات لا تتردد! فريقنا يقدم لك الدعم الفني اللازم لمساعدتك في أي مشكلة أو استفسار'
            : 'If you have any questions, inquiries, or suggestions, don\'t hesitate! Our team provides the technical support you need to help you with any problem or inquiry'
          }
          buttonText={isRTL ? 'تواصل معنا' : 'Contact Us'}
          buttonLink="/contact"
          isRTL={isRTL}
        />
      </div>
    </section>
  );
}
