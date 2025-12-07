import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Receipt, FileText, Users, Package, Calendar, CreditCard, Settings, PieChart, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
interface HomepageData {
  title_ar: string;
  title_en: string;
  subtitle_ar: string | null;
  subtitle_en: string | null;
  hero_image_url: string | null;
}
export default function HeroSection() {
  const {
    t,
    isRTL
  } = useLanguage();
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null);
  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        const {
          data,
          error
        } = await supabase.from('homepage').select('title_ar, title_en, subtitle_ar, subtitle_en, hero_image_url').limit(1).maybeSingle();
        if (error) throw error;
        setHomepageData(data);
      } catch (error) {
        console.error('Error fetching homepage:', error);
      }
    };
    fetchHomepage();
  }, []);
  const features = [{
    label: isRTL ? 'نساعد شركاتك تنمو بتكنولوجيا متكاملة' : 'We help your companies grow with integrated technology'
  }, {
    label: isRTL ? 'نظام واحد يدير كل أقسامك من المحاسبة إلى الموارد البشرية' : 'One system manages all your departments from accounting to HR'
  }];
  const dashboardIcons = [{
    icon: Receipt,
    label: isRTL ? 'المحاسبة العامة' : 'Accounting',
    color: 'bg-primary'
  }, {
    icon: FileText,
    label: isRTL ? 'الفواتير الإلكترونية' : 'Invoices',
    color: 'bg-blue-500'
  }, {
    icon: Users,
    label: isRTL ? 'إدارة المستودعات' : 'Warehouses',
    color: 'bg-teal-500'
  }, {
    icon: Package,
    label: isRTL ? 'إدارة المخزون' : 'Inventory',
    color: 'bg-orange-500'
  }, {
    icon: Calendar,
    label: isRTL ? 'الموارد البشرية' : 'HR',
    color: 'bg-pink-500'
  }, {
    icon: CreditCard,
    label: isRTL ? 'الحضور والانصراف' : 'Attendance',
    color: 'bg-indigo-500'
  }, {
    icon: Settings,
    label: isRTL ? 'التخليص الجمركي' : 'Customs',
    color: 'bg-emerald-500'
  }, {
    icon: PieChart,
    label: isRTL ? 'إدارة الأصول الثابتة' : 'Assets',
    color: 'bg-amber-500'
  }, {
    icon: LayoutDashboard,
    label: isRTL ? 'الموافقات الإلكترونية' : 'Approvals',
    color: 'bg-cyan-500'
  }];
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  // Get title from database or use defaults
  const title = isRTL ? homepageData?.title_ar || 'Libro Tech: شريكك للتحول الإداري والتقني الشامل من A to Z' : homepageData?.title_en || 'Libro Tech: Your Partner for Complete Administrative & Technical Transformation from A to Z';
  const subtitle = isRTL ? homepageData?.subtitle_ar || 'منصة متكاملة تصمم، تدير، وتسوّق أعمالك إلكترونياً، لتحويل مشروعك من الإدارة التقليدية إلى منظومة عمل رقمية احترافية.' : homepageData?.subtitle_en || 'An integrated platform that designs, manages, and markets your business electronically, transforming your project from traditional management to a professional digital work system.';
  return <section className="relative min-h-screen flex items-center overflow-hidden bg-primary" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className={`absolute top-20 ${isRTL ? 'right-20' : 'left-20'} w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full border-[20px] md:border-[40px] border-primary-foreground/10`} />
        <div className={`absolute -bottom-40 ${isRTL ? '-left-40' : '-right-40'} w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full border-[30px] md:border-[60px] border-primary-foreground/5`} />
        <div className={`absolute top-40 ${isRTL ? 'left-1/3' : 'right-1/3'} w-4 h-4 rounded-full bg-primary-foreground/20`} />
        <div className={`absolute bottom-1/3 ${isRTL ? 'right-1/4' : 'left-1/4'} w-3 h-3 rounded-full bg-primary-foreground/15`} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-28 sm:pt-32 pb-8">
        {/* Top Banner */}
        <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'} mb-6 sm:mb-8`}>
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-primary-foreground/10 backdrop-blur-sm">
            <div className={`flex ${isRTL ? 'space-x-reverse' : ''} -space-x-2`}>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-400 border-2 border-primary-foreground flex items-center justify-center text-primary-foreground text-xs font-bold">أ</div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-400 border-2 border-primary-foreground flex items-center justify-center text-primary-foreground text-xs font-bold">م</div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary-glow border-2 border-primary-foreground flex items-center justify-center text-primary-foreground text-xs font-bold">س</div>
            </div>
            <span className="text-primary-foreground text-xs sm:text-sm">
              {isRTL ? 'تبحث عن النجاح وتنظيم أعمالك بكفاءة؟' : 'Looking for success and efficiency?'}
            </span>
            <span className="px-2 sm:px-3 py-1 rounded-full bg-primary-foreground text-primary text-xs sm:text-sm font-bold">
              {isRTL ? 'خلّها علينا' : 'Leave it to us'}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Dashboard Preview */}
          <div className={`${isRTL ? 'lg:order-2' : 'lg:order-1'} order-2 animate-slide-up`} style={{
          animationDelay: '0.3s'
        }}>
            <div className="relative">
              <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-lg">
                {/* Monitor Screen */}
                <div className="relative bg-card rounded-t-xl sm:rounded-t-2xl shadow-2xl overflow-hidden border-4 sm:border-8 border-foreground/80 rounded-b-none">
                  {/* Browser Bar */}
                  <div className="bg-muted px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2">
                    <div className="flex gap-1 sm:gap-1.5">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-destructive/60" />
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-400" />
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 mx-2 sm:mx-3">
                      <div className="bg-card rounded h-4 sm:h-5 w-full max-w-[150px] sm:max-w-[200px]" />
                    </div>
                  </div>
                  
                  {/* Dashboard Content */}
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-muted to-muted/50">
                    {/* Dashboard Header */}
                    <div className="mb-3 sm:mb-4 flex-col flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-primary items-center justify-center flex flex-row">
                          <span className="text-primary-foreground text-xs font-bold">L</span>
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-foreground text-center">Libro Tech</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        
                        
                      </div>
                    </div>
                    
                    {/* Icons Grid */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {dashboardIcons.map((item, index) => <div key={index} className="flex flex-col items-center p-2 sm:p-3 bg-card rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow">
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 ${item.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-1 sm:mb-2`}>
                            <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                          </div>
                          <span className="text-[8px] sm:text-[10px] text-muted-foreground text-center leading-tight">{item.label}</span>
                        </div>)}
                    </div>
                  </div>
                </div>
                
                {/* Monitor Stand */}
                <div className="w-16 sm:w-24 h-10 sm:h-16 mx-auto bg-gradient-to-b from-foreground/70 to-foreground/80 rounded-b-lg" />
                <div className="w-28 sm:w-40 h-2 sm:h-3 mx-auto bg-gradient-to-b from-foreground/60 to-foreground/70 rounded-full" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className={`${isRTL ? 'lg:order-1 text-right' : 'lg:order-2 text-left'} order-1 w-full`}>
            {/* Title */}
            <h1 className={`text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-3 sm:mb-4 leading-tight animate-slide-up ${!isRTL ? 'break-words hyphens-auto' : ''}`}>
              {title}
            </h1>

            {/* Subtitle */}
            <p className={`text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-primary-foreground font-medium mb-3 sm:mb-4 animate-slide-up leading-relaxed ${!isRTL ? 'break-words' : ''}`} style={{
            animationDelay: '0.1s'
          }}>
              {subtitle}
            </p>

            {/* Description */}
            <p className={`text-xs xs:text-sm sm:text-base text-primary-foreground/80 mb-5 sm:mb-8 leading-relaxed animate-slide-up ${isRTL ? '' : 'max-w-xl'}`} style={{
            animationDelay: '0.15s'
          }}>
              {isRTL ? 'نساعد مشروعك على التحول الكامل إلى إدارة تكنولوجية ذكية متكاملة. نحن الذراع الإداري والتقني والتسويقي الذي يصمم نظام تشغيل عملك، ويدير كل خطواتك، لضمان الاستدامة.' : 'We help your project fully transform into smart integrated technology management. We are the administrative, technical, and marketing arm that designs your business operating system and manages every step to ensure sustainability.'}
            </p>

            {/* CTA Button */}
            <div className="animate-slide-up mb-5 sm:mb-8" style={{
            animationDelay: '0.2s'
          }}>
              <Link to="/contact">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-primary-foreground shadow-lg px-5 sm:px-8 lg:px-10 py-4 sm:py-6 lg:py-7 text-sm sm:text-lg lg:text-xl font-bold rounded-xl w-full sm:w-auto whitespace-normal text-center">
                  {isRTL ? 'تواصل الآن - ابدأ التحول الرقمي' : 'Contact Now - Start Digital Transformation'}
                  <Arrow className={`h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 flex-shrink-0 ${isRTL ? 'mr-2 sm:mr-3' : 'ml-2 sm:ml-3'}`} />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Features Banner */}
        <div className="mt-6 sm:mt-8 bg-primary-dark/50 backdrop-blur-sm rounded-xl py-3 sm:py-4 px-4 sm:px-6 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-8">
          {features.map((feature, index) => <div key={index} className="flex items-center gap-2 text-primary-foreground">
              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-center sm:text-start">{feature.label}</span>
            </div>)}
        </div>
      </div>
    </section>;
}