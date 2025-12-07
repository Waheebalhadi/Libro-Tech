import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Cpu, 
  Headphones, 
  ShieldCheck, 
  Rocket, 
  Settings, 
  TrendingUp 
} from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';

export default function WhyUsSection() {
  const { isRTL } = useLanguage();

  const reasons = [
    {
      icon: Cpu,
      title: isRTL ? 'تقنيات متطورة' : 'Advanced Technology',
      description: isRTL 
        ? 'نستخدم أحدث التقنيات والأدوات لضمان أفضل أداء وموثوقية عالية لأنظمتنا.'
        : 'We use the latest technologies and tools to ensure the best performance and high reliability.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Headphones,
      title: isRTL ? 'دعم فني متميز' : 'Excellent Support',
      description: isRTL 
        ? 'فريق دعم فني متخصص متاح على مدار الساعة لمساعدتك في أي وقت.'
        : 'Specialized technical support team available 24/7 to help you anytime.',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: ShieldCheck,
      title: isRTL ? 'أمان وخصوصية' : 'Security & Privacy',
      description: isRTL 
        ? 'بياناتك في أمان تام مع تشفير متقدم ونسخ احتياطي مستمر.'
        : 'Your data is completely safe with advanced encryption and continuous backup.',
      color: 'from-primary to-primary/80',
    },
    {
      icon: Rocket,
      title: isRTL ? 'سرعة التنفيذ' : 'Fast Implementation',
      description: isRTL 
        ? 'نسلم مشاريعك في الوقت المحدد مع جودة عالية ودقة في التفاصيل.'
        : 'We deliver your projects on time with high quality and attention to detail.',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Settings,
      title: isRTL ? 'حلول مخصصة' : 'Custom Solutions',
      description: isRTL 
        ? 'نصمم حلولاً مخصصة تناسب احتياجات عملك الفريدة وأهدافك.'
        : 'We design custom solutions that fit your unique business needs and goals.',
      color: 'from-pink-500 to-pink-600',
    },
    {
      icon: TrendingUp,
      title: isRTL ? 'نمو مستدام' : 'Sustainable Growth',
      description: isRTL 
        ? 'نساعدك على تحقيق نمو مستدام من خلال استراتيجيات رقمية فعالة.'
        : 'We help you achieve sustainable growth through effective digital strategies.',
      color: 'from-cyan-500 to-cyan-600',
    },
  ];

  return (
    <section className="section-light py-16 sm:py-20 lg:py-24" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            {isRTL ? 'لماذا نحن؟' : 'Why Choose Us?'}
          </span>
          <SectionTitle
            darkText={isRTL ? 'ما' : 'What Sets'}
            highlightText={isRTL ? 'يميزنا' : 'Us Apart'}
            darkTextEnd={isRTL ? 'عن الآخرين' : ''}
            className="mb-4"
          />
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            {isRTL 
              ? 'نقدم لك تجربة فريدة مع مزايا حصرية تضمن نجاح مشروعك الرقمي'
              : 'We offer you a unique experience with exclusive features that guarantee your digital project success'
            }
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`group relative p-5 sm:p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {/* Icon */}
              <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform shadow-md`}>
                <reason.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {reason.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
