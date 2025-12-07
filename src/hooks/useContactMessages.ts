import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ContactMessage {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  project_type: string | null;
  message: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export function useContactMessages(filters?: { status?: string; dateFrom?: string; dateTo?: string }) {
  return useQuery({
    queryKey: ['contact-messages', filters],
    queryFn: async () => {
      let query = supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (filters?.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }
      
      if (filters?.dateFrom) {
        query = query.gte('created_at', filters.dateFrom);
      }
      
      if (filters?.dateTo) {
        query = query.lte('created_at', filters.dateTo);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as ContactMessage[];
    },
  });
}

export function useUpdateMessageStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data, error } = await supabase
        .from('contact_messages')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
      toast.success('تم تحديث حالة الرسالة');
    },
    onError: (error) => {
      toast.error('حدث خطأ أثناء تحديث حالة الرسالة');
      console.error(error);
    },
  });
}

export function useDeleteMessage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
      toast.success('تم حذف الرسالة');
    },
    onError: (error) => {
      toast.error('حدث خطأ أثناء حذف الرسالة');
      console.error(error);
    },
  });
}