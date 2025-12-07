import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export default function FaviconUpdater() {
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null);

  useEffect(() => {
    const updateFavicon = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('favicon_url')
          .limit(1)
          .maybeSingle();

        if (error) throw error;

        if (data?.favicon_url && data.favicon_url !== faviconUrl) {
          setFaviconUrl(data.favicon_url);

          // Remove existing favicon links
          const existingLinks = document.querySelectorAll('link[rel*="icon"], link[rel*="apple-touch-icon"]');
          existingLinks.forEach(link => link.remove());

          // Create new favicon link
          const link = document.createElement('link');
          link.id = 'favicon';
          link.rel = 'icon';
          link.type = 'image/x-icon';
          link.href = data.favicon_url;
          document.head.appendChild(link);

          // Also add apple-touch-icon for better mobile support
          const appleLink = document.createElement('link');
          appleLink.rel = 'apple-touch-icon';
          appleLink.href = data.favicon_url;
          document.head.appendChild(appleLink);

          // Force browser to reload favicon
          const faviconElement = document.getElementById('favicon') as HTMLLinkElement;
          if (faviconElement) {
            faviconElement.href = data.favicon_url + '?t=' + Date.now();
          }
        }
      } catch (error) {
        console.error('Error updating favicon:', error);
      }
    };

    updateFavicon();
    
    // Update favicon when settings change (polling every 10 seconds)
    const interval = setInterval(updateFavicon, 10000);
    
    return () => clearInterval(interval);
  }, [faviconUrl]);

  return null;
}

