import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'moderator' | 'user';
  created_at?: string;
}

export function useUsers() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل المستخدمين',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserRoles = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*');

      if (error) throw error;
      setUserRoles(data || []);
    } catch (error) {
      console.error('Error fetching user roles:', error);
    }
  };

  const createUser = async (userData: { name: string; email: string; password: string; role: string }) => {
    try {
      setIsSaving(true);
      
      const { data, error } = await supabase
        .from('users')
        .insert([{
          name: userData.name,
          email: userData.email,
          password: userData.password,
          role: userData.role
        }])
        .select()
        .single();

      if (error) throw error;

      // Add user role
      if (data) {
        await supabase
          .from('user_roles')
          .insert([{ user_id: data.id, role: userData.role as 'admin' | 'moderator' | 'user' }]);
      }

      toast({
        title: 'تم الإضافة',
        description: 'تم إضافة المستخدم بنجاح',
      });

      await fetchUsers();
      await fetchUserRoles();
      return data;
    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في إضافة المستخدم',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const updateUser = async (id: string, userData: Partial<UserData>) => {
    try {
      setIsSaving(true);
      
      const updateData: Record<string, unknown> = { ...userData };
      delete updateData.id;
      delete updateData.created_at;
      
      const { error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      // Update user role if provided
      if (userData.role) {
        // Delete existing roles
        await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', id);
        
        // Insert new role
        await supabase
          .from('user_roles')
          .insert([{ user_id: id, role: userData.role as 'admin' | 'moderator' | 'user' }]);
      }

      toast({
        title: 'تم التحديث',
        description: 'تم تحديث المستخدم بنجاح',
      });

      await fetchUsers();
      await fetchUserRoles();
      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحديث المستخدم',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'تم الحذف',
        description: 'تم حذف المستخدم بنجاح',
      });

      await fetchUsers();
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في حذف المستخدم',
        variant: 'destructive',
      });
      return false;
    }
  };

  const getUserRole = (userId: string): string => {
    const role = userRoles.find(r => r.user_id === userId);
    return role?.role || 'user';
  };

  useEffect(() => {
    fetchUsers();
    fetchUserRoles();
  }, []);

  return {
    users,
    userRoles,
    isLoading,
    isSaving,
    createUser,
    updateUser,
    deleteUser,
    getUserRole,
    refetch: fetchUsers,
  };
}
