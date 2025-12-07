import { Image as ImageIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HomepageData } from '@/hooks/useHomepage';
import ImageInput from '@/components/admin/shared/ImageInput';

interface HeroEditorProps {
  data: HomepageData | null;
  onChange: (updates: Partial<HomepageData>) => void;
  onImageUpload: (file: File) => Promise<string | null>;
}

export default function HeroEditor({ data, onChange, onImageUpload }: HeroEditorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-primary" />
          قسم الهيرو
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ar">العربية</TabsTrigger>
            <TabsTrigger value="en">English</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ar" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="title_ar">العنوان الرئيسي</Label>
              <Input
                id="title_ar"
                value={data?.title_ar || ''}
                onChange={(e) => onChange({ title_ar: e.target.value })}
                placeholder="أدخل العنوان الرئيسي"
                dir="rtl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle_ar">العنوان الفرعي</Label>
              <Textarea
                id="subtitle_ar"
                value={data?.subtitle_ar || ''}
                onChange={(e) => onChange({ subtitle_ar: e.target.value })}
                placeholder="أدخل العنوان الفرعي"
                rows={3}
                dir="rtl"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="en" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="title_en">Main Title</Label>
              <Input
                id="title_en"
                value={data?.title_en || ''}
                onChange={(e) => onChange({ title_en: e.target.value })}
                placeholder="Enter main title"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle_en">Subtitle</Label>
              <Textarea
                id="subtitle_en"
                value={data?.subtitle_en || ''}
                onChange={(e) => onChange({ subtitle_en: e.target.value })}
                placeholder="Enter subtitle"
                rows={3}
                dir="ltr"
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
