import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { LogOut, User, Home, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminSidebar from './AdminSidebar';
import { Link } from 'react-router-dom';

export default function AdminLayout() {
  const { user, logout, isAdmin, isLoading } = useAuth();
  const { language, setLanguage, t, isRTL } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, isLoading, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30 flex w-full" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-40">
          <div className="px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
            <div />

            {/* User Info & Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Language Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="gap-1.5 text-muted-foreground hover:text-foreground px-2 sm:px-3"
              >
                <Globe className="h-4 w-4" />
                <span className="text-xs sm:text-sm font-medium">
                  {language === 'ar' ? 'EN' : 'عربي'}
                </span>
              </Button>

              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground px-2 sm:px-3">
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('admin.mainSite')}</span>
                </Button>
              </Link>
              
              <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 bg-muted rounded-lg">
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.role}</p>
                </div>
              </div>

              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 px-2 sm:px-3"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">{t('admin.logout')}</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}