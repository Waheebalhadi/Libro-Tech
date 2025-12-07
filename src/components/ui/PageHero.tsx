import { ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
interface PageHeroProps {
  /** Badge text */
  badge?: string;
  /** Main title */
  title: string;
  /** Subtitle/description */
  subtitle?: string;
  /** Custom icon instead of Sparkles */
  icon?: ReactNode;
  /** Additional content below subtitle */
  children?: ReactNode;
  /** Custom className */
  className?: string;
}
export default function PageHero({
  badge,
  title,
  subtitle,
  icon,
  children,
  className
}: PageHeroProps) {
  const {
    isRTL
  } = useLanguage();
  return <section className={cn('relative min-h-[50vh] flex items-center overflow-hidden bg-primary pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24', className)} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Decorative Elements - Same as Homepage */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Large circle top */}
        <div className={`absolute top-10 ${isRTL ? 'right-10' : 'left-10'} w-[250px] sm:w-[350px] md:w-[450px] h-[250px] sm:h-[350px] md:h-[450px] rounded-full border-[15px] sm:border-[25px] md:border-[35px] border-primary-foreground/10 animate-pulse-glow`} />
        
        {/* Large circle bottom */}
        <div className={`absolute -bottom-32 ${isRTL ? '-left-32' : '-right-32'} w-[300px] sm:w-[450px] md:w-[550px] h-[300px] sm:h-[450px] md:h-[550px] rounded-full border-[20px] sm:border-[35px] md:border-[50px] border-primary-foreground/5`} />
        
        {/* Small floating circles */}
        <div className={`absolute top-1/3 ${isRTL ? 'left-1/4' : 'right-1/4'} w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary-foreground/20 animate-float`} />
        <div className={`absolute bottom-1/4 ${isRTL ? 'right-1/3' : 'left-1/3'} w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary-foreground/15 animate-float`} style={{
        animationDelay: '1s'
      }} />
        <div className={`absolute top-1/2 ${isRTL ? 'right-10' : 'left-10'} w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary-foreground/25 animate-float`} style={{
        animationDelay: '2s'
      }} />

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          {badge && <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-xs sm:text-sm font-semibold mb-5 sm:mb-6 backdrop-blur-sm animate-fade-in border border-primary-foreground/10">
              {icon}
              {badge}
            </span>}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 sm:mb-6 animate-slide-up leading-tight">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{
          animationDelay: '0.1s'
        }}>
              {subtitle}
            </p>}

          {/* Additional Content */}
          {children && <div className="mt-6 sm:mt-8 animate-slide-up" style={{
          animationDelay: '0.2s'
        }}>
              {children}
            </div>}
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 overflow-hidden">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full h-auto" preserveAspectRatio="none">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" className="fill-background" />
        </svg>
      </div>
    </section>;
}