import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, FileText, FolderOpen } from 'lucide-react';
import BlogList from '@/components/admin/blog/BlogList';
import BlogForm from '@/components/admin/blog/BlogForm';
import CategoryManager from '@/components/admin/blog/CategoryManager';
import {
  BlogPost,
  useBlogPosts,
  useCreateBlogPost,
  useUpdateBlogPost,
  useDeleteBlogPost,
} from '@/hooks/useBlog';

export default function AdminBlog() {
  const { data: posts, isLoading } = useBlogPosts();
  const createPost = useCreateBlogPost();
  const updatePost = useUpdateBlogPost();
  const deletePost = useDeleteBlogPost();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsFormOpen(true);
  };

  const handleSave = (data: Partial<BlogPost>) => {
    if (editingPost) {
      updatePost.mutate(
        { id: editingPost.id, ...data },
        {
          onSuccess: () => {
            setIsFormOpen(false);
            setEditingPost(null);
          },
        }
      );
    } else {
      createPost.mutate(data as any, {
        onSuccess: () => {
          setIsFormOpen(false);
        },
      });
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingPost(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">إدارة المدونة</h1>
          <p className="text-muted-foreground">إضافة وتحرير المقالات والتصنيفات</p>
        </div>
        {!isFormOpen && (
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4 ml-2" />
            مقال جديد
          </Button>
        )}
      </div>

      {isFormOpen ? (
        <BlogForm
          post={editingPost}
          onSave={handleSave}
          onCancel={handleCancel}
          isLoading={createPost.isPending || updatePost.isPending}
        />
      ) : (
        <Tabs defaultValue="posts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="posts" className="gap-2">
              <FileText className="h-4 w-4" />
              المقالات
            </TabsTrigger>
            <TabsTrigger value="categories" className="gap-2">
              <FolderOpen className="h-4 w-4" />
              التصنيفات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            {isLoading ? (
              <p className="text-center text-muted-foreground py-8">جاري التحميل...</p>
            ) : (
              <BlogList
                posts={posts || []}
                onEdit={handleEdit}
                onDelete={(id) => deletePost.mutate(id)}
              />
            )}
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManager />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}