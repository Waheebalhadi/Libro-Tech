import { cn } from '@/lib/utils';

interface SectionTitleProps {
  /** النص الأسود (الجزء الأول) */
  darkText: string;
  /** النص الأزرق/الملون (الجزء المميز) */
  highlightText: string;
  /** النص الأسود (الجزء الأخير) - اختياري */
  darkTextEnd?: string;
  /** صفوف CSS إضافية */
  className?: string;
  /** حجم العنوان */
  size?: 'sm' | 'md' | 'lg';
}

export default function SectionTitle({
  darkText,
  highlightText,
  darkTextEnd,
  className,
  size = 'lg',
}: SectionTitleProps) {
  const sizeClasses = {
    sm: 'text-xl sm:text-2xl md:text-3xl',
    md: 'text-2xl sm:text-3xl md:text-4xl',
    lg: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
  };

  return (
    <h2
      className={cn(
        'font-bold leading-tight',
        sizeClasses[size],
        className
      )}
    >
      <span className="text-foreground">{darkText}</span>{' '}
      <span className="text-primary">{highlightText}</span>
      {darkTextEnd && <span className="text-foreground"> {darkTextEnd}</span>}
    </h2>
  );
}
