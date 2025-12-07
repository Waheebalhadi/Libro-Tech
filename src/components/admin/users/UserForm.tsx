import { useState, useEffect } from 'react';
import { Save, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { UserData } from '@/hooks/useUsers';
import RoleSelector from './RoleSelector';
import { useLanguage } from '@/contexts/LanguageContext';

interface UserFormProps {
  user: UserData | null;
  onSave: (data: { name: string; email: string; password?: string; role: string }) => void;
  onClose: () => void;
  isSaving: boolean;
  open: boolean;
}

export default function UserForm({ user, onSave, onClose, isSaving, open }: UserFormProps) {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        role: user.role || 'user',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'user',
      });
    }
  }, [user, open]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: { name: string; email: string; password?: string; role: string } = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
    };
    
    if (formData.password) {
      data.password = formData.password;
    }
    
    onSave(data);
  };

  const isValid = formData.name.trim() && formData.email.trim() && (user || formData.password.trim());

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {user ? t('admin.users.edit') : t('admin.users.add')}
          </DialogTitle>
          <DialogDescription>
            {language === 'ar' ? 'أدخل بيانات المستخدم' : 'Enter user details'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('admin.users.name')} *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder={language === 'ar' ? 'أدخل اسم المستخدم' : 'Enter user name'}
              dir={language === 'ar' ? 'rtl' : 'ltr'}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t('admin.users.email')} *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="example@email.com"
              dir="ltr"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              {t('admin.users.password')} {user ? (language === 'ar' ? '(اتركها فارغة للإبقاء على القديمة)' : '(leave empty to keep current)') : '*'}
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="********"
                dir="ltr"
                required={!user}
                className="pe-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <Label>{t('admin.users.role')}</Label>
            <RoleSelector
              value={formData.role}
              onChange={(role) => handleChange('role', role)}
            />
          </div>
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
