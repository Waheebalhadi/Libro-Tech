import { Image as ImageIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HomepageData } from '@/hooks/useHomepage';
import ImageInput from '@/components/admin/shared/ImageInput';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface HeroEditorProps {
  data: HomepageData | null;
  onChange: (updates: Partial<HomepageData>) => void;
  onImageUpload: (file: File) => Promise<string | null>;
}

export default function HeroEditor({ data, onChange, onImageUpload }: HeroEditorProps) {
  const { isRTL, t } = useLanguage();
  
  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border/50">
        <CardTitle className={cn("flex items-center gap-2", isRTL ? "flex-row-reverse" : "")}>
          <ImageIcon className="h-5 w-5 text-primary" />
          {t('admin.homepage.heroTitle')}
        </CardTitle>
      </CardHeader>
      <CardContent className={cn("space-y-6 p-6", isRTL ? "text-right" : "text-left")}>
        {/* Image Upload/URL */}
        <ImageInput
          label="صورة الخلفية"
          value={data?.hero_image_url || ''}
          onChange={(url) => onChange({ hero_image_url: url || null })}
          onUpload={onImageUpload}
          aspectRatio="video"
        />

        {/* Title & Subtitle */}
        <Tabs defaultValue="ar" className="w-full">
          <TabsList className={cn("grid w-full grid-cols-2", isRTL ? "flex-row-reverse" : "")}>
            <TabsTrigger value="ar" className={cn(isRTL ? "text-right" : "text-left")}>
              {t('lang.arabic')}
            </TabsTrigger>
            <TabsTrigger value="en" className={cn(isRTL ? "text-right" : "text-left")}>
              {t('lang.english')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ar" className={cn("space-y-4 mt-4", isRTL ? "text-right" : "text-left")}>
            <div className={cn("space-y-2", isRTL ? "text-right" : "text-left")}>
              <Label htmlFor="title_ar" className={cn(isRTL ? "text-right" : "text-left")}>
                {t('admin.homepage.heroTitle')}
              </Label>
              <Input
                id="title_ar"
                value={data?.title_ar || ''}
                onChange={(e) => onChange({ title_ar: e.target.value })}
                placeholder={isRTL ? "أدخل العنوان الرئيسي" : "Enter main title"}
                dir="rtl"
                className={cn("w-full", isRTL ? "text-right" : "text-left")}
              />
            </div>
            <div className={cn("space-y-2", isRTL ? "text-right" : "text-left")}>
              <Label htmlFor="subtitle_ar" className={cn(isRTL ? "text-right" : "text-left")}>
                {t('admin.homepage.heroSubtitle')}
              </Label>
              <Textarea
                id="subtitle_ar"
                value={data?.subtitle_ar || ''}
                onChange={(e) => onChange({ subtitle_ar: e.target.value })}
                placeholder={isRTL ? "أدخل العنوان الفرعي" : "Enter subtitle"}
                rows={3}
                dir="rtl"
                className={cn("w-full", isRTL ? "text-right" : "text-left")}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="en" className={cn("space-y-4 mt-4", isRTL ? "text-right" : "text-left")}>
            <div className={cn("space-y-2", isRTL ? "text-right" : "text-left")}>
              <Label htmlFor="title_en" className={cn(isRTL ? "text-right" : "text-left")}>
                {t('admin.homepage.heroTitle')}
              </Label>
              <Input
                id="title_en"
                value={data?.title_en || ''}
                onChange={(e) => onChange({ title_en: e.target.value })}
                placeholder="Enter main title"
                dir="ltr"
                className="w-full"
              />
            </div>
            <div className={cn("space-y-2", isRTL ? "text-right" : "text-left")}>
              <Label htmlFor="subtitle_en" className={cn(isRTL ? "text-right" : "text-left")}>
                {t('admin.homepage.heroSubtitle')}
              </Label>
              <Textarea
                id="subtitle_en"
                value={data?.subtitle_en || ''}
                onChange={(e) => onChange({ subtitle_en: e.target.value })}
                placeholder="Enter subtitle"
                rows={3}
                dir="ltr"
                className="w-full"
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
