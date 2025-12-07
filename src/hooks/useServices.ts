import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ServiceData {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string | null;
  description_ar: string | null;
  icon_url: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export function useServices() {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل الخدمات',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createService = async (service: Omit<ServiceData, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setIsSaving(true);
      const { data, error } = await supabase
        .from('services')
        .insert(service)
        .select()
        .single();

      if (error) throw error;
      
      setServices(prev => [data, ...prev]);
      toast({
        title: 'تم الإنشاء',
        description: 'تم إضافة الخدمة بنجاح',
      });
      return data;
    } catch (error) {
      console.error('Error creating service:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في إضافة الخدمة',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const updateService = async (id: string, updates: Partial<ServiceData>) => {
    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('services')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      setServices(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
      toast({
        title: 'تم التحديث',
        description: 'تم تحديث الخدمة بنجاح',
      });
      return true;
    } catch (error) {
      console.error('Error updating service:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحديث الخدمة',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteService = async (id: string) => {
    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setServices(prev => prev.filter(s => s.id !== id));
      toast({
        title: 'تم الحذف',
        description: 'تم حذف الخدمة بنجاح',
      });
      return true;
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في حذف الخدمة',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const uploadIcon = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `icon-${Date.now()}.${fileExt}`;
      const filePath = `icons/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('service-icons')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('service-icons')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading icon:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في رفع الأيقونة',
        variant: 'destructive',
      });
      return null;
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    isLoading,
    isSaving,
    createService,
    updateService,
    deleteService,
    uploadIcon,
    refetch: fetchServices,
  };
}
