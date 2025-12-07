import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactSection from '@/components/sections/ContactSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageSquare, Clock, Shield } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';

export default function Contact() {
  const { t, isRTL } = useLanguage();

  const features = [
    {
      icon: MessageSquare,
      titleAr: 'رد سريع',
      titleEn: 'Quick Response',
      descAr: 'نرد على استفساراتكم خلال 24 ساعة',
      descEn: 'We respond to your inquiries within 24 hours',
    },
    {
      icon: Clock,
      titleAr: 'دعم متواصل',
      titleEn: '24/7 Support',
      descAr: 'فريق دعم متاح على مدار الساعة',
      descEn: 'Support team available around the clock',
    },
    {
      icon: Shield,
      titleAr: 'خصوصية تامة',
      titleEn: 'Full Privacy',
      descAr: 'بياناتكم محمية ومؤمنة بالكامل',
      descEn: 'Your data is fully protected and secured',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <PageHero
          badge={isRTL ? 'نحن هنا لمساعدتك' : "We're Here to Help"}
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
        />

        {/* Features Strip */}
        <section className="relative -mt-10 z-20" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="container mx-auto px-4">
            <div className="bg-card rounded-3xl shadow-2xl p-6 md:p-8 border border-border/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-4 group animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                        {isRTL ? feature.titleAr : feature.titleEn}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {isRTL ? feature.descAr : feature.descEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
