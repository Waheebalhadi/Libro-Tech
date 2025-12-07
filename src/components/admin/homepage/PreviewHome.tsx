import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye } from 'lucide-react';
import { HomepageData } from '@/hooks/useHomepage';
import heroBg from '@/assets/hero-bg.jpg';

interface PreviewHomeProps {
  data: HomepageData | null;
}

export default function PreviewHome({ data }: PreviewHomeProps) {
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-primary" />
          معاينة مباشرة
        </CardTitle>
      </CardHeader>
      <CardContent>
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
          
          <div className="relative p-6 text-center flex flex-col justify-center min-h-[300px]">
            <h1 className="text-xl font-bold text-white mb-3 leading-tight">
              {data?.title_ar || 'العنوان الرئيسي'}
            </h1>
            <p className="text-sm text-white/80 leading-relaxed max-w-md mx-auto">
              {data?.subtitle_ar || 'العنوان الفرعي يظهر هنا'}
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
                className="p-3 bg-muted rounded-lg text-center"
              >
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs font-bold text-primary">{num}</span>
                </div>
                <h3 className="text-xs font-semibold text-foreground truncate">
                  {(data?.[titleKey] as string) || `ركيزة ${num}`}
                </h3>
                <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">
                  {(data?.[descKey] as string) || 'الوصف'}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          هذه معاينة مصغرة - ستظهر التغييرات بشكل كامل في الموقع
        </p>
      </CardContent>
    </Card>
  );
}
