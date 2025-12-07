import { useLanguage } from '@/contexts/LanguageContext';
import { Users, Building2, Award, Globe } from 'lucide-react';
export default function StatsSection() {
  const {
    isRTL
  } = useLanguage();
  const stats = [{
    icon: Users,
    value: '500+',
    label: isRTL ? 'عميل راضٍ' : 'Happy Clients',
    description: isRTL ? 'يثقون بنا' : 'Trust us'
  }, {
    icon: Building2,
    value: '50+',
    label: isRTL ? 'مشروع منجز' : 'Projects Completed',
    description: isRTL ? 'بنجاح تام' : 'Successfully'
  }, {
    icon: Award,
    value: '10+',
    label: isRTL ? 'سنوات خبرة' : 'Years Experience',
    description: isRTL ? 'في المجال' : 'In the field'
  }, {
    icon: Globe,
    value: '15+',
    label: isRTL ? 'دولة نخدمها' : 'Countries Served',
    description: isRTL ? 'حول العالم' : 'Worldwide'
  }];
  return <section className="py-16 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      
    </section>;
}