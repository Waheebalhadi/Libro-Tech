import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, BarChart3, FileText, ShieldCheck, Zap, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import industryCommercial from '@/assets/industry-commercial.jpg';
export default function Commercial() {
  const {
    isRTL
  } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const features = [{
    icon: TrendingUp,
    title: isRTL ? 'إدارة المبيعات' : 'Sales Management',
    description: isRTL ? 'تتبع المبيعات والعملاء والفواتير مع تقارير تحليلية شاملة' : 'Track sales, customers, and invoices with comprehensive analytical reports'
  }, {
    icon: Users,
    title: isRTL ? 'إدارة الموارد البشرية' : 'HR Management',
    description: isRTL ? 'إدارة الموظفين، الرواتب، الحضور، والإجازات بسهولة' : 'Manage employees, payroll, attendance, and leaves easily'
  }, {
    icon: BarChart3,
    title: isRTL ? 'التقارير والتحليلات' : 'Reports & Analytics',
    description: isRTL ? 'لوحة تحكم متقدمة مع أكثر من 100 تقرير جاهز' : 'Advanced dashboard with over 100 ready-made reports'
  }, {
    icon: FileText,
    title: isRTL ? 'إدارة المشتريات' : 'Procurement Management',
    description: isRTL ? 'تتبع أوامر الشراء والموردين والمخزون' : 'Track purchase orders, suppliers, and inventory'
  }, {
    icon: ShieldCheck,
    title: isRTL ? 'الأمان والصلاحيات' : 'Security & Permissions',
    description: isRTL ? 'تحكم كامل في صلاحيات المستخدمين وحماية البيانات' : 'Full control over user permissions and data protection'
  }, {
    icon: Zap,
    title: isRTL ? 'التكامل السلس' : 'Seamless Integration',
    description: isRTL ? 'تكامل مع الأنظمة المحاسبية والبنكية والحكومية' : 'Integration with accounting, banking, and government systems'
  }];
  const benefits = [isRTL ? 'زيادة الكفاءة التشغيلية بنسبة 40%' : 'Increase operational efficiency by 40%', isRTL ? 'تقليل وقت إعداد التقارير بنسبة 60%' : 'Reduce reporting time by 60%', isRTL ? 'تحسين دقة البيانات والقرارات' : 'Improve data accuracy and decisions', isRTL ? 'توفير في التكاليف الإدارية' : 'Save on administrative costs', isRTL ? 'رؤية شاملة لأداء الشركة' : 'Complete visibility of company performance'];
  return <div className="min-h-screen">
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
                  {isRTL ? 'حلول للشركات التجارية' : 'Solutions for Commercial Companies'}
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {isRTL ? 'نظام متكامل يساعد الشركات التجارية على إدارة جميع عملياتها من مكان واحد، من المبيعات إلى الموارد البشرية، مع تقارير تحليلية متقدمة لاتخاذ قرارات أفضل.' : 'An integrated system that helps commercial companies manage all their operations from one place, from sales to HR, with advanced analytical reports for better decision-making.'}
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
                <img src={industryCommercial} alt={isRTL ? 'شركات تجارية' : 'Commercial Companies'} className="relative rounded-3xl shadow-2xl w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {isRTL ? 'مميزات النظام للشركات التجارية' : 'System Features for Commercial Companies'}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {isRTL ? 'كل ما تحتاجه شركتك لإدارة العمليات بكفاءة عالية' : 'Everything your company needs to manage operations efficiently'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => <div key={index} className={`p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>)}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={`${isRTL ? 'text-right lg:order-2' : 'text-left lg:order-1'}`}>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  {isRTL ? 'لماذا تختار Libro Tech لشركتك؟' : 'Why Choose Libro Tech for Your Company?'}
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-8">
                  {isRTL ? 'نساعد الشركات التجارية على التحول الرقمي الكامل مع ضمان استمرارية العمل وتحسين الأداء.' : 'We help commercial companies achieve complete digital transformation while ensuring business continuity and improved performance.'}
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => <li key={index} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                      <span className="text-lg">{benefit}</span>
                    </li>)}
                </ul>
              </div>
              
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isRTL ? 'ابدأ رحلة التحول الرقمي اليوم' : 'Start Your Digital Transformation Today'}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              {isRTL ? 'تواصل معنا للحصول على استشارة مجانية وعرض تجريبي مخصص لشركتك' : 'Contact us for a free consultation and a demo customized for your company'}
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
    </div>;
}