import { useState } from 'react';
import { BlogCategory, useBlogCategories, useCreateBlogCategory, useUpdateBlogCategory, useDeleteBlogCategory } from '@/hooks/useBlog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function CategoryManager() {
  const { data: categories, isLoading } = useBlogCategories();
  const createCategory = useCreateBlogCategory();
  const updateCategory = useUpdateBlogCategory();
  const deleteCategory = useDeleteBlogCategory();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name_ar: '', name_en: '' });

  const handleAdd = () => {
    if (formData.name_ar && formData.name_en) {
      createCategory.mutate(formData, {
        onSuccess: () => {
          setIsAdding(false);
          setFormData({ name_ar: '', name_en: '' });
        },
      });
    }
  };

  const handleUpdate = (id: string) => {
    if (formData.name_ar && formData.name_en) {
      updateCategory.mutate({ id, ...formData }, {
        onSuccess: () => {
          setEditingId(null);
          setFormData({ name_ar: '', name_en: '' });
        },
      });
    }
  };

  const startEdit = (category: BlogCategory) => {
    setEditingId(category.id);
    setFormData({ name_ar: category.name_ar, name_en: category.name_en });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({ name_ar: '', name_en: '' });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>إدارة التصنيفات</CardTitle>
        {!isAdding && (
          <Button size="sm" onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4 ml-2" />
            إضافة تصنيف
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {isAdding && (
          <div className="flex gap-2 items-end p-3 bg-muted rounded-lg">
            <div className="flex-1">
              <Input
                placeholder="الاسم بالعربية"
                value={formData.name_ar}
                onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
              />
            </div>
            <div className="flex-1">
              <Input
                placeholder="الاسم بالإنجليزية"
                value={formData.name_en}
                onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                dir="ltr"
              />
            </div>
            <Button size="icon" onClick={handleAdd} disabled={createCategory.isPending}>
              <Check className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={cancelEdit}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {isLoading ? (
          <p className="text-muted-foreground text-center py-4">جاري التحميل...</p>
        ) : categories?.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">لا توجد تصنيفات</p>
        ) : (
          categories?.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
            >
              {editingId === category.id ? (
                <div className="flex gap-2 flex-1 items-center">
                  <Input
                    value={formData.name_ar}
                    onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                    className="flex-1"
                  />
                  <Input
                    value={formData.name_en}
                    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    className="flex-1"
                    dir="ltr"
                  />
                  <Button
                    size="icon"
                    onClick={() => handleUpdate(category.id)}
                    disabled={updateCategory.isPending}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={cancelEdit}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{category.name_ar}</Badge>
                    <span className="text-muted-foreground text-sm">{category.name_en}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => startEdit(category)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="icon" variant="ghost" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>حذف التصنيف</AlertDialogTitle>
                          <AlertDialogDescription>
                            هل أنت متأكد من حذف هذا التصنيف؟
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>إلغاء</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteCategory.mutate(category.id)}
                          >
                            حذف
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}