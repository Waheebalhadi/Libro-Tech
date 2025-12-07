import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import SectionTitle from '@/components/ui/SectionTitle';

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
}

export default function BlogSection() {
  const { t, isRTL } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog')
          .select('*')
          .order('published_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'dd MMM yyyy', { locale: isRTL ? ar : enUS });
    } catch {
      return dateString;
    }
  };

  const getExcerpt = (content: string | null, maxLength: number = 100) => {
    if (!content) return '';
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  if (isLoading) {
    return (
      <section className="section-muted py-16 sm:py-20 lg:py-24" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-col md:flex-row items-center justify-between mb-12 gap-6 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <div className="h-8 w-24 bg-muted rounded-full mb-4 animate-pulse" />
              <div className="h-10 w-48 bg-muted rounded animate-pulse" />
            </div>
            <div className="h-10 w-32 bg-muted rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-card border border-border animate-pulse">
                <div className="h-48 bg-muted" />
                <div className="p-6">
                  <div className="h-4 w-24 bg-muted rounded mb-3" />
                  <div className="h-6 w-full bg-muted rounded mb-2" />
                  <div className="h-4 w-3/4 bg-muted rounded mb-4" />
                  <div className="h-4 w-24 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) return null;

  return (
    <section className="section-muted py-16 sm:py-20 lg:py-24" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row items-center justify-between mb-12 gap-6 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              {t('blog.title')}
            </span>
            <SectionTitle
              darkText={isRTL ? 'أحدث' : 'Latest'}
              highlightText={isRTL ? 'المقالات' : 'Articles'}
              darkTextEnd={isRTL ? 'والأخبار' : '& News'}
            />
          </div>
          <Link to="/blog">
            <Button variant="outline" className={`border-primary text-primary hover:bg-primary hover:text-primary-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
              {t('common.viewAll')}
              <Arrow className={`h-4 w-4 ${isRTL ? 'mr-2' : 'ml-2'}`} />
            </Button>
          </Link>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group rounded-2xl overflow-hidden bg-card border border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image */}
              <Link to={`/blog/${post.id}`} className="block relative h-48 overflow-hidden">
                {post.image_url ? (
                  <img
                    src={post.image_url}
                    alt={isRTL ? post.title_ar : post.title_en}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-4xl text-primary/30">📝</span>
                  </div>
                )}
              </Link>

              {/* Content */}
              <div className={`p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                {/* Date */}
                <div className={`flex items-center gap-2 text-sm text-muted-foreground mb-3 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.published_at)}
                </div>
                
                {/* Title */}
                <Link to={`/blog/${post.id}`}>
                  <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {isRTL ? post.title_ar : post.title_en}
                  </h3>
                </Link>
                
                {/* Excerpt */}
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {getExcerpt(isRTL ? post.content_ar : post.content_en)}
                </p>
                
                {/* Read More Link */}
                <Link 
                  to={`/blog/${post.id}`}
                  className={`inline-flex items-center text-primary font-medium text-sm hover:gap-2 transition-all gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  {isRTL ? 'اقرأ المزيد' : 'Read More'}
                  <Arrow className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
