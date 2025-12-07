import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { 
  UtensilsCrossed, 
  Package, 
  Users, 
  CreditCard, 
  Calendar, 
  BarChart3,
  CheckCircle,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import industryRestaurant from '@/assets/industry-restaurant.jpg';

export default function Restaurants() {
  const { isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const features = [
    {
      icon: UtensilsCrossed,
      title: isRTL ? 'إدارة الطلبات' : 'Order Management',
      description: isRTL 
        ? 'نظام متكامل لاستقبال وتتبع الطلبات من القاعة والتوصيل'
        : 'Complete system for receiving and tracking dine-in and delivery orders',
    },
    {
      icon: Package,
      title: isRTL ? 'إدارة المخزون' : 'Inventory Management',
      description: isRTL 
        ? 'تتبع المكونات والمواد الغذائية مع تنبيهات النفاد'
        : 'Track ingredients and supplies with low-stock alerts',
    },
    {
      icon: Users,
      title: isRTL ? 'إدارة الموظفين' : 'Staff Management',
      description: isRTL 
        ? 'جدولة الورديات وتتبع الحضور وحساب الرواتب'
        : 'Shift scheduling, attendance tracking, and payroll calculation',
    },
    {
      icon: CreditCard,
      title: isRTL ? 'نقاط البيع' : 'Point of Sale',
      description: isRTL 
        ? 'نظام كاشير متكامل مع دعم طرق دفع متعددة'
        : 'Complete POS system with multiple payment method support',
    },
    {
      icon: Calendar,
      title: isRTL ? 'إدارة الحجوزات' : 'Reservation Management',
      description: isRTL 
        ? 'نظام حجز الطاولات مع تأكيدات آلية للعملاء'
        : 'Table booking system with automatic customer confirmations',
    },
    {
      icon: BarChart3,
      title: isRTL ? 'التقارير والتحليلات' : 'Reports & Analytics',
      description: isRTL 
        ? 'تقارير المبيعات اليومية والأصناف الأكثر مبيعاً'
        : 'Daily sales reports and best-selling items analytics',
    },
  ];

  const benefits = [
    isRTL ? 'تسريع خدمة العملاء بنسبة 50%' : 'Speed up customer service by 50%',
    isRTL ? 'تقليل الفاقد من المواد الغذائية' : 'Reduce food waste',
    isRTL ? 'تحسين تجربة العملاء' : 'Improve customer experience',
    isRTL ? 'إدارة فعالة للموظفين' : 'Effective staff management',
    isRTL ? 'زيادة المبيعات والأرباح' : 'Increase sales and profits',
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
                  {isRTL ? 'حلول للمطاعم والكافيهات' : 'Solutions for Restaurants & Cafes'}
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {isRTL 
                    ? 'نظام متكامل لإدارة مطعمك بالكامل، من استقبال الطلبات إلى إدارة المخزون والموظفين، مع تقارير تفصيلية لتحسين الأداء.'
                    : 'A complete system to manage your entire restaurant, from receiving orders to inventory and staff management, with detailed reports to improve performance.'
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
                  src={industryRestaurant}
                  alt={isRTL ? 'مطاعم وكافيهات' : 'Restaurants & Cafes'}
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
                {isRTL ? 'مميزات النظام للمطاعم' : 'System Features for Restaurants'}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {isRTL 
                  ? 'كل ما يحتاجه مطعمك لتقديم خدمة مميزة'
                  : 'Everything your restaurant needs to deliver excellent service'
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
                  {isRTL ? 'لماذا تختار Libro Tech لمطعمك؟' : 'Why Choose Libro Tech for Your Restaurant?'}
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-8">
                  {isRTL 
                    ? 'نساعد المطاعم والكافيهات على تحسين الخدمة وزيادة رضا العملاء.'
                    : 'We help restaurants and cafes improve service and increase customer satisfaction.'
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
                    <div className="text-6xl font-bold mb-2">200+</div>
                    <div className="text-xl text-primary-foreground/80">
                      {isRTL ? 'مطعم وكافيه يثق بنا' : 'Restaurants & cafes trust us'}
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
              {isRTL ? 'ارتقِ بمطعمك إلى المستوى التالي' : 'Take Your Restaurant to the Next Level'}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              {isRTL 
                ? 'تواصل معنا للحصول على استشارة مجانية وعرض تجريبي مخصص لمطعمك'
                : 'Contact us for a free consultation and a demo customized for your restaurant'
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
