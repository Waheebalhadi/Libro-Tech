import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('admin_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        localStorage.removeItem('admin_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      
      // Query the users table
      const { data, error } = await supabase
        .from('users')
        .select('id, name, email, role, password')
        .eq('email', email)
        .maybeSingle();

      if (error) {
        console.error('Database error:', error);
        return { success: false, error: 'حدث خطأ في الاتصال بقاعدة البيانات' };
      }

      if (!data) {
        return { success: false, error: 'البريد الإلكتروني غير مسجل' };
      }

      // Simple password check (in production, use proper hashing)
      if (data.password !== password) {
        return { success: false, error: 'كلمة المرور غير صحيحة' };
      }

      // Check if user is admin
      if (data.role !== 'admin') {
        return { success: false, error: 'ليس لديك صلاحية الوصول للوحة التحكم' };
      }

      const userData: User = {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
      };

      setUser(userData);
      localStorage.setItem('admin_user', JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'حدث خطأ غير متوقع' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin_user');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
