import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye } from 'lucide-react';
import { HomepageData } from '@/hooks/useHomepage';
import heroBg from '@/assets/hero-bg.jpg';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface PreviewHomeProps {
  data: HomepageData | null;
}

export default function PreviewHome({ data }: PreviewHomeProps) {
  const { isRTL, t } = useLanguage();
  
  return (
    <Card className="sticky top-24 shadow-sm border-border/50">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border/50">
        <CardTitle className={cn("flex items-center gap-2", isRTL ? "flex-row-reverse" : "")}>
          <Eye className="h-5 w-5 text-primary" />
          {t('admin.homepage.preview')}
        </CardTitle>
      </CardHeader>
      <CardContent className={cn("p-6", isRTL ? "text-right" : "text-left")}>
        {/* Hero Preview */}
        <div 
          className="relative rounded-xl overflow-hidden bg-gradient-hero min-h-[300px]"
          style={{
            backgroundImage: data?.hero_image_url 
              ? `url(${data.hero_image_url})` 
              : `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          
          <div className={cn("relative p-6 flex flex-col justify-center min-h-[300px]", isRTL ? "text-right" : "text-center")}>
            <h1 className={cn("text-xl font-bold text-white mb-3 leading-tight", isRTL ? "text-right" : "text-center")}>
              {isRTL ? (data?.title_ar || 'العنوان الرئيسي') : (data?.title_en || 'Main Title')}
            </h1>
            <p className={cn("text-sm text-white/80 leading-relaxed max-w-md", isRTL ? "text-right mx-0" : "text-center mx-auto")}>
              {isRTL ? (data?.subtitle_ar || 'العنوان الفرعي يظهر هنا') : (data?.subtitle_en || 'Subtitle appears here')}
            </p>
          </div>
        </div>

        {/* Pillars Preview */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[1, 2, 3].map((num) => {
            const titleKey = `pillar${num}_title` as keyof HomepageData;
            const descKey = `pillar${num}_desc` as keyof HomepageData;
            
            return (
              <div 
                key={num}
                className={cn("p-3 bg-gradient-to-br from-muted/80 to-muted/60 rounded-lg border border-border/50", isRTL ? "text-right" : "text-center")}
              >
                <div className={cn("h-8 w-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center mb-2 border border-primary/20", isRTL ? "mr-0 ml-auto" : "mx-auto")}>
                  <span className="text-xs font-bold text-primary">{num}</span>
                </div>
                <h3 className={cn("text-xs font-semibold text-foreground truncate", isRTL ? "text-right" : "text-center")}>
                  {(data?.[titleKey] as string) || (isRTL ? `ركيزة ${num}` : `Pillar ${num}`)}
                </h3>
                <p className={cn("text-[10px] text-muted-foreground mt-1 line-clamp-2", isRTL ? "text-right" : "text-center")}>
                  {(data?.[descKey] as string) || (isRTL ? 'الوصف' : 'Description')}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className={cn("text-xs text-muted-foreground mt-4", isRTL ? "text-right" : "text-center")}>
          {isRTL ? 'هذه معاينة مصغرة - ستظهر التغييرات بشكل كامل في الموقع' : 'This is a preview - changes will appear fully on the site'}
        </p>
      </CardContent>
    </Card>
  );
}
