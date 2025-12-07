import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AboutSection from '@/components/sections/AboutSection';
import CTASection from '@/components/sections/CTASection';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users, Award, Globe, Lightbulb, Target, Zap } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import PageHero from '@/components/ui/PageHero';
export default function About() {
  const {
    t,
    isRTL
  } = useLanguage();
  const teamStats = [{
    icon: Users,
    value: '50+',
    labelAr: 'فريق عمل متخصص',
    labelEn: 'Expert Team Members'
  }, {
    icon: Award,
    value: '15+',
    labelAr: 'جائزة وشهادة',
    labelEn: 'Awards & Certificates'
  }, {
    icon: Globe,
    value: '5+',
    labelAr: 'دول نعمل فيها',
    labelEn: 'Countries Served'
  }, {
    icon: Lightbulb,
    value: '100+',
    labelAr: 'مشروع ابتكاري',
    labelEn: 'Innovative Projects'
  }];
  const values = [{
    icon: Target,
    titleAr: 'رسالتنا',
    titleEn: 'Our Mission',
    descAr: 'تمكين الشركات من تحقيق أقصى إمكاناتها من خلال حلول تقنية مبتكرة تدفع عجلة النمو والتحول الرقمي.',
    descEn: 'Empowering businesses to achieve their full potential through innovative technology solutions that drive growth and digital transformation.'
  }, {
    icon: Globe,
    titleAr: 'رؤيتنا',
    titleEn: 'Our Vision',
    descAr: 'أن نكون الشريك التقني الأول للمؤسسات في المنطقة العربية، ونقود التحول الرقمي بأعلى معايير الجودة.',
    descEn: 'To be the leading technology partner for organizations in the Arab region, leading digital transformation with the highest quality standards.'
  }, {
    icon: Zap,
    titleAr: 'قيمنا',
    titleEn: 'Our Values',
    descAr: 'الابتكار المستمر، الجودة العالية، الشفافية التامة، والتميز في كل ما نقدمه لعملائنا.',
    descEn: 'Continuous innovation, high quality, complete transparency, and excellence in everything we deliver to our clients.'
  }];
  return <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <PageHero badge={isRTL ? 'تعرف علينا' : 'Get to Know Us'} title={t('about.title')} subtitle={isRTL ? 'نحن فريق من المتخصصين في التكنولوجيا نسعى لتحويل أعمالكم إلى عصر رقمي متكامل' : 'We are a team of technology specialists dedicated to transforming your business into a fully integrated digital era'} />

        {/* Stats Section */}
        <section className="relative -mt-10 z-20" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="container mx-auto px-4">
            
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20 section-gradient" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <SectionTitle darkText={isRTL ? 'ما' : 'What Sets'} highlightText={isRTL ? 'يميزنا' : 'Us Apart'} className="mb-4" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {isRTL ? 'نؤمن بأن التكنولوجيا يجب أن تكون في خدمة النمو والتطور' : 'We believe technology should serve growth and development'}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => <div key={index} className="group p-8 rounded-3xl bg-card border border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in" style={{
              animationDelay: `${index * 0.15}s`
            }}>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {isRTL ? value.titleAr : value.titleEn}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {isRTL ? value.descAr : value.descEn}
                  </p>
                </div>)}
            </div>
          </div>
        </section>

        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </div>;
}