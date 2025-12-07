import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { ArrowLeft, ArrowRight, Calendar, User, Tag, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface BlogPost {
  id: string;
  title_ar: string;
  title_en: string;
  content_ar: string | null;
  content_en: string | null;
  author: string | null;
  image_url: string | null;
  published_at: string | null;
  category_id: string | null;
  created_at: string | null;
}

interface BlogCategory {
  id: string;
  name_ar: string;
  name_en: string;
}

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [category, setCategory] = useState<BlogCategory | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const Arrow = isRTL ? ArrowRight : ArrowLeft;
  const ArrowForward = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        // Fetch the post
        const { data: postData, error: postError } = await supabase
          .from('blog')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (postError) throw postError;
        if (!postData) {
          navigate('/blog');
          return;
        }

        setPost(postData);

        // Fetch category if exists
        if (postData.category_id) {
          const { data: categoryData } = await supabase
            .from('blog_categories')
            .select('*')
            .eq('id', postData.category_id)
            .maybeSingle();

          if (categoryData) {
            setCategory(categoryData);
          }
        }

        // Fetch related posts
        const { data: relatedData } = await supabase
          .from('blog')
          .select('*')
          .neq('id', id)
          .order('published_at', { ascending: false })
          .limit(3);

        if (relatedData) {
          setRelatedPosts(relatedData);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        navigate('/blog');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: isRTL ? ar : enUS });
    } catch {
      return dateString;
    }
  };

  const estimateReadTime = (content: string | null) => {
    if (!content) return '1';
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes.toString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="h-8 w-32 bg-muted rounded mb-8 animate-pulse" />
              <div className="h-64 sm:h-96 bg-muted rounded-2xl mb-8 animate-pulse" />
              <div className="space-y-4">
                <div className="h-10 w-3/4 bg-muted rounded animate-pulse" />
                <div className="h-6 w-1/2 bg-muted rounded animate-pulse" />
                <div className="h-4 w-full bg-muted rounded animate-pulse" />
                <div className="h-4 w-full bg-muted rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) return null;

  const title = isRTL ? post.title_ar : post.title_en;
  const content = isRTL ? post.content_ar : post.content_en;
  const categoryName = category ? (isRTL ? category.name_ar : category.name_en) : null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Hero */}
        <section className="pt-32 pb-12 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className={`absolute top-20 ${isRTL ? 'right-10' : 'left-10'} w-72 h-72 rounded-full border-[30px] border-primary-foreground/10`} />
            <div className={`absolute -bottom-20 ${isRTL ? '-left-20' : '-right-20'} w-96 h-96 rounded-full border-[40px] border-primary-foreground/5`} />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Link 
                to="/blog" 
                className={`inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <Arrow className="h-4 w-4" />
                <span>{isRTL ? 'العودة للمدونة' : 'Back to Blog'}</span>
              </Link>

              {/* Category */}
              {categoryName && (
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-medium mb-4">
                  {categoryName}
                </span>
              )}

              {/* Title */}
              <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-6 leading-tight ${isRTL ? 'text-right' : 'text-left'}`}>
                {title}
              </h1>

              {/* Meta */}
              <div className={`flex flex-wrap items-center gap-4 sm:gap-6 text-primary-foreground/80 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.published_at)}</span>
                </div>
                {post.author && (
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                )}
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Clock className="h-4 w-4" />
                  <span>{isRTL ? `${estimateReadTime(content)} دقائق قراءة` : `${estimateReadTime(content)} min read`}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 sm:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Featured Image */}
              {post.image_url && (
                <div className="relative -mt-20 mb-10 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={post.image_url}
                    alt={title}
                    className="w-full h-64 sm:h-96 object-cover"
                  />
                </div>
              )}

              {/* Article Content */}
              <article className={`prose prose-lg max-w-none ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="text-foreground leading-relaxed whitespace-pre-wrap text-base sm:text-lg">
                  {content || (isRTL ? 'لا يوجد محتوى لهذا المقال.' : 'No content available for this article.')}
                </div>
              </article>

              {/* Share & Tags */}
              <div className={`mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-muted-foreground">{isRTL ? 'التصنيف:' : 'Category:'}</span>
                  {categoryName ? (
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {categoryName}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">{isRTL ? 'غير مصنف' : 'Uncategorized'}</span>
                  )}
                </div>
                <Link to="/blog">
                  <Button variant="outline" className={`${isRTL ? 'flex-row-reverse' : ''}`}>
                    {isRTL ? 'عرض جميع المقالات' : 'View All Articles'}
                    <ArrowForward className={`h-4 w-4 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-12 sm:py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className={`text-2xl sm:text-3xl font-bold text-foreground mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'مقالات ذات صلة' : 'Related Articles'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      to={`/blog/${relatedPost.id}`}
                      className="group rounded-2xl overflow-hidden bg-card border border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    >
                      <div className="relative h-40 overflow-hidden">
                        {relatedPost.image_url ? (
                          <img
                            src={relatedPost.image_url}
                            alt={isRTL ? relatedPost.title_ar : relatedPost.title_en}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                            <span className="text-4xl text-primary/30">📝</span>
                          </div>
                        )}
                      </div>
                      <div className={`p-5 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {isRTL ? relatedPost.title_ar : relatedPost.title_en}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(relatedPost.published_at)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
