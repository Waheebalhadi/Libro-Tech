import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Home, FileText, Mail, Settings, ChevronLeft, ChevronRight, Briefcase, Building2, Users, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import logoFull from '@/assets/logo-full.png';
import logoIcon from '@/assets/logo-icon.png';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
interface NavItem {
  path: string;
  labelKey: string;
  icon: React.ReactNode;
}
function SidebarContent({
  isCollapsed,
  navItems,
  currentPath,
  isRTL
}: {
  isCollapsed: boolean;
  navItems: NavItem[];
  currentPath: string;
  isRTL: boolean;
}) {
  const {
    t
  } = useLanguage();
  return <nav className={cn("flex-1 p-3 sm:p-4 space-y-1.5 sm:space-y-2 overflow-y-auto", isRTL ? "text-right" : "text-left")}>
      {navItems.map(item => {
        const isActive = currentPath === item.path || currentPath.startsWith(item.path + '/');
        return (
          <Link 
            key={item.path} 
            to={item.path} 
            className={cn(
              "flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-200 group relative",
              isActive 
                ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20" 
                : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
              isCollapsed && "justify-center px-2",
              isRTL ? "flex-row-reverse" : ""
            )}
          >
            <span className={cn(
              "transition-transform duration-200 shrink-0",
              isActive && "scale-110"
            )}>
              {item.icon}
            </span>
            {!isCollapsed && (
              <span className={cn(
                "font-medium text-sm sm:text-base flex-1",
                isActive ? "font-semibold" : "font-medium",
                isRTL ? "text-right" : "text-left"
              )}>
                {t(item.labelKey)}
              </span>
            )}
            {isActive && !isCollapsed && (
              <span className={cn(
                "absolute h-full w-1 bg-primary-foreground/30 rounded-full",
                isRTL ? "left-0 rounded-l-full" : "right-0 rounded-r-full"
              )} />
            )}
          </Link>
        );
      })}
    </nav>;
}
export default function AdminSidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const {
    t,
    isRTL
  } = useLanguage();
  const navItems: NavItem[] = [{
    path: '/admin/dashboard',
    labelKey: 'admin.dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />
  }, {
    path: '/admin/homepage',
    labelKey: 'admin.homepage',
    icon: <Home className="h-5 w-5" />
  }, {
    path: '/admin/services',
    labelKey: 'admin.services',
    icon: <Briefcase className="h-5 w-5" />
  }, {
    path: '/admin/industries',
    labelKey: 'admin.industries',
    icon: <Building2 className="h-5 w-5" />
  }, {
    path: '/admin/blog',
    labelKey: 'admin.blog',
    icon: <FileText className="h-5 w-5" />
  }, {
    path: '/admin/messages',
    labelKey: 'admin.messages',
    icon: <Mail className="h-5 w-5" />
  }, {
    path: '/admin/users',
    labelKey: 'admin.users',
    icon: <Users className="h-5 w-5" />
  }, {
    path: '/admin/settings',
    labelKey: 'admin.settings',
    icon: <Settings className="h-5 w-5" />
  }];

  // Mobile sidebar
  const MobileSidebar = () => <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "lg:hidden fixed top-3 z-50 bg-card shadow-md border border-border",
            isRTL ? "right-3" : "left-3"
          )}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side={isRTL ? "right" : "left"} 
        className={cn("p-0 w-64", isRTL ? "text-right" : "text-left")}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="flex flex-col h-full">
          <div className={cn("p-4 border-b border-border", isRTL ? "text-right" : "text-left")}>
            <Link to="/admin/dashboard" onClick={() => setIsMobileOpen(false)} className="block">
              <img src={logoFull} alt="Libro Tech" className="h-10 w-auto" />
            </Link>
          </div>
          <div onClick={() => setIsMobileOpen(false)}>
            <SidebarContent isCollapsed={false} navItems={navItems} currentPath={location.pathname} isRTL={isRTL} />
          </div>
          <div className={cn("p-4 border-t border-border mt-auto", isRTL ? "text-right" : "text-left")}>
            <p className="text-xs text-muted-foreground text-center">
              © 2025 Libro Tech
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>;

  // Desktop sidebar
  return <>
      <MobileSidebar />
      
      <aside 
        className={cn(
          "hidden lg:flex bg-gradient-to-b from-card to-card/95 border-border h-screen sticky top-0 transition-all duration-300 flex-col shadow-lg",
          isRTL ? "border-l" : "border-r",
          isCollapsed ? "w-20" : "w-72"
        )}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Logo */}
        <div className={cn(
          "p-4 sm:p-6 border-b border-border/50 flex items-center justify-between bg-card/50 backdrop-blur-sm",
          isRTL ? "flex-row-reverse" : ""
        )}>
          <Link 
            to="/admin/dashboard" 
            className={cn(
              "flex items-center gap-2 group",
              isRTL ? "flex-row-reverse" : "",
              isCollapsed && "mx-auto"
            )}
          >
            <img 
              src={isCollapsed ? logoIcon : logoFull} 
              alt="Libro Tech" 
              className={cn(
                "h-10 w-auto transition-all duration-300 group-hover:scale-105",
                isCollapsed && "mx-auto"
              )} 
            />
          </Link>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className={cn(
              "p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-200 border border-transparent hover:border-primary/20 shrink-0",
              isCollapsed && "absolute top-6 bg-card border border-border shadow-lg",
              isCollapsed && (isRTL ? "-right-4" : "-left-4")
            )}
          >
            {isCollapsed ? (
              isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
            ) : (
              isRTL ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <SidebarContent isCollapsed={isCollapsed} navItems={navItems} currentPath={location.pathname} isRTL={isRTL} />

        {/* Footer */}
        {!isCollapsed && (
          <div className={cn("p-4 border-t border-border", isRTL ? "text-right" : "text-left")}>
            <p className="text-xs text-muted-foreground text-center">
              © 2025 Libro Tech
            </p>
          </div>
        )}
      </aside>
    </>;
}