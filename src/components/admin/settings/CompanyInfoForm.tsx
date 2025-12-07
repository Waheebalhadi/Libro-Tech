import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SiteSettings } from '@/hooks/useSiteSettings';

interface CompanyInfoFormProps {
  settings: SiteSettings | null;
  onChange: (updates: Partial<SiteSettings>) => void;
}

export default function CompanyInfoForm({ settings, onChange }: CompanyInfoFormProps) {
  return (
    <div className="space-y-6">
      {/* Company Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            بيانات الشركة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="ar" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ar">العربية</TabsTrigger>
              <TabsTrigger value="en">English</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ar" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>اسم الشركة</Label>
                <Input
                  value={settings?.company_name_ar || ''}
                  onChange={(e) => onChange({ company_name_ar: e.target.value })}
                  placeholder="اسم الشركة بالعربية"
                  dir="rtl"
                />
              </div>
              <div className="space-y-2">
                <Label>العنوان</Label>
                <Input
                  value={settings?.company_address_ar || ''}
                  onChange={(e) => onChange({ company_address_ar: e.target.value })}
                  placeholder="عنوان الشركة بالعربية"
                  dir="rtl"
                />
              </div>
              <div className="space-y-2">
                <Label>وصف الشركة</Label>
                <Textarea
                  value={settings?.company_description_ar || ''}
                  onChange={(e) => onChange({ company_description_ar: e.target.value })}
                  placeholder="وصف مختصر عن الشركة"
                  rows={3}
                  dir="rtl"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="en" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input
                  value={settings?.company_name_en || ''}
                  onChange={(e) => onChange({ company_name_en: e.target.value })}
                  placeholder="Company name in English"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input
                  value={settings?.company_address_en || ''}
                  onChange={(e) => onChange({ company_address_en: e.target.value })}
                  placeholder="Company address in English"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <Label>Company Description</Label>
                <Textarea
                  value={settings?.company_description_en || ''}
                  onChange={(e) => onChange({ company_description_en: e.target.value })}
                  placeholder="Brief description of the company"
                  rows={3}
                  dir="ltr"
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                البريد الإلكتروني
              </Label>
              <Input
                type="email"
                value={settings?.company_email || ''}
                onChange={(e) => onChange({ company_email: e.target.value })}
                placeholder="info@company.com"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                رقم الهاتف
              </Label>
              <Input
                type="tel"
                value={settings?.company_phone || ''}
                onChange={(e) => onChange({ company_phone: e.target.value })}
                placeholder="+966 XX XXX XXXX"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
                رقم الواتساب
              </Label>
              <Input
                type="tel"
                value={settings?.whatsapp_number || ''}
                onChange={(e) => onChange({ whatsapp_number: e.target.value })}
                placeholder="+966 5X XXX XXXX"
                dir="ltr"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Facebook className="h-5 w-5 text-primary" />
            وسائل التواصل الاجتماعي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Facebook className="h-4 w-4 text-blue-600" />
                Facebook
              </Label>
              <Input
                value={settings?.social_facebook || ''}
                onChange={(e) => onChange({ social_facebook: e.target.value })}
                placeholder="https://facebook.com/..."
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Twitter className="h-4 w-4 text-sky-500" />
                Twitter / X
              </Label>
              <Input
                value={settings?.social_twitter || ''}
                onChange={(e) => onChange({ social_twitter: e.target.value })}
                placeholder="https://twitter.com/..."
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-pink-500" />
                Instagram
              </Label>
              <Input
                value={settings?.social_instagram || ''}
                onChange={(e) => onChange({ social_instagram: e.target.value })}
                placeholder="https://instagram.com/..."
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Linkedin className="h-4 w-4 text-blue-700" />
                LinkedIn
              </Label>
              <Input
                value={settings?.social_linkedin || ''}
                onChange={(e) => onChange({ social_linkedin: e.target.value })}
                placeholder="https://linkedin.com/..."
                dir="ltr"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label className="flex items-center gap-2">
                <Youtube className="h-4 w-4 text-red-600" />
                YouTube
              </Label>
              <Input
                value={settings?.social_youtube || ''}
                onChange={(e) => onChange({ social_youtube: e.target.value })}
                placeholder="https://youtube.com/..."
                dir="ltr"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
