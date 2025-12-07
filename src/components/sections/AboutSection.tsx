import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle2, Zap, Shield, Clock, Target, Lightbulb } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';

export default function AboutSection() {
  const { isRTL } = useLanguage();

  const features = [
    {
      icon: CheckCircle2,
      title: isRTL ? 'سهولة فائقة في الاستخدام' : 'Extremely Easy to Use',
      description: isRTL ? 'واجهة مستخدم بديهية وسهلة التعلم. لا تحتاج لأي خبرة تقنية مسبقة لإدارة أعمالك بكفاءة.' : 'Intuitive and easy-to-learn user interface. No prior technical experience needed to manage your business efficiently.',
      highlights: [
        isRTL ? 'تصميم بسيط وواضح' : 'Simple and clear design',
        isRTL ? 'دروس تفاعلية مدمجة' : 'Built-in interactive tutorials',
        isRTL ? 'دعم فني سريع' : 'Fast technical support'
      ]
    },
    {
      icon: Zap,
      title: isRTL ? 'أداء فائق السرعة' : 'Lightning Fast Performance',
      description: isRTL ? 'معالجة فورية للبيانات وتحميل سريع للصفحات. لا انتظار، فقط إنتاجية عالية.' : 'Instant data processing and fast page loading. No waiting, just high productivity.',
      highlights: [
        isRTL ? 'استجابة فورية' : 'Instant response',
        isRTL ? 'خوادم عالية الأداء' : 'High-performance servers',
        isRTL ? 'تحديثات في الوقت الفعلي' : 'Real-time updates'
      ]
    },
    {
      icon: Shield,
      title: isRTL ? 'أمان بمعايير عالمية' : 'World-Class Security',
      description: isRTL ? 'حماية متقدمة لبياناتك مع تشفير على مستوى البنوك ونسخ احتياطي يومي تلقائي.' : 'Advanced protection for your data with bank-level encryption and automatic daily backups.',
      highlights: [
        isRTL ? 'تشفير SSL/TLS' : 'SSL/TLS Encryption',
        isRTL ? 'نسخ احتياطي يومي' : 'Daily backups',
        isRTL ? 'مراقبة أمنية 24/7' : '24/7 Security monitoring'
      ]
    },
    {
      icon: Clock,
      title: isRTL ? 'توفير الوقت والجهد' : 'Save Time and Effort',
      description: isRTL ? 'أتمتة المهام المتكررة والعمليات الروتينية. ركز على تنمية أعمالك بدلاً من الإدارة.' : 'Automate repetitive tasks and routine processes. Focus on growing your business instead of management.',
      highlights: [
        isRTL ? 'أتمتة ذكية' : 'Smart automation',
        isRTL ? 'تقارير تلقائية' : 'Automatic reports',
        isRTL ? 'إشعارات ذكية' : 'Smart notifications'
      ]
    },
    {
      icon: Target,
      title: isRTL ? 'تقارير وتحليلات دقيقة' : 'Accurate Reports & Analytics',
      description: isRTL ? 'رؤى تحليلية عميقة تساعدك على اتخاذ قرارات مبنية على بيانات حقيقية.' : 'Deep analytical insights help you make decisions based on real data.',
      highlights: [
        isRTL ? 'لوحة تحكم تفاعلية' : 'Interactive dashboard',
        isRTL ? 'تقارير مخصصة' : 'Custom reports',
        isRTL ? 'مؤشرات الأداء' : 'KPI tracking'
      ]
    },
    {
      icon: Lightbulb,
      title: isRTL ? 'تكامل سلس' : 'Seamless Integration',
      description: isRTL ? 'تكامل سهل مع أدواتك الحالية وربط مع خدمات خارجية متعددة.' : 'Easy integration with your existing tools and connection with multiple external services.',
      highlights: [
        isRTL ? 'API مفتوح' : 'Open API',
        isRTL ? 'تكامل مع الدفع' : 'Payment integration',
        isRTL ? 'ربط مع البريد' : 'Email integration'
      ]
    }
  ];

  return (
    <section id="about" className="section-gradient py-16 sm:py-20 lg:py-24" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block rounded-full bg-primary/10 font-semibold mb-4 px-5 sm:px-6 py-2 sm:py-3 text-primary text-lg sm:text-xl">
            {isRTL ? 'لماذا Libro Tech؟' : 'Why Libro Tech?'}
          </span>
          <SectionTitle
            darkText={isRTL ? 'كل ما تحتاجه' : 'Everything You Need to'}
            highlightText={isRTL ? 'لتحويل عملك' : 'Digitize Your'}
            darkTextEnd={isRTL ? 'رقمياً' : 'Business'}
            className="mb-4"
          />
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            {isRTL ? 'منظومة متكاملة من الأدوات والحلول المصممة خصيصاً لنجاح مشروعك' : 'A comprehensive ecosystem of tools and solutions designed specifically for your project success'}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary-foreground" />
              </div>
              
              {/* Content */}
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed text-sm sm:text-base">
                {feature.description}
              </p>
              
              {/* Highlights */}
              <div className="space-y-2">
                {feature.highlights.map((highlight, idx) => (
                  <div key={idx} className={`flex items-center gap-2 text-sm text-muted-foreground ${isRTL ? 'flex-row' : 'flex-row'}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
