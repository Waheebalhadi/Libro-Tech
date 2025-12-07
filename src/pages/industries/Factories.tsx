import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { 
  Settings, 
  Package, 
  ClipboardCheck, 
  Wrench, 
  BarChart3, 
  Truck,
  CheckCircle,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import industryFactory from '@/assets/industry-factory.jpg';

export default function Factories() {
  const { isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const features = [
    {
      icon: Settings,
      title: isRTL ? 'إدارة خطوط الإنتاج' : 'Production Line Management',
      description: isRTL 
        ? 'تتبع ومراقبة جميع مراحل الإنتاج في الوقت الفعلي'
        : 'Track and monitor all production stages in real-time',
    },
    {
      icon: Package,
      title: isRTL ? 'إدارة المخزون' : 'Inventory Management',
      description: isRTL 
        ? 'تتبع المواد الخام والمنتجات النهائية مع تنبيهات آلية'
        : 'Track raw materials and finished products with automatic alerts',
    },
    {
      icon: ClipboardCheck,
      title: isRTL ? 'مراقبة الجودة' : 'Quality Control',
      description: isRTL 
        ? 'نظام متكامل لضمان جودة المنتجات في كل مرحلة'
        : 'Integrated system to ensure product quality at every stage',
    },
    {
      icon: Wrench,
      title: isRTL ? 'جدولة الصيانة' : 'Maintenance Scheduling',
      description: isRTL 
        ? 'صيانة وقائية وتصحيحية مع تتبع تاريخ المعدات'
        : 'Preventive and corrective maintenance with equipment history tracking',
    },
    {
      icon: BarChart3,
      title: isRTL ? 'تحليل الأداء' : 'Performance Analysis',
      description: isRTL 
        ? 'تقارير تفصيلية عن كفاءة الإنتاج والهدر'
        : 'Detailed reports on production efficiency and waste',
    },
    {
      icon: Truck,
      title: isRTL ? 'إدارة الشحن' : 'Shipping Management',
      description: isRTL 
        ? 'تتبع الشحنات وإدارة التوصيل للعملاء'
        : 'Track shipments and manage customer deliveries',
    },
  ];

  const benefits = [
    isRTL ? 'زيادة كفاءة الإنتاج بنسبة 35%' : 'Increase production efficiency by 35%',
    isRTL ? 'تقليل الهدر والتكاليف' : 'Reduce waste and costs',
    isRTL ? 'تحسين جودة المنتجات' : 'Improve product quality',
    isRTL ? 'صيانة استباقية للمعدات' : 'Proactive equipment maintenance',
    isRTL ? 'تتبع دقيق للمخزون' : 'Accurate inventory tracking',
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-primary/5 via-background to-blue-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                  {isRTL ? 'القطاعات المستفيدة' : 'Industries We Serve'}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {isRTL ? 'حلول للمصانع والإنتاج' : 'Solutions for Factories & Manufacturing'}
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {isRTL 
                    ? 'نظام متكامل لإدارة عمليات التصنيع من المواد الخام إلى المنتج النهائي، مع مراقبة الجودة وتحسين الكفاءة.'
                    : 'An integrated system for managing manufacturing operations from raw materials to finished products, with quality control and efficiency improvement.'
                  }
                </p>
                <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Link to="/contact">
                    <Button size="lg" className="gap-2">
                      {isRTL ? 'احجز عرض تجريبي' : 'Book a Demo'}
                      <Arrow className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button variant="outline" size="lg">
                      {isRTL ? 'عرض الأسعار' : 'View Pricing'}
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-200 rounded-3xl transform rotate-3" />
                <img 
                  src={industryFactory}
                  alt={isRTL ? 'مصانع' : 'Factories'}
                  className="relative rounded-3xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {isRTL ? 'مميزات النظام للمصانع' : 'System Features for Factories'}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {isRTL 
                  ? 'أدوات متقدمة لتحسين الإنتاج وضمان الجودة'
                  : 'Advanced tools to improve production and ensure quality'
                }
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={`${isRTL ? 'text-right lg:order-2' : 'text-left lg:order-1'}`}>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  {isRTL ? 'لماذا تختار Libro Tech لمصنعك؟' : 'Why Choose Libro Tech for Your Factory?'}
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-8">
                  {isRTL 
                    ? 'نساعد المصانع على تحقيق أعلى مستويات الكفاءة والجودة مع تقليل التكاليف.'
                    : 'We help factories achieve the highest levels of efficiency and quality while reducing costs.'
                  }
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                      <span className="text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-2">150+</div>
                    <div className="text-xl text-primary-foreground/80">
                      {isRTL ? 'مصنع يستخدم أنظمتنا' : 'Factories use our systems'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isRTL ? 'حوّل مصنعك إلى مصنع ذكي' : 'Transform Your Factory into a Smart Factory'}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              {isRTL 
                ? 'تواصل معنا للحصول على استشارة مجانية وعرض تجريبي مخصص لمصنعك'
                : 'Contact us for a free consultation and a demo customized for your factory'
              }
            </p>
            <Link to="/contact">
              <Button size="lg" className="gap-2">
                {isRTL ? 'تواصل معنا الآن' : 'Contact Us Now'}
                <Arrow className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
