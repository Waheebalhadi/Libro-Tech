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
  return <nav className="flex-1 p-3 sm:p-4 space-y-1.5 sm:space-y-2">
      {navItems.map(item => <Link key={item.path} to={item.path} className={cn("flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-200", currentPath === item.path ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-muted hover:text-foreground", isCollapsed && "justify-center px-2")}>
          {item.icon}
          {!isCollapsed && <span className="font-medium text-sm sm:text-base text-center">{t(item.labelKey)}</span>}
        </Link>)}
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
        <Button variant="ghost" size="icon" className="lg:hidden fixed top-3 start-3 z-50 bg-card shadow-md border border-border">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side={isRTL ? "right" : "left"} className="p-0 w-64">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-border">
            <Link to="/admin/dashboard" onClick={() => setIsMobileOpen(false)}>
              <img src={logoFull} alt="Libro Tech" className="h-10 w-auto" />
            </Link>
          </div>
          <div onClick={() => setIsMobileOpen(false)}>
            <SidebarContent isCollapsed={false} navItems={navItems} currentPath={location.pathname} isRTL={isRTL} />
          </div>
          <div className="p-4 border-t border-border mt-auto">
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
      
      <aside className={cn("hidden lg:flex bg-card border-border h-screen sticky top-0 transition-all duration-300 flex-col", isRTL ? "border-l" : "border-r", isCollapsed ? "w-20" : "w-64")}>
        {/* Logo */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <img src={isCollapsed ? logoIcon : logoFull} alt="Libro Tech" className={cn("h-10 w-auto transition-all", isCollapsed && "mx-auto")} />
          </Link>
          <button onClick={() => setIsCollapsed(!isCollapsed)} className={cn("p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors", isCollapsed && "absolute top-6 bg-card border border-border shadow-md", isCollapsed && (isRTL ? "-right-4" : "-left-4"))}>
            {isCollapsed ? isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" /> : isRTL ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation */}
        <SidebarContent isCollapsed={isCollapsed} navItems={navItems} currentPath={location.pathname} isRTL={isRTL} />

        {/* Footer */}
        {!isCollapsed && <div className="p-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              © 2025 Libro Tech
            </p>
          </div>}
      </aside>
    </>;
}