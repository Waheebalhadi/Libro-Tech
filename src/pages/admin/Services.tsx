import { useState } from 'react';
import { Plus, RefreshCw, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useServices, ServiceData } from '@/hooks/useServices';
import { useLanguage } from '@/contexts/LanguageContext';
import ServiceList from '@/components/admin/services/ServiceList';
import ServiceForm from '@/components/admin/services/ServiceForm';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function AdminServices() {
  const { services, isLoading, isSaving, createService, updateService, deleteService, uploadIcon, refetch } = useServices();
  const { t, language } = useLanguage();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceData | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingService(null);
    setIsFormOpen(true);
  };

  const handleEdit = (service: ServiceData) => {
    setEditingService(service);
    setIsFormOpen(true);
  };

  const handleSave = async (data: Omit<ServiceData, 'id' | 'created_at' | 'updated_at'>) => {
    if (editingService) {
      const success = await updateService(editingService.id, data);
      if (success) {
        setIsFormOpen(false);
        setEditingService(null);
      }
    } else {
      const result = await createService(data);
      if (result) {
        setIsFormOpen(false);
      }
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteService(deleteId);
    setDeleteId(null);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 sm:h-12 sm:w-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">{t('admin.services.title')}</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              {services.length} {language === 'ar' ? 'خدمة' : 'services'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="outline" onClick={refetch} disabled={isLoading} size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button onClick={handleAdd} className="gap-2" size="sm">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">{t('admin.services.add')}</span>
          </Button>
        </div>
      </div>

      <ServiceList services={services} onEdit={handleEdit} onDelete={(id) => setDeleteId(id)} isLoading={isLoading} />

      <ServiceForm 
        service={editingService} 
        onSave={handleSave} 
        onClose={() => { setIsFormOpen(false); setEditingService(null); }} 
        onUploadIcon={uploadIcon} 
        isSaving={isSaving}
        open={isFormOpen}
      />

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