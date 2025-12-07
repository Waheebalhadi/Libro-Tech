import { Search, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SiteSettings } from '@/hooks/useSiteSettings';
interface SEOSettingsProps {
  settings: SiteSettings | null;
  onChange: (updates: Partial<SiteSettings>) => void;
}
export default function SEOSettings({
  settings,
  onChange
}: SEOSettingsProps) {
  return <div className="space-y-6">
      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-right">
            <Globe className="h-5 w-5 text-primary" />
            إعدادات اللغة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>اللغة الافتراضية</Label>
            <Select value={settings?.default_language || 'ar'} onValueChange={value => onChange({
            default_language: value
          })}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ar">العربية</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground text-right">
              اللغة التي سيظهر بها الموقع افتراضياً للزوار الجدد
            </p>
          </div>
        </CardContent>
      </Card>

      {/* SEO Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-right">
            <Search className="h-5 w-5 text-primary" />
            إعدادات محركات البحث (SEO)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="ar" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ar">العربية</TabsTrigger>
              <TabsTrigger value="en">English</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ar" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>عنوان الموقع (Title)</Label>
                <Input value={settings?.seo_title_ar || ''} onChange={e => onChange({
                seo_title_ar: e.target.value
              })} placeholder="عنوان الموقع الذي سيظهر في نتائج البحث" dir="rtl" />
                <p className="text-xs text-muted-foreground">يفضل أن يكون أقل من 60 حرف</p>
              </div>
              <div className="space-y-2">
                <Label>وصف الموقع (Meta Description)</Label>
                <Textarea value={settings?.seo_description_ar || ''} onChange={e => onChange({
                seo_description_ar: e.target.value
              })} placeholder="وصف مختصر للموقع يظهر في نتائج البحث" rows={3} dir="rtl" />
                <p className="text-xs text-muted-foreground">يفضل أن يكون بين 120-160 حرف</p>
              </div>
              <div className="space-y-2">
                <Label>الكلمات المفتاحية (Keywords)</Label>
                <Textarea value={settings?.seo_keywords_ar || ''} onChange={e => onChange({
                seo_keywords_ar: e.target.value
              })} placeholder="كلمات مفتاحية مفصولة بفواصل" rows={2} dir="rtl" />
              </div>
            </TabsContent>
            
            <TabsContent value="en" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Site Title</Label>
                <Input value={settings?.seo_title_en || ''} onChange={e => onChange({
                seo_title_en: e.target.value
              })} placeholder="Site title for search results" dir="ltr" />
                <p className="text-xs text-muted-foreground">Recommended: less than 60 characters</p>
              </div>
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea value={settings?.seo_description_en || ''} onChange={e => onChange({
                seo_description_en: e.target.value
              })} placeholder="Brief description for search results" rows={3} dir="ltr" />
                <p className="text-xs text-muted-foreground">Recommended: 120-160 characters</p>
              </div>
              <div className="space-y-2">
                <Label>Keywords</Label>
                <Textarea value={settings?.seo_keywords_en || ''} onChange={e => onChange({
                seo_keywords_en: e.target.value
              })} placeholder="Keywords separated by commas" rows={2} dir="ltr" />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>;
}