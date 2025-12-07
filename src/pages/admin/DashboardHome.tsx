import { 
  LayoutDashboard, 
  Home,
  FileText,
  Mail,
  ArrowUpLeft,
  Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface QuickLinkProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  isRTL: boolean;
}

function QuickLink({ to, icon, title, description, isRTL }: QuickLinkProps) {
  return (
    <Link
      to={to}
      className="group p-4 sm:p-6 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="h-10 w-10 sm:h-12 sm:w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          {icon}
        </div>
        <ArrowUpLeft className={cn(
          "h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-primary transition-colors",
          isRTL ? "rotate-90" : "-rotate-90"
        )} />
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-foreground mt-3 sm:mt-4">{title}</h3>
      <p className="text-xs sm:text-sm text-muted-foreground mt-1">{description}</p>
    </Link>
  );
}

import { cn } from '@/lib/utils';

export default function DashboardHome() {
  const { user } = useAuth();
  const { t, isRTL, language } = useLanguage();

  const quickLinks = [
    {
      to: '/admin/homepage',
      icon: <Home className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: t('admin.homepage'),
      description: language === 'ar' ? 'تعديل العناوين والصور والركائز' : 'Edit titles, images and pillars',
    },
    {
      to: '/admin/services',
      icon: <Briefcase className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: t('admin.services'),
      description: language === 'ar' ? 'إدارة وإضافة الخدمات' : 'Manage and add services',
    },
    {
      to: '/admin/blog',
      icon: <FileText className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: t('admin.blog'),
      description: language === 'ar' ? 'إدارة مقالات المدونة' : 'Manage blog articles',
    },
    {
      to: '/admin/messages',
      icon: <Mail className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: t('admin.messages'),
      description: language === 'ar' ? 'عرض رسائل التواصل' : 'View contact messages',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Card */}
      <div className="bg-gradient-primary rounded-2xl p-6 sm:p-8 text-primary-foreground">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="h-14 w-14 sm:h-16 sm:w-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
            <LayoutDashboard className="h-7 w-7 sm:h-8 sm:w-8" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-1">
              {t('admin.welcome')}، {user?.name}!
            </h1>
            <p className="text-primary-foreground/80 text-sm sm:text-base">
              {t('admin.welcomeMessage')}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">{t('admin.quickLinks')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {quickLinks.map((link) => (
            <QuickLink key={link.to} {...link} isRTL={isRTL} />
          ))}
        </div>
      </div>

      {/* Coming Soon */}
      <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 text-center">
        <div className="h-14 w-14 sm:h-16 sm:w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <LayoutDashboard className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground" />
        </div>
        <h2 className="text-base sm:text-lg font-semibold text-foreground mb-2">
          {t('admin.comingSoon')}
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
          {t('admin.comingSoonDesc')}
        </p>
      </div>
    </div>
  );
}