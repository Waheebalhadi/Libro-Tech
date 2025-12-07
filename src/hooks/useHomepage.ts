import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface HomepageData {
  id: string;
  title_en: string;
  title_ar: string;
  subtitle_en: string | null;
  subtitle_ar: string | null;
  hero_image_url: string | null;
  pillar1_title: string | null;
  pillar1_desc: string | null;
  pillar2_title: string | null;
  pillar2_desc: string | null;
  pillar3_title: string | null;
  pillar3_desc: string | null;
}

export function useHomepage() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const fetchHomepage = async () => {
    try {
      setIsLoading(true);
      const { data: homepage, error } = await supabase
        .from('homepage')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      setData(homepage);
    } catch (error) {
      console.error('Error fetching homepage:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل بيانات الصفحة الرئيسية',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateHomepage = async (updates: Partial<HomepageData>) => {
    if (!data?.id) {
      // Create new record if none exists
      try {
        setIsSaving(true);
        const { data: newData, error } = await supabase
          .from('homepage')
          .insert({
            title_en: updates.title_en || 'Welcome',
            title_ar: updates.title_ar || 'مرحباً',
            ...updates,
          })
          .select()
          .single();

        if (error) throw error;
        setData(newData);
        toast({
          title: 'تم الحفظ',
          description: 'تم إنشاء بيانات الصفحة الرئيسية بنجاح',
        });
        return true;
      } catch (error) {
        console.error('Error creating homepage:', error);
        toast({
          title: 'خطأ',
          description: 'فشل في إنشاء بيانات الصفحة الرئيسية',
          variant: 'destructive',
        });
        return false;
      } finally {
        setIsSaving(false);
      }
    }

    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('homepage')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', data.id);

      if (error) throw error;
      
      setData(prev => prev ? { ...prev, ...updates } : null);
      toast({
        title: 'تم الحفظ',
        description: 'تم تحديث بيانات الصفحة الرئيسية بنجاح',
      });
      return true;
    } catch (error) {
      console.error('Error updating homepage:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحديث بيانات الصفحة الرئيسية',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `hero-${Date.now()}.${fileExt}`;
      const filePath = `hero/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('homepage-assets')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('homepage-assets')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في رفع الصورة',
        variant: 'destructive',
      });
      return null;
    }
  };

  useEffect(() => {
    fetchHomepage();
  }, []);

  return {
    data,
    isLoading,
    isSaving,
    updateHomepage,
    uploadImage,
    refetch: fetchHomepage,
  };
}
