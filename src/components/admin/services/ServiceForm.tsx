import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ServiceData } from '@/hooks/useServices';
import ImageInput from '@/components/admin/shared/ImageInput';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceFormProps {
  service: ServiceData | null;
  onSave: (data: Omit<ServiceData, 'id' | 'created_at' | 'updated_at'>) => void;
  onClose: () => void;
  onUploadIcon: (file: File) => Promise<string | null>;
  isSaving: boolean;
  open: boolean;
}

export default function ServiceForm({ service, onSave, onClose, onUploadIcon, isSaving, open }: ServiceFormProps) {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name_ar: '',
    name_en: '',
    description_ar: '',
    description_en: '',
    icon_url: '',
  });

  useEffect(() => {
    if (service) {
      setFormData({
        name_ar: service.name_ar || '',
        name_en: service.name_en || '',
        description_ar: service.description_ar || '',
        description_en: service.description_en || '',
        icon_url: service.icon_url || '',
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
  }, [service, open]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
            {service ? t('admin.services.edit') : t('admin.services.add')}
          </DialogTitle>
          <DialogDescription>
            {language === 'ar' ? 'أدخل تفاصيل الخدمة باللغتين العربية والإنجليزية' : 'Enter service details in both Arabic and English'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-6 py-4">
          <ImageInput
            label={language === 'ar' ? 'أيقونة الخدمة' : 'Service Icon'}
            value={formData.icon_url}
            onChange={(url) => handleChange('icon_url', url)}
            onUpload={onUploadIcon}
            aspectRatio="square"
          />

          <Tabs defaultValue="ar" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ar">العربية</TabsTrigger>
              <TabsTrigger value="en">English</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ar" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name_ar">اسم الخدمة *</Label>
                <Input
                  id="name_ar"
                  value={formData.name_ar}
                  onChange={(e) => handleChange('name_ar', e.target.value)}
                  placeholder="أدخل اسم الخدمة"
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
                  placeholder="أدخل وصف الخدمة"
                  rows={4}
                  dir="rtl"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="en" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name_en">Service Name *</Label>
                <Input
                  id="name_en"
                  value={formData.name_en}
                  onChange={(e) => handleChange('name_en', e.target.value)}
                  placeholder="Enter service name"
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
                  placeholder="Enter service description"
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
