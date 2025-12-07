import { useState } from 'react';
import { Plus, Users as UsersIcon, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUsers, UserData } from '@/hooks/useUsers';
import { useLanguage } from '@/contexts/LanguageContext';
import UserList from '@/components/admin/users/UserList';
import UserForm from '@/components/admin/users/UserForm';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export default function Users() {
  const { users, isLoading, isSaving, createUser, updateUser, deleteUser, refetch } = useUsers();
  const { t, language } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [deletingUser, setDeletingUser] = useState<UserData | null>(null);

  const handleAdd = () => { setEditingUser(null); setShowForm(true); };
  const handleEdit = (user: UserData) => { setEditingUser(user); setShowForm(true); };
  const handleSave = async (data: { name: string; email: string; password?: string; role: string }) => {
    if (editingUser) { const success = await updateUser(editingUser.id, data); if (success) setShowForm(false); }
    else { if (!data.password) return; const result = await createUser({ ...data, password: data.password }); if (result) setShowForm(false); }
  };
  const handleDelete = async () => { if (deletingUser) { await deleteUser(deletingUser.id); setDeletingUser(null); } };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 sm:p-3 rounded-xl bg-primary/10">
            <UsersIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">{t('admin.users.title')}</h1>
            <p className="text-muted-foreground text-sm sm:text-base">{t('admin.users.desc')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="outline" size="icon" onClick={refetch} disabled={isLoading}><RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} /></Button>
          <Button onClick={handleAdd} className="gap-2" size="sm"><Plus className="h-4 w-4" /><span className="hidden sm:inline">{t('admin.users.add')}</span></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-card rounded-xl border border-border p-3 sm:p-4">
          <div className="text-xl sm:text-2xl font-bold text-foreground">{users.length}</div>
          <div className="text-xs sm:text-sm text-muted-foreground">{language === 'ar' ? 'إجمالي المستخدمين' : 'Total Users'}</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-3 sm:p-4">
          <div className="text-xl sm:text-2xl font-bold text-red-500">{users.filter(u => u.role === 'admin').length}</div>
          <div className="text-xs sm:text-sm text-muted-foreground">{t('admin.users.admin')}</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-3 sm:p-4">
          <div className="text-xl sm:text-2xl font-bold text-amber-500">{users.filter(u => u.role === 'moderator').length}</div>
          <div className="text-xs sm:text-sm text-muted-foreground">{t('admin.users.moderator')}</div>
        </div>
      </div>

      {isLoading ? <div className="flex items-center justify-center py-12"><div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /></div> : <UserList users={users} onEdit={handleEdit} onDelete={setDeletingUser} />}

      <UserForm user={editingUser} onSave={handleSave} onClose={() => setShowForm(false)} isSaving={isSaving} open={showForm} />

      <AlertDialog open={!!deletingUser} onOpenChange={() => setDeletingUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('common.confirmDelete')}</AlertDialogTitle>
            <AlertDialogDescription>{t('common.deleteConfirmMessage')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">{t('common.delete')}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}