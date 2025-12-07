import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, User, BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import PageHero from '@/components/ui/PageHero';

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

interface BlogCategory {
  id: string;
  name_ar: string;
  name_en: string;
}

export default function Blog() {
  const { t, isRTL } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, categoriesRes] = await Promise.all([
          supabase
            .from('blog')
            .select('*')
            .order('published_at', { ascending: false }),
          supabase
            .from('blog_categories')
            .select('*')
            .order('name_ar', { ascending: true }),
        ]);

        if (postsRes.error) throw postsRes.error;
        if (categoriesRes.error) throw categoriesRes.error;

        setPosts(postsRes.data || []);
        setCategories(categoriesRes.data || []);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPosts = selectedCategory
    ? posts.filter(post => post.category_id === selectedCategory)
    : posts;

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return null;
    const category = categories.find(c => c.id === categoryId);
    return category ? (isRTL ? category.name_ar : category.name_en) : null;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: isRTL ? ar : enUS });
    } catch {
      return dateString;
    }
  };

  const getExcerpt = (content: string | null, maxLength: number = 150) => {
    if (!content) return '';
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <PageHero
          badge={isRTL ? 'المدونة' : 'Our Blog'}
          title={t('blog.title')}
          subtitle={t('blog.subtitle')}
        />

        {/* Blog Content */}
        <section className="section-light py-20 lg:py-28" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Categories Filter */}
            {categories.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedCategory === null
                      ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg'
                      : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {isRTL ? 'الكل' : 'All'}
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg'
                        : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    {isRTL ? category.name_ar : category.name_en}
                  </button>
                ))}
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="rounded-3xl overflow-hidden bg-card border border-border animate-pulse">
                    <div className="h-56 bg-muted" />
                    <div className="p-6">
                      <div className="h-4 w-24 bg-muted rounded mb-3" />
                      <div className="h-6 w-full bg-muted rounded mb-2" />
                      <div className="h-4 w-3/4 bg-muted rounded mb-4" />
                      <div className="h-4 w-24 bg-muted rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen className="h-20 w-20 text-muted-foreground/30 mx-auto mb-6" />
                <p className="text-muted-foreground text-xl">
                  {isRTL ? 'لا توجد مقالات حالياً' : 'No articles available'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <article
                    key={post.id}
                    className={`group rounded-3xl overflow-hidden bg-card border border-border transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 animate-fade-in ${
                      index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Image */}
                    <Link to={`/blog/${post.id}`} className={`block relative overflow-hidden ${index === 0 ? 'h-72 sm:h-96' : 'h-56'}`}>
                      {post.image_url ? (
                        <img
                          src={post.image_url}
                          alt={isRTL ? post.title_ar : post.title_en}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <BookOpen className="h-16 w-16 text-primary/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
                      
                      {/* Category Badge */}
                      {getCategoryName(post.category_id) && (
                        <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
                          <span className="px-4 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-medium shadow-lg">
                            {getCategoryName(post.category_id)}
                          </span>
                        </div>
                      )}
                    </Link>

                    {/* Content */}
                    <div className={`p-6 sm:p-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {/* Meta */}
                      <div className={`flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Calendar className="h-4 w-4" />
                          {formatDate(post.published_at)}
                        </div>
                        {post.author && (
                          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <User className="h-4 w-4" />
                            {post.author}
                          </div>
                        )}
                      </div>
                      
                      {/* Title */}
                      <Link to={`/blog/${post.id}`}>
                        <h3 className={`font-bold text-foreground mb-4 line-clamp-2 group-hover:text-primary transition-colors duration-300 ${
                          index === 0 ? 'text-2xl sm:text-3xl' : 'text-xl'
                        }`}>
                          {isRTL ? post.title_ar : post.title_en}
                        </h3>
                      </Link>
                      
                      {/* Excerpt */}
                      <p className={`text-muted-foreground leading-relaxed mb-6 ${
                        index === 0 ? 'line-clamp-3' : 'line-clamp-2'
                      }`}>
                        {getExcerpt(isRTL ? post.content_ar : post.content_en, index === 0 ? 200 : 120)}
                      </p>
                      
                      {/* Read More Link */}
                      <Link 
                        to={`/blog/${post.id}`}
                        className={`inline-flex items-center text-primary font-semibold text-sm group/link ${isRTL ? 'flex-row-reverse' : ''}`}
                      >
                        {isRTL ? 'اقرأ المزيد' : 'Read More'}
                        <Arrow className={`h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-2 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
