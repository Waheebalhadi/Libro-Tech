import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { IndustryData } from '@/hooks/useIndustries';
import ImageInput from '@/components/admin/shared/ImageInput';
import { useLanguage } from '@/contexts/LanguageContext';

interface IndustryFormProps {
  industry: IndustryData | null;
  onSave: (data: Omit<IndustryData, 'id' | 'created_at' | 'updated_at'>) => void;
  onClose: () => void;
  onUploadMedia: (file: File, type: 'image' | 'video') => Promise<string | null>;
  isSaving: boolean;
  open: boolean;
}

export default function IndustryForm({ industry, onSave, onClose, onUploadMedia, isSaving, open }: IndustryFormProps) {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name_ar: '',
    name_en: '',
    description_ar: '',
    description_en: '',
    icon_url: '',
  });

  useEffect(() => {
    if (industry) {
      setFormData({
        name_ar: industry.name_ar || '',
        name_en: industry.name_en || '',
        description_ar: industry.description_ar || '',
        description_en: industry.description_en || '',
        icon_url: industry.icon_url || '',
      });
    } else {
      setFormData({
        name_ar: '',
        name_en: '',
        description_ar: '',
        description_en: '',
        icon_url: '',
      });
    }
  }, [industry, open]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpload = async (file: File) => {
    return await onUploadMedia(file, 'image');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name_ar: formData.name_ar,
      name_en: formData.name_en,
      description_ar: formData.description_ar || null,
      description_en: formData.description_en || null,
      icon_url: formData.icon_url || null,
    });
  };

  const isValid = formData.name_ar.trim() && formData.name_en.trim();

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {industry ? t('admin.industries.edit') : t('admin.industries.add')}
          </DialogTitle>
          <DialogDescription>
            {language === 'ar' ? 'أدخل تفاصيل القطاع باللغتين العربية والإنجليزية' : 'Enter industry details in both Arabic and English'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-6 py-4">
          <ImageInput
            label={language === 'ar' ? 'صورة القطاع' : 'Industry Image'}
            value={formData.icon_url}
            onChange={(url) => handleChange('icon_url', url)}
            onUpload={handleUpload}
            aspectRatio="video"
          />

          <Tabs defaultValue="ar" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ar">العربية</TabsTrigger>
              <TabsTrigger value="en">English</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ar" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name_ar">اسم القطاع *</Label>
                <Input
                  id="name_ar"
                  value={formData.name_ar}
                  onChange={(e) => handleChange('name_ar', e.target.value)}
                  placeholder="مثال: المطاعم والكافيهات"
                  dir="rtl"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description_ar">الوصف</Label>
                <Textarea
                  id="description_ar"
                  value={formData.description_ar}
                  onChange={(e) => handleChange('description_ar', e.target.value)}
                  placeholder="أدخل وصف القطاع"
                  rows={4}
                  dir="rtl"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="en" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name_en">Industry Name *</Label>
                <Input
                  id="name_en"
                  value={formData.name_en}
                  onChange={(e) => handleChange('name_en', e.target.value)}
                  placeholder="e.g., Restaurants & Cafes"
                  dir="ltr"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description_en">Description</Label>
                <Textarea
                  id="description_en"
                  value={formData.description_en}
                  onChange={(e) => handleChange('description_en', e.target.value)}
                  placeholder="Enter industry description"
                  rows={4}
                  dir="ltr"
                />
              </div>
            </TabsContent>
          </Tabs>
        </form>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Button type="button" variant="outline" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!isValid || isSaving}
            className="gap-2"
          >
            {isSaving ? (
              <>
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t('common.saving')}
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {t('common.save')}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
