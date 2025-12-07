import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface IndustryData {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string | null;
  description_ar: string | null;
  icon_url: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export function useIndustries() {
  const [industries, setIndustries] = useState<IndustryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const fetchIndustries = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('industries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIndustries(data || []);
    } catch (error) {
      console.error('Error fetching industries:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل القطاعات',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createIndustry = async (industry: Omit<IndustryData, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setIsSaving(true);
      const { data, error } = await supabase
        .from('industries')
        .insert(industry)
        .select()
        .single();

      if (error) throw error;
      
      setIndustries(prev => [data, ...prev]);
      toast({
        title: 'تم الإنشاء',
        description: 'تم إضافة القطاع بنجاح',
      });
      return data;
    } catch (error) {
      console.error('Error creating industry:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في إضافة القطاع',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const updateIndustry = async (id: string, updates: Partial<IndustryData>) => {
    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('industries')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      setIndustries(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
      toast({
        title: 'تم التحديث',
        description: 'تم تحديث القطاع بنجاح',
      });
      return true;
    } catch (error) {
      console.error('Error updating industry:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحديث القطاع',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteIndustry = async (id: string) => {
    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('industries')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setIndustries(prev => prev.filter(i => i.id !== id));
      toast({
        title: 'تم الحذف',
        description: 'تم حذف القطاع بنجاح',
      });
      return true;
    } catch (error) {
      console.error('Error deleting industry:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في حذف القطاع',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const uploadMedia = async (file: File, type: 'image' | 'video' = 'image'): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${type}-${Date.now()}.${fileExt}`;
      const filePath = `${type}s/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('industry-media')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('industry-media')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading media:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في رفع الملف',
        variant: 'destructive',
      });
      return null;
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  return {
    industries,
    isLoading,
    isSaving,
    createIndustry,
    updateIndustry,
    deleteIndustry,
    uploadMedia,
    refetch: fetchIndustries,
  };
}
