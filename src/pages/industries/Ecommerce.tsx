import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Package, 
  Truck, 
  CreditCard, 
  BarChart3, 
  Globe,
  CheckCircle,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import industryEcommerce from '@/assets/industry-ecommerce.jpg';

export default function Ecommerce() {
  const { isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const features = [
    {
      icon: ShoppingCart,
      title: isRTL ? 'إدارة المتجر' : 'Store Management',
      description: isRTL 
        ? 'إدارة المنتجات والفئات والأسعار والعروض بسهولة'
        : 'Manage products, categories, prices, and offers easily',
    },
    {
      icon: Package,
      title: isRTL ? 'إدارة المخزون' : 'Inventory Management',
      description: isRTL 
        ? 'تتبع المخزون في الوقت الفعلي مع تنبيهات النفاد'
        : 'Real-time inventory tracking with low-stock alerts',
    },
    {
      icon: Truck,
      title: isRTL ? 'إدارة الشحن' : 'Shipping Management',
      description: isRTL 
        ? 'تكامل مع شركات الشحن وتتبع الطلبات'
        : 'Integration with shipping companies and order tracking',
    },
    {
      icon: CreditCard,
      title: isRTL ? 'بوابات الدفع' : 'Payment Gateways',
      description: isRTL 
        ? 'تكامل مع جميع بوابات الدفع الإلكتروني'
        : 'Integration with all electronic payment gateways',
    },
    {
      icon: BarChart3,
      title: isRTL ? 'التقارير والتحليلات' : 'Reports & Analytics',
      description: isRTL 
        ? 'تحليل المبيعات وسلوك العملاء والمنتجات الأكثر مبيعاً'
        : 'Sales analysis, customer behavior, and best-selling products',
    },
    {
      icon: Globe,
      title: isRTL ? 'التكامل المتعدد' : 'Multi-Platform Integration',
      description: isRTL 
        ? 'تكامل مع منصات البيع المختلفة وسلة وزد'
        : 'Integration with various selling platforms like Salla and Zid',
    },
  ];

  const benefits = [
    isRTL ? 'زيادة المبيعات بنسبة 45%' : 'Increase sales by 45%',
    isRTL ? 'تسريع معالجة الطلبات' : 'Speed up order processing',
    isRTL ? 'تحسين تجربة العملاء' : 'Improve customer experience',
    isRTL ? 'إدارة مركزية لجميع القنوات' : 'Centralized management for all channels',
    isRTL ? 'تقليل أخطاء الشحن' : 'Reduce shipping errors',
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
                  {isRTL ? 'حلول للمتاجر الإلكترونية' : 'Solutions for E-commerce Stores'}
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {isRTL 
                    ? 'نظام متكامل لإدارة متجرك الإلكتروني بالكامل، من إدارة المنتجات إلى الشحن والمدفوعات، مع تكامل سلس مع جميع منصات البيع.'
                    : 'A complete system to manage your entire online store, from product management to shipping and payments, with seamless integration with all selling platforms.'
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
                  src={industryEcommerce}
                  alt={isRTL ? 'متاجر إلكترونية' : 'E-commerce Stores'}
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
                {isRTL ? 'مميزات النظام للمتاجر الإلكترونية' : 'System Features for E-commerce'}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {isRTL 
                  ? 'كل ما يحتاجه متجرك للنجاح في عالم التجارة الإلكترونية'
                  : 'Everything your store needs to succeed in e-commerce'
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
                  {isRTL ? 'لماذا تختار Libro Tech لمتجرك؟' : 'Why Choose Libro Tech for Your Store?'}
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-8">
                  {isRTL 
                    ? 'نساعد المتاجر الإلكترونية على النمو وتحقيق مبيعات أعلى.'
                    : 'We help e-commerce stores grow and achieve higher sales.'
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
                    <div className="text-6xl font-bold mb-2">300+</div>
                    <div className="text-xl text-primary-foreground/80">
                      {isRTL ? 'متجر إلكتروني يثق بنا' : 'Online stores trust us'}
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
              {isRTL ? 'انطلق بمتجرك نحو النجاح' : 'Launch Your Store Towards Success'}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              {isRTL 
                ? 'تواصل معنا للحصول على استشارة مجانية وعرض تجريبي مخصص لمتجرك'
                : 'Contact us for a free consultation and a demo customized for your store'
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
