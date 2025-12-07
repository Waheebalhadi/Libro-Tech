import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Briefcase, Calendar, Users, FileText, Clock, BarChart3, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import industryServices from '@/assets/industry-services.jpg';
export default function Services() {
  const {
    isRTL
  } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const features = [{
    icon: Briefcase,
    title: isRTL ? 'إدارة المشاريع' : 'Project Management',
    description: isRTL ? 'تتبع المشاريع والمهام والمواعيد النهائية بكفاءة' : 'Track projects, tasks, and deadlines efficiently'
  }, {
    icon: Calendar,
    title: isRTL ? 'جدولة المواعيد' : 'Appointment Scheduling',
    description: isRTL ? 'نظام حجز مواعيد ذكي مع تذكيرات آلية' : 'Smart appointment booking system with automatic reminders'
  }, {
    icon: Users,
    title: isRTL ? 'إدارة العملاء' : 'Client Management',
    description: isRTL ? 'قاعدة بيانات شاملة للعملاء مع تاريخ التعاملات' : 'Comprehensive client database with transaction history'
  }, {
    icon: FileText,
    title: isRTL ? 'الفوترة الإلكترونية' : 'Electronic Invoicing',
    description: isRTL ? 'إصدار الفواتير وتتبع المدفوعات إلكترونياً' : 'Issue invoices and track payments electronically'
  }, {
    icon: Clock,
    title: isRTL ? 'تتبع الوقت' : 'Time Tracking',
    description: isRTL ? 'تسجيل ساعات العمل وحساب التكاليف بدقة' : 'Log working hours and calculate costs accurately'
  }, {
    icon: BarChart3,
    title: isRTL ? 'التقارير والتحليلات' : 'Reports & Analytics',
    description: isRTL ? 'تقارير أداء الموظفين والمشاريع والإيرادات' : 'Employee performance, project, and revenue reports'
  }];
  const benefits = [isRTL ? 'زيادة إنتاجية الموظفين بنسبة 30%' : 'Increase employee productivity by 30%', isRTL ? 'تحسين رضا العملاء' : 'Improve customer satisfaction', isRTL ? 'تقليل الأعمال الورقية' : 'Reduce paperwork', isRTL ? 'إدارة فعالة للمواعيد' : 'Effective appointment management', isRTL ? 'تحصيل أسرع للمستحقات' : 'Faster collection of receivables'];
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
                  {isRTL ? 'حلول لمكاتب الخدمات' : 'Solutions for Service Offices'}
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {isRTL ? 'نظام متكامل لإدارة مكتب الخدمات الخاص بك، من جدولة المواعيد إلى إدارة العملاء والفوترة، مع تقارير تفصيلية لتحسين الأداء.' : 'A complete system to manage your service office, from scheduling appointments to client management and invoicing, with detailed reports to improve performance.'}
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
                <img src={industryServices} alt={isRTL ? 'مكاتب خدمات' : 'Service Offices'} className="relative rounded-3xl shadow-2xl w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {isRTL ? 'مميزات النظام لمكاتب الخدمات' : 'System Features for Service Offices'}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {isRTL ? 'أدوات متقدمة لتنظيم العمل وخدمة العملاء' : 'Advanced tools for work organization and customer service'}
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
                  {isRTL ? 'لماذا تختار Libro Tech لمكتبك؟' : 'Why Choose Libro Tech for Your Office?'}
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-8">
                  {isRTL ? 'نساعد مكاتب الخدمات على تحسين الإنتاجية وتقديم خدمة أفضل للعملاء.' : 'We help service offices improve productivity and provide better customer service.'}
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => <li key={index} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                      <span className="text-lg">{benefit}</span>
                    </li>)}
                </ul>
              </div>
              <div className={`${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
                
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isRTL ? 'نظّم عمل مكتبك بذكاء' : 'Organize Your Office Work Smartly'}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              {isRTL ? 'تواصل معنا للحصول على استشارة مجانية وعرض تجريبي مخصص لمكتبك' : 'Contact us for a free consultation and a demo customized for your office'}
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