import { useState, useEffect } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHomepage, HomepageData } from '@/hooks/useHomepage';
import { useLanguage } from '@/contexts/LanguageContext';
import HeroEditor from '@/components/admin/homepage/HeroEditor';
import FeatureListEditor from '@/components/admin/homepage/FeatureListEditor';
import PreviewHome from '@/components/admin/homepage/PreviewHome';
import { cn } from '@/lib/utils';

export default function AdminHomepage() {
  const { data, isLoading, isSaving, updateHomepage, uploadImage, refetch } = useHomepage();
  const { t, language } = useLanguage();
  const [localData, setLocalData] = useState<HomepageData | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data]);

  const handleChange = (updates: Partial<HomepageData>) => {
    setLocalData(prev => prev ? { ...prev, ...updates } : null);
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!localData) return;
    
    const success = await updateHomepage(localData);
    if (success) {
      setHasChanges(false);
    }
  };

  const handleImageUpload = async (file: File): Promise<string | null> => {
    const url = await uploadImage(file);
    if (url) {
      setHasChanges(true);
    }
    return url;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  const { isRTL } = useLanguage();
  
  return (
    <div className={cn("space-y-4 sm:space-y-6", isRTL ? "text-right" : "text-left")}>
      {/* Page Header */}
      <div className={cn("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", isRTL ? "sm:flex-row-reverse" : "")}>
        <div className={cn(isRTL ? "text-right" : "text-left")}>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">{t('admin.homepage.title')}</h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            {t('admin.homepage.desc')}
          </p>
        </div>
        
        <div className={cn("flex items-center gap-2 sm:gap-3", isRTL ? "flex-row-reverse" : "")}>
          <Button
            variant="outline"
            onClick={refetch}
            disabled={isLoading}
            className="gap-2"
            size="sm"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">{t('common.refresh')}</span>
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

      {/* Unsaved Changes Alert */}
      {hasChanges && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 sm:p-4">
          <p className="text-amber-800 dark:text-amber-200 text-xs sm:text-sm">
            {t('common.unsavedChanges')}
          </p>
        </div>
      )}

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Editors */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <HeroEditor 
            data={localData} 
            onChange={handleChange}
            onImageUpload={handleImageUpload}
          />
          <FeatureListEditor 
            data={localData} 
            onChange={handleChange}
          />
        </div>

        {/* Preview */}
        <div className="lg:col-span-1">
          <PreviewHome data={localData} />
        </div>
      </div>
    </div>
  );
}