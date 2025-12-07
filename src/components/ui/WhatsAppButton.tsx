import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export default function WhatsAppButton() {
  const [whatsappNumber, setWhatsappNumber] = useState<string | null>(null);

  useEffect(() => {
    const fetchWhatsappNumber = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('whatsapp_number')
          .limit(1)
          .maybeSingle();

        if (error) throw error;
        if (data?.whatsapp_number) {
          setWhatsappNumber(data.whatsapp_number);
        }
      } catch (error) {
        console.error('Error fetching WhatsApp number:', error);
      }
    };

    fetchWhatsappNumber();
  }, []);

  if (!whatsappNumber) return null;

  // Clean number - remove spaces and special chars except +
  const cleanNumber = whatsappNumber.replace(/[^\d+]/g, '');
  const defaultMessage = encodeURIComponent('مرحباً، أريد التواصل حول خدمات Libro Tech');
  const whatsappUrl = `https://wa.me/${cleanNumber.replace('+', '')}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 animate-bounce-slow"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
