import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import SectionTitle from '@/components/ui/SectionTitle';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

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
          .limit(6);

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
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: isRTL ? ar : enUS });
    } catch {
      return dateString;
    }
  };

  const getExcerpt = (content: string | null, maxLength: number = 120) => {
    if (!content) return '';
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  if (isLoading) {
    return (
      <section className="bg-gradient-to-b from-background to-muted/30 py-16 sm:py-20 lg:py-24" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-col items-center text-center mb-12`}>
            <div className="h-8 w-24 bg-muted rounded-full mb-4 animate-pulse" />
            <div className="h-10 w-64 bg-muted rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-card border border-border animate-pulse">
                <div className="h-52 bg-muted" />
                <div className="p-6">
                  <div className="h-4 w-24 bg-muted rounded mb-3" />
                  <div className="h-6 w-full bg-muted rounded mb-2" />
                  <div className="h-4 w-3/4 bg-muted rounded mb-4" />
                  <div className="h-10 w-28 bg-muted rounded-lg" />
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
    <section className="bg-gradient-to-b from-background to-muted/30 py-16 sm:py-20 lg:py-24 overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            {t('blog.title')}
          </span>
          <SectionTitle
            darkText={isRTL ? 'أحدث' : 'Latest'}
            highlightText={isRTL ? 'المقالات' : 'Articles'}
            darkTextEnd={isRTL ? 'والأخبار' : '& News'}
          />
          <p className="mt-4 text-muted-foreground max-w-2xl">
            {isRTL 
              ? 'تابع أحدث الأخبار والمقالات في عالم التقنية والأعمال'
              : 'Stay updated with the latest news and articles in technology and business'
            }
          </p>
        </div>

        {/* Blog Carousel */}
        <Carousel
          opts={{
            align: 'start',
            loop: true,
            direction: isRTL ? 'rtl' : 'ltr',
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {posts.map((post) => (
              <CarouselItem key={post.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <article
                  className="group h-full rounded-2xl overflow-hidden bg-card border border-border transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
                >
                  {/* Image */}
                  <Link to={`/blog/${post.id}`} className="block relative h-52 overflow-hidden">
                    {post.image_url ? (
                      <img
                        src={post.image_url}
                        alt={isRTL ? post.title_ar : post.title_en}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center">
                        <span className="text-5xl opacity-50">📝</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>

                  {/* Content */}
                  <div className={`p-6 flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}>
                    {/* Date */}
                    <div className={`flex items-center gap-2 text-xs text-muted-foreground mb-3 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{formatDate(post.published_at)}</span>
                    </div>
                    
                    {/* Title */}
                    <Link to={`/blog/${post.id}`}>
                      <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-relaxed">
                        {isRTL ? post.title_ar : post.title_en}
                      </h3>
                    </Link>
                    
                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-5 leading-relaxed flex-grow">
                      {getExcerpt(isRTL ? post.content_ar : post.content_en)}
                    </p>
                    
                    {/* Read More Button */}
                    <Link to={`/blog/${post.id}`}>
                      <Button 
                        variant="default"
                        size="sm"
                        className={`bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}
                      >
                        {isRTL ? 'اقرأ المزيد' : 'Read More'}
                        <Arrow className={`h-4 w-4 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                      </Button>
                    </Link>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <CarouselPrevious className="relative static translate-y-0 h-12 w-12 rounded-full border-2 border-primary/20 bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300" />
            <Link to="/blog">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6">
                {t('common.viewAll')}
              </Button>
            </Link>
            <CarouselNext className="relative static translate-y-0 h-12 w-12 rounded-full border-2 border-primary/20 bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
