import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown, LogIn, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import logoFull from '@/assets/logo-full.png';

interface Service {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar: string | null;
  description_en: string | null;
  icon_url: string | null;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { t, language, setLanguage, isRTL } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch logo from site settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('logo_url')
          .limit(1)
          .maybeSingle();
        if (error) throw error;
        if (data?.logo_url) {
          setLogoUrl(data.logo_url);
        }
      } catch (error) {
        console.error('Error fetching logo:', error);
      }
    };
    fetchSettings();
  }, []);

  // Fetch services for dropdown
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('created_at', { ascending: true });
        if (error) throw error;
        setServices(data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // تحقق من جدول users باستخدام email
          const { data: userData, error } = await supabase
            .from('users')
            .select('role')
            .eq('email', session.user.email)
            .maybeSingle();
          
          if (error) {
            console.error('Error fetching user role:', error);
            setIsAdmin(false);
            return;
          }
          
          // تحقق إذا كان role هو 'admin' أو 'super_admin' أو أي قيمة أخرى
          setIsAdmin(
            userData?.role === 'admin' || 
            userData?.role === 'super_admin' ||
            userData?.role === 'administrator'
          );
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      }
    };
    
    checkAdminStatus();
    
    // الاستماع لتغيرات حالة المصادقة
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdminStatus();
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/solutions', label: t('nav.solutions') },
    { path: '/industries', label: t('nav.industries') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const displayLogo = logoUrl || logoFull;

  return (
    <header className="fixed top-0 left-0 right-0 z-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <nav
        className={`transition-all duration-500 ${
          isScrolled
            ? 'bg-card/95 backdrop-blur-xl shadow-lg border-b border-border/50 py-2'
            : 'bg-card shadow-md py-3 sm:py-4'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
              <img
                src={displayLogo}
                alt="Libro Tech"
                className={`h-10 sm:h-12 w-auto transition-all duration-300 group-hover:scale-105 ${
                  isScrolled ? 'h-8 sm:h-10' : ''
                }`}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                // Special handling for Solutions link with dropdown
                if (link.path === '/solutions') {
                  return (
                    <div
                      key={link.path}
                      className="relative group"
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      <Link
                        to={link.path}
                        className={`relative px-3 xl:px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center gap-1 ${
                          location.pathname === link.path
                            ? 'text-primary'
                            : 'text-foreground hover:text-primary'
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${
                            isServicesOpen ? 'rotate-180' : ''
                          }`}
                        />
                        <span
                          className={`absolute bottom-0 ${
                            isRTL ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'
                          } h-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-300 ${
                            location.pathname === link.path ? 'w-3/4' : 'w-0 group-hover:w-3/4'
                          }`}
                        />
                      </Link>

                      {/* Services Dropdown */}
                      {isServicesOpen && services.length > 0 && (
                        <div
                          className={`absolute top-full mt-2 ${
                            isRTL ? 'right-0' : 'left-0'
                          } w-64 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in-0 zoom-in-95`}
                        >
                          <div className="p-2">
                            {services.map((service) => (
                              <Link
                                key={service.id}
                                to={`/solutions#${service.id}`}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors group/item"
                                onClick={() => setIsServicesOpen(false)}
                              >
                                {service.icon_url && (
                                  <img
                                    src={service.icon_url}
                                    alt={
                                      language === 'ar' ? service.name_ar : service.name_en
                                    }
                                    className="w-8 h-8 object-contain"
                                  />
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium text-foreground group-hover/item:text-primary transition-colors">
                                    {language === 'ar' ? service.name_ar : service.name_en}
                                  </div>
                                  {(language === 'ar'
                                    ? service.description_ar
                                    : service.description_en) && (
                                    <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                                      {language === 'ar'
                                        ? service.description_ar
                                        : service.description_en}
                                    </div>
                                  )}
                                </div>
                              </Link>
                            ))}
                            <div className="border-t border-border mt-2 pt-2">
                              <Link
                                to="/solutions"
                                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                onClick={() => setIsServicesOpen(false)}
                              >
                                {isRTL ? 'عرض الكل' : 'View All'}
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                // Regular links
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-3 xl:px-4 py-2 text-sm font-medium transition-all duration-300 group ${
                      location.pathname === link.path
                        ? 'text-primary'
                        : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 ${
                        isRTL ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'
                      } h-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-300 ${
                        location.pathname === link.path ? 'w-3/4' : 'w-0 group-hover:w-3/4'
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4">
              {/* Admin/Login Button */}
              <Link
                to={isAdmin ? '/admin' : '/admin/login'}
                className="flex items-center gap-2 px-3 xl:px-4 py-2 text-sm font-medium text-foreground hover:text-primary border border-border hover:border-primary/30 rounded-xl transition-all duration-300 hover:bg-primary/5 group"
              >
                {isAdmin ? (
                  <>
                    <Shield className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>{isRTL ? 'لوحة التحكم' : 'Dashboard'}</span>
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>{isRTL ? 'تسجيل دخول' : 'Login'}</span>
                  </>
                )}
              </Link>

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 xl:px-4 py-2 text-sm font-medium text-foreground hover:text-primary border border-border hover:border-primary/30 rounded-xl transition-all duration-300 hover:bg-primary/5"
              >
                <Globe className="h-4 w-4" />
                <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
              </button>

              {/* Contact Button */}
              <Link to="/contact">
                <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl px-6">
                  {isRTL ? 'تواصل معنا' : 'Contact Us'}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ${
              isMobileMenuOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="mt-4 pb-4">
              <div className="flex flex-col gap-1 bg-gradient-to-br from-muted/60 to-muted/30 backdrop-blur-sm rounded-2xl p-4 border border-border/50">
                {navLinks.map((link, index) => {
                  // Special handling for Solutions link with services in mobile
                  if (link.path === '/solutions') {
                    return (
                      <div key={link.path} className="flex flex-col">
                        <Link
                          to={link.path}
                          className={`px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
                            location.pathname === link.path
                              ? 'text-primary bg-primary/10 shadow-sm'
                              : 'text-foreground hover:text-primary hover:bg-primary/5'
                          }`}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          {link.label}
                        </Link>
                        {services.length > 0 && (
                          <div className="mt-2 ml-4 flex flex-col gap-1 border-l-2 border-primary/20 pl-4">
                            {services.slice(0, 5).map((service) => (
                              <Link
                                key={service.id}
                                to={`/solutions#${service.id}`}
                                className="px-3 py-2 text-sm text-muted-foreground hover:text-primary rounded-lg hover:bg-primary/5 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {language === 'ar' ? service.name_ar : service.name_en}
                              </Link>
                            ))}
                            {services.length > 5 && (
                              <Link
                                to="/solutions"
                                className="px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {isRTL ? 'عرض المزيد...' : 'View More...'}
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
                        location.pathname === link.path
                          ? 'text-primary bg-primary/10 shadow-sm'
                          : 'text-foreground hover:text-primary hover:bg-primary/5'
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                
                {/* Admin/Login Button in Mobile Menu */}
                <Link
                  to={isAdmin ? '/admin' : '/admin/login'}
                  className={`px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 flex items-center gap-3 ${
                    location.pathname === '/admin' || location.pathname === '/admin/login'
                      ? 'text-primary bg-primary/10 shadow-sm'
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {isAdmin ? (
                    <>
                      <Shield className="h-5 w-5" />
                      <span>{isRTL ? 'لوحة التحكم' : 'Dashboard'}</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5" />
                      <span>{isRTL ? 'تسجيل دخول' : 'Login'}</span>
                    </>
                  )}
                </Link>

                <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-border/50">
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-foreground border border-border hover:border-primary/30 rounded-xl bg-card/50 backdrop-blur-sm transition-all duration-300"
                  >
                    <Globe className="h-4 w-4" />
                    <span>{language === 'ar' ? 'English' : 'العربية'}</span>
                  </button>
                  <Link to="/contact">
                    <Button className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-6 rounded-xl shadow-lg">
                      {isRTL ? 'تواصل معنا' : 'Contact Us'}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}