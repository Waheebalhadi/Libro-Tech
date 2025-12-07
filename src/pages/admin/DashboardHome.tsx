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
      className={cn(
        "group p-4 sm:p-6 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]",
        isRTL ? "text-right" : "text-left"
      )}
    >
      <div className={cn("flex items-start justify-between", isRTL ? "flex-row-reverse" : "")}>
        <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground transition-all duration-300 shadow-sm group-hover:shadow-md">
          {icon}
        </div>
        <ArrowUpLeft className={cn(
          "h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-primary transition-all duration-300",
          isRTL ? "rotate-90" : "-rotate-90"
        )} />
      </div>
      <h3 className={cn("text-base sm:text-lg font-semibold text-foreground mt-3 sm:mt-4", isRTL ? "text-right" : "text-left")}>
        {title}
      </h3>
      <p className={cn("text-xs sm:text-sm text-muted-foreground mt-1", isRTL ? "text-right" : "text-left")}>
        {description}
      </p>
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
    <div className={cn("space-y-6 sm:space-y-8", isRTL ? "text-right" : "text-left")}>
      {/* Welcome Card */}
      <div className="bg-gradient-primary rounded-2xl p-6 sm:p-8 text-primary-foreground shadow-lg">
        <div className={cn("flex flex-col sm:flex-row sm:items-center gap-4", isRTL ? "sm:flex-row-reverse" : "")}>
          <div className="h-14 w-14 sm:h-16 sm:w-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 backdrop-blur-sm">
            <LayoutDashboard className="h-7 w-7 sm:h-8 sm:w-8" />
          </div>
          <div className={cn("flex-1", isRTL ? "text-right" : "text-left")}>
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
        <h2 className={cn("text-lg sm:text-xl font-bold text-foreground mb-4", isRTL ? "text-right" : "text-left")}>
          {t('admin.quickLinks')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {quickLinks.map((link) => (
            <QuickLink key={link.to} {...link} isRTL={isRTL} />
          ))}
        </div>
      </div>

      {/* Coming Soon */}
      <div className="bg-gradient-to-br from-card via-card to-muted/30 rounded-2xl border border-border/50 p-6 sm:p-8 text-center shadow-sm">
        <div className="h-14 w-14 sm:h-16 sm:w-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/10">
          <LayoutDashboard className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
        </div>
        <h2 className={cn("text-base sm:text-lg font-semibold text-foreground mb-2", isRTL ? "text-right" : "text-left")}>
          {t('admin.comingSoon')}
        </h2>
        <p className={cn("text-muted-foreground text-sm sm:text-base max-w-md mx-auto", isRTL ? "text-right" : "text-left")}>
          {t('admin.comingSoonDesc')}
        </p>
      </div>
    </div>
  );
}