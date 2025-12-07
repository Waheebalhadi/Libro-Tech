import { useState } from 'react';
import { Plus, RefreshCw, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIndustries, IndustryData } from '@/hooks/useIndustries';
import { useLanguage } from '@/contexts/LanguageContext';
import IndustryList from '@/components/admin/industries/IndustryList';
import IndustryForm from '@/components/admin/industries/IndustryForm';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export default function AdminIndustries() {
  const { industries, isLoading, isSaving, createIndustry, updateIndustry, deleteIndustry, uploadMedia, refetch } = useIndustries();
  const { t, language } = useLanguage();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIndustry, setEditingIndustry] = useState<IndustryData | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAdd = () => { setEditingIndustry(null); setIsFormOpen(true); };
  const handleEdit = (industry: IndustryData) => { setEditingIndustry(industry); setIsFormOpen(true); };
  const handleSave = async (data: Omit<IndustryData, 'id' | 'created_at' | 'updated_at'>) => {
    if (editingIndustry) {
      const success = await updateIndustry(editingIndustry.id, data);
      if (success) { setIsFormOpen(false); setEditingIndustry(null); }
    } else {
      const result = await createIndustry(data);
      if (result) setIsFormOpen(false);
    }
  };
  const handleDelete = async () => { if (!deleteId) return; await deleteIndustry(deleteId); setDeleteId(null); };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 sm:h-12 sm:w-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">{t('admin.industries.title')}</h1>
            <p className="text-muted-foreground text-sm sm:text-base">{industries.length} {language === 'ar' ? 'قطاع' : 'industries'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="outline" onClick={refetch} disabled={isLoading} size="sm"><RefreshCw className="h-4 w-4" /></Button>
          <Button onClick={handleAdd} className="gap-2" size="sm"><Plus className="h-4 w-4" /><span className="hidden sm:inline">{t('admin.industries.add')}</span></Button>
        </div>
      </div>

      <IndustryList industries={industries} onEdit={handleEdit} onDelete={(id) => setDeleteId(id)} isLoading={isLoading} />

      <IndustryForm industry={editingIndustry} onSave={handleSave} onClose={() => { setIsFormOpen(false); setEditingIndustry(null); }} onUploadMedia={uploadMedia} isSaving={isSaving} open={isFormOpen} />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
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