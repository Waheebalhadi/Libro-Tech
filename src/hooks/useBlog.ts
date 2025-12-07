import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface BlogPost {
  id: string;
  title_ar: string;
  title_en: string;
  content_ar: string | null;
  content_en: string | null;
  image_url: string | null;
  author: string | null;
  category_id: string | null;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  category?: BlogCategory | null;
}

export interface BlogCategory {
  id: string;
  name_ar: string;
  name_en: string;
  created_at: string | null;
  updated_at: string | null;
}

export function useBlogPosts() {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as BlogPost[];
    },
  });
}

export function useBlogCategories() {
  return useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name_ar');
      
      if (error) throw error;
      return data as BlogCategory[];
    },
  });
}

export function useCreateBlogPost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'category'>) => {
      const { data, error } = await supabase
        .from('blog')
        .insert(post)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast.success('تم إضافة المقال بنجاح');
    },
    onError: (error) => {
      toast.error('حدث خطأ أثناء إضافة المقال');
      console.error(error);
    },
  });
}

export function useUpdateBlogPost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...post }: Partial<BlogPost> & { id: string }) => {
      const { data, error } = await supabase
        .from('blog')
        .update(post)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast.success('تم تحديث المقال بنجاح');
    },
    onError: (error) => {
      toast.error('حدث خطأ أثناء تحديث المقال');
      console.error(error);
    },
  });
}

export function useDeleteBlogPost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blog')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast.success('تم حذف المقال بنجاح');
    },
    onError: (error) => {
      toast.error('حدث خطأ أثناء حذف المقال');
      console.error(error);
    },
  });
}

export function useCreateBlogCategory() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (category: Omit<BlogCategory, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('blog_categories')
        .insert(category)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-categories'] });
      toast.success('تم إضافة التصنيف بنجاح');
    },
    onError: (error) => {
      toast.error('حدث خطأ أثناء إضافة التصنيف');
      console.error(error);
    },
  });
}

export function useUpdateBlogCategory() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...category }: Partial<BlogCategory> & { id: string }) => {
      const { data, error } = await supabase
        .from('blog_categories')
        .update(category)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-categories'] });
      toast.success('تم تحديث التصنيف بنجاح');
    },
    onError: (error) => {
      toast.error('حدث خطأ أثناء تحديث التصنيف');
      console.error(error);
    },
  });
}

export function useDeleteBlogCategory() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blog_categories')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-categories'] });
      toast.success('تم حذف التصنيف بنجاح');
    },
    onError: (error) => {
      toast.error('حدث خطأ أثناء حذف التصنيف');
      console.error(error);
    },
  });
}