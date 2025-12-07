import { useState, useEffect } from 'react';
import { BlogPost, useBlogCategories } from '@/hooks/useBlog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import ImageInput from '@/components/admin/shared/ImageInput';

interface BlogFormProps {
  post?: BlogPost | null;
  onSave: (data: Partial<BlogPost>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function BlogForm({ post, onSave, onCancel, isLoading }: BlogFormProps) {
  const { data: categories } = useBlogCategories();
  const [formData, setFormData] = useState({
    title_ar: '',
    title_en: '',
    content_ar: '',
    content_en: '',
    author: '',
    category_id: '',
    image_url: '',
    published_at: '',
  });
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    if (post) {
      setFormData({
        title_ar: post.title_ar || '',
        title_en: post.title_en || '',
        content_ar: post.content_ar || '',
        content_en: post.content_en || '',
        author: post.author || '',
        category_id: post.category_id || '',
        image_url: post.image_url || '',
        published_at: post.published_at || '',
      });
      setIsPublished(!!post.published_at);
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      category_id: formData.category_id || null,
      published_at: isPublished ? new Date().toISOString() : null,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post ? 'تعديل المقال' : 'إضافة مقال جديد'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title_ar">العنوان بالعربية *</Label>
              <Input
                id="title_ar"
                value={formData.title_ar}
                onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title_en">العنوان بالإنجليزية *</Label>
              <Input
                id="title_en"
                value={formData.title_en}
                onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                required
                dir="ltr"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content_ar">المحتوى بالعربية</Label>
            <Textarea
              id="content_ar"
              value={formData.content_ar}
              onChange={(e) => setFormData({ ...formData, content_ar: e.target.value })}
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content_en">المحتوى بالإنجليزية</Label>
            <Textarea
              id="content_en"
              value={formData.content_en}
              onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
              rows={6}
              dir="ltr"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author">الكاتب</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>التصنيف</Label>
              <Select
                value={formData.category_id}
                onValueChange={(value) => setFormData({ ...formData, category_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر التصنيف" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name_ar}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <ImageInput
            label="صورة المقال"
            value={formData.image_url}
            onChange={(url) => setFormData({ ...formData, image_url: url })}
            bucket="blog-assets"
          />

          <div className="flex items-center gap-3">
            <Switch
              id="published"
              checked={isPublished}
              onCheckedChange={setIsPublished}
            />
            <Label htmlFor="published">نشر المقال</Label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'جاري الحفظ...' : 'حفظ'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              إلغاء
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}