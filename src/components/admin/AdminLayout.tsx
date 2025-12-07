import { useEffect, useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { LogOut, User, Home, Globe, Menu, ChevronDown, LayoutDashboard, Briefcase, Building2, FileText, Mail, Users, Settings, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminSidebar from './AdminSidebar';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function AdminLayout() {
  const { user, logout, isAdmin, isLoading } = useAuth();
  const { language, setLanguage, t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation items for quick access
  const navItems = [
    { path: '/admin/dashboard', labelKey: 'admin.dashboard', icon: LayoutDashboard },
    { path: '/admin/homepage', labelKey: 'admin.homepage', icon: Home },
    { path: '/admin/services', labelKey: 'admin.services', icon: Briefcase },
    { path: '/admin/industries', labelKey: 'admin.industries', icon: Building2 },
    { path: '/admin/blog', labelKey: 'admin.blog', icon: FileText },
    { path: '/admin/messages', labelKey: 'admin.messages', icon: Mail },
    { path: '/admin/users', labelKey: 'admin.users', icon: Users },
    { path: '/admin/settings', labelKey: 'admin.settings', icon: Settings },
  ];

  // Get current page info
  const currentPage = navItems.find(item => location.pathname === item.path || location.pathname.startsWith(item.path + '/'));
  
  // Build breadcrumb
  const getBreadcrumb = () => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const breadcrumb = [{ label: t('admin.dashboard'), path: '/admin/dashboard' }];
    
    if (pathParts.length > 1) {
      const currentItem = navItems.find(item => item.path.includes(pathParts[1]));
      if (currentItem) {
        breadcrumb.push({ label: t(currentItem.labelKey), path: currentItem.path });
      }
    }
    
    return breadcrumb;
  };

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
        <header className="bg-gradient-to-br from-card via-card/95 to-card border-b border-border/50 sticky top-0 z-40 backdrop-blur-md shadow-lg">
          <div className="space-y-0">
            {/* Top Bar */}
            <div className={cn(
              "px-3 sm:px-4 md:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 border-b border-border/30",
              isRTL ? "flex-row-reverse" : ""
            )}>
              {/* Left Side - Mobile Menu & Breadcrumb */}
              <div className={cn("flex items-center gap-2 sm:gap-4 flex-1 min-w-0", isRTL ? "flex-row-reverse" : "")}>
                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </div>

                {/* Breadcrumb - Desktop */}
                <div className="hidden md:flex items-center">
                  <Breadcrumb>
                    <BreadcrumbList className={cn("gap-1", isRTL ? "flex-row-reverse" : "")}>
                      {getBreadcrumb().map((item, index, array) => (
                        <div key={item.path} className={cn("flex items-center gap-1", isRTL ? "flex-row-reverse" : "")}>
                          {index > 0 && (
                            <BreadcrumbSeparator className={cn("text-muted-foreground", isRTL ? "rotate-180" : "")}>
                              {isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            </BreadcrumbSeparator>
                          )}
                          <BreadcrumbItem>
                            {index === array.length - 1 ? (
                              <BreadcrumbPage className={cn("text-foreground font-semibold", isRTL ? "text-right" : "text-left")}>
                                {item.label}
                              </BreadcrumbPage>
                            ) : (
                              <BreadcrumbLink asChild>
                                <Link to={item.path} className={cn("text-muted-foreground hover:text-foreground transition-colors", isRTL ? "text-right" : "text-left")}>
                                  {item.label}
                                </Link>
                              </BreadcrumbLink>
                            )}
                          </BreadcrumbItem>
                        </div>
                      ))}
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>

                {/* Current Page Title - Mobile */}
                <div className="md:hidden flex items-center gap-2 min-w-0">
                  {currentPage && (
                    <>
                      <currentPage.icon className="h-4 w-4 text-primary shrink-0" />
                      <span className={cn("text-sm font-semibold text-foreground truncate", isRTL ? "text-right" : "text-left")}>
                        {t(currentPage.labelKey)}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Right Side - User Actions */}
              <div className={cn(
                "flex items-center gap-1.5 sm:gap-2 md:gap-3",
                isRTL ? "flex-row-reverse" : ""
              )}>
                {/* Language Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className={cn(
                    "gap-1.5 text-muted-foreground hover:text-foreground hover:bg-primary/5 px-2 sm:px-3 rounded-lg transition-all duration-200 border border-transparent hover:border-primary/20",
                    isRTL ? "flex-row-reverse" : ""
                  )}
                >
                  <Globe className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline text-xs sm:text-sm font-medium">
                    {language === 'ar' ? 'EN' : 'عربي'}
                  </span>
                </Button>

                {/* Main Site Link */}
                <Link to="/" className="hidden sm:block">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={cn(
                      "gap-2 text-muted-foreground hover:text-foreground hover:bg-primary/5 px-2 sm:px-3 rounded-lg transition-all duration-200 border border-transparent hover:border-primary/20",
                      isRTL ? "flex-row-reverse" : ""
                    )}
                  >
                    <Home className="h-4 w-4 shrink-0" />
                    <span className="hidden md:inline text-xs sm:text-sm">{t('admin.mainSite')}</span>
                  </Button>
                </Link>
                
                {/* User Menu - Desktop */}
                <div className={cn(
                  "hidden sm:flex items-center gap-2 sm:gap-3 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-muted/80 to-muted/60 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-200 cursor-pointer group",
                  isRTL ? "flex-row-reverse" : ""
                )}>
                  <div className="h-8 w-8 sm:h-9 sm:w-9 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center border border-primary/20 shadow-sm group-hover:shadow-md transition-shadow">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className={cn("hidden md:block", isRTL ? "text-right" : "text-left")}>
                    <p className="text-sm font-semibold text-foreground leading-tight">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize leading-tight">{user.role}</p>
                  </div>
                </div>

                {/* Logout Button - Desktop */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className={cn(
                    "hidden sm:flex gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 px-2 sm:px-3 rounded-lg transition-all duration-200 border border-transparent hover:border-destructive/20",
                    isRTL ? "flex-row-reverse" : ""
                  )}
                >
                  <LogOut className="h-4 w-4 shrink-0" />
                  <span className="hidden md:inline text-xs sm:text-sm">{t('admin.logout')}</span>
                </Button>

                {/* Mobile User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "sm:hidden p-2 rounded-lg",
                        isRTL ? "flex-row-reverse" : ""
                      )}
                    >
                      <div className="h-8 w-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align={isRTL ? "start" : "end"}
                    className={cn("w-56", isRTL ? "text-right" : "text-left")}
                  >
                    <div className={cn("px-2 py-1.5 border-b border-border", isRTL ? "text-right" : "text-left")}>
                      <p className="text-sm font-semibold text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link 
                        to="/" 
                        className={cn("flex items-center gap-2 cursor-pointer", isRTL ? "flex-row-reverse" : "")}
                      >
                        <Home className="h-4 w-4" />
                        <span>{t('admin.mainSite')}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={toggleLanguage}
                      className={cn("flex items-center gap-2 cursor-pointer", isRTL ? "flex-row-reverse" : "")}
                    >
                      <Globe className="h-4 w-4" />
                      <span>{language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className={cn("flex items-center gap-2 text-destructive cursor-pointer", isRTL ? "flex-row-reverse" : "")}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{t('admin.logout')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Quick Navigation Bar - Desktop */}
            <div className="hidden lg:flex items-center gap-1 px-3 sm:px-4 md:px-6 lg:px-8 py-2 bg-muted/30 border-b border-border/30 overflow-x-auto">
              <div className={cn("flex items-center gap-1 flex-1", isRTL ? "flex-row-reverse" : "")}>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                        isRTL ? "flex-row-reverse" : ""
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{t(item.labelKey)}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className={cn(
          "flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden",
          isRTL ? "text-right" : "text-left"
        )}>
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}