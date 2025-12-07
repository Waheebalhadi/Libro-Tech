import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSiteSettings, SiteSettings } from '@/hooks/useSiteSettings';
import { useLanguage } from '@/contexts/LanguageContext';
import LogoUploader from '@/components/admin/settings/LogoUploader';
import CompanyInfoForm from '@/components/admin/settings/CompanyInfoForm';
import SEOSettings from '@/components/admin/settings/SEOSettings';

export default function Settings() {
  const { settings, isLoading, isSaving, updateSettings, uploadImage, refetch } = useSiteSettings();
  const { t } = useLanguage();
  const [localSettings, setLocalSettings] = useState<Partial<SiteSettings>>({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  const handleChange = (updates: Partial<SiteSettings>) => {
    setLocalSettings(prev => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    await updateSettings(localSettings);
    setHasChanges(false);
  };

  const handleUpload = async (file: File, type: 'logo' | 'favicon'): Promise<string | null> => {
    const url = await uploadImage(file, type);
    if (url) {
      handleChange(type === 'logo' ? { logo_url: url } : { favicon_url: url });
    }
    return url;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 sm:p-3 rounded-xl bg-primary/10">
            <SettingsIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">{t('admin.settings.title')}</h1>
            <p className="text-muted-foreground text-sm sm:text-base">{t('admin.settings.desc')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="outline" size="icon" onClick={refetch} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!hasChanges || isSaving}
            className="gap-2 bg-primary hover:bg-primary-dark"
            size="sm"
          >
            {isSaving ? (
              <>
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="hidden sm:inline">{t('common.saving')}</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span className="hidden sm:inline">{t('common.save')}</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : (
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 sm:mb-6 h-auto">
            <TabsTrigger value="general" className="text-xs sm:text-sm py-2 sm:py-2.5">
              {t('admin.settings.logoIdentity')}
            </TabsTrigger>
            <TabsTrigger value="company" className="text-xs sm:text-sm py-2 sm:py-2.5">
              {t('admin.settings.companyInfo')}
            </TabsTrigger>
            <TabsTrigger value="seo" className="text-xs sm:text-sm py-2 sm:py-2.5">
              {t('admin.settings.seoLanguages')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <LogoUploader
              logoUrl={localSettings.logo_url || null}
              faviconUrl={localSettings.favicon_url || null}
              onLogoChange={(url) => handleChange({ logo_url: url })}
              onFaviconChange={(url) => handleChange({ favicon_url: url })}
              onUpload={handleUpload}
            />
          </TabsContent>
          
          <TabsContent value="company">
            <CompanyInfoForm
              settings={localSettings as SiteSettings}
              onChange={handleChange}
            />
          </TabsContent>
          
          <TabsContent value="seo">
            <SEOSettings
              settings={localSettings as SiteSettings}
              onChange={handleChange}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}