import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GradientBannerProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
  isRTL?: boolean;
  className?: string;
}

export default function GradientBanner({
  title,
  description,
  buttonText,
  buttonLink,
  isRTL = false,
  className,
}: GradientBannerProps) {
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl',
        className
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-blue-600" />
      
      {/* Wave Pattern Overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            className="text-white/20"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* Curved Lines Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="curved-lines" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M0 50 Q 25 25, 50 50 T 100 50"
                stroke="white"
                strokeWidth="0.5"
                fill="none"
              />
              <path
                d="M0 75 Q 25 50, 50 75 T 100 75"
                stroke="white"
                strokeWidth="0.5"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#curved-lines)" />
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-16 py-10 sm:py-14 lg:py-16">
        <div className={`flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          {/* Text Content */}
          <div className={`flex-1 text-center lg:text-${isRTL ? 'right' : 'left'}`}>
            <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              {title}
            </h3>
            {description && (
              <p className="text-white/85 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
                {description}
              </p>
            )}
          </div>
          
          {/* Button */}
          <div className="flex-shrink-0">
            <Link to={buttonLink}>
              <Button
                size="lg"
                className={`bg-white text-primary hover:bg-white/95 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-bold rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {buttonText}
                <Arrow className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
