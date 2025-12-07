import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import SectionTitle from '@/components/ui/SectionTitle';
interface SiteSettings {
  company_email: string | null;
  company_phone: string | null;
  company_address_ar: string | null;
  company_address_en: string | null;
}
export default function ContactSection() {
  const {
    t,
    isRTL
  } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    project_type: '',
    message: ''
  });
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const {
          data,
          error
        } = await supabase.from('site_settings').select('company_email, company_phone, company_address_ar, company_address_en').limit(1).maybeSingle();
        if (error) throw error;
        setSettings(data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const {
        error
      } = await supabase.from('contact_messages').insert({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone || null,
        project_type: formData.project_type || null,
        message: formData.message || null,
        status: 'new'
      });
      if (error) throw error;
      toast({
        title: isRTL ? 'تم إرسال رسالتك بنجاح!' : 'Message sent successfully!',
        description: isRTL ? 'سنتواصل معك في أقرب وقت.' : 'We will contact you soon.'
      });
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        project_type: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: isRTL ? 'حدث خطأ' : 'Error occurred',
        description: isRTL ? 'فشل في إرسال الرسالة. حاول مرة أخرى.' : 'Failed to send message. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get contact info from settings or use defaults
  const companyAddress = isRTL ? settings?.company_address_ar || 'الرياض، المملكة العربية السعودية' : settings?.company_address_en || 'Riyadh, Saudi Arabia';
  const companyPhone = settings?.company_phone || '+966 50 000 0000';
  const companyEmail = settings?.company_email || 'info@librotech.sa';
  const contactInfo = [{
    icon: MapPin,
    label: t('contact.info.address'),
    value: companyAddress
  }, {
    icon: Phone,
    label: t('contact.info.phone'),
    value: companyPhone,
    href: `tel:${companyPhone.replace(/\s/g, '')}`
  }, {
    icon: Mail,
    label: t('contact.info.email'),
    value: companyEmail,
    href: `mailto:${companyEmail}`
  }];
  return <section className="section-light py-20 lg:py-28" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            
            {t('contact.title')}
          </span>
          <SectionTitle darkText={isRTL ? 'تواصل' : 'Get in'} highlightText={isRTL ? 'معنا' : 'Touch'} className="mb-4" />
          <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">
            {isRTL ? 'تواصل معنا وسنرد عليك في أقرب وقت ممكن' : 'Contact us and we will get back to you as soon as possible'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-card rounded-3xl p-8 md:p-10 border border-border shadow-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                <MessageCircle className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                {isRTL ? 'أرسل رسالة' : 'Send a Message'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input name="full_name" value={formData.full_name} onChange={handleChange} placeholder={t('contact.form.name')} className="bg-muted/30 border-border focus:border-primary focus:ring-primary/20 rounded-xl py-6" required />
                <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t('contact.form.email')} className="bg-muted/30 border-border focus:border-primary focus:ring-primary/20 rounded-xl py-6" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder={t('contact.form.phone')} className="bg-muted/30 border-border focus:border-primary focus:ring-primary/20 rounded-xl py-6" />
                <Input name="project_type" value={formData.project_type} onChange={handleChange} placeholder={t('contact.form.company')} className="bg-muted/30 border-border focus:border-primary focus:ring-primary/20 rounded-xl py-6" />
              </div>
              <Textarea name="message" value={formData.message} onChange={handleChange} placeholder={t('contact.form.message')} className="bg-muted/30 border-border focus:border-primary focus:ring-primary/20 min-h-[140px] rounded-xl resize-none" required />
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground py-6 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300" disabled={isLoading}>
                {isLoading ? <div className="w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <>
                    <Send className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {t('contact.form.submit')}
                  </>}
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            {contactInfo.map((info, index) => <div key={index} className={`flex items-center gap-5 p-6 rounded-2xl bg-card border border-border transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 animate-fade-in ${isRTL ? 'flex-row' : ''}`} style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <info.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1 text-base">{info.label}</h4>
                  {info.href ? <a href={info.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      {info.value}
                    </a> : <p className="text-muted-foreground text-sm">{info.value}</p>}
                </div>
              </div>)}
            
            <div className="h-56 rounded-2xl overflow-hidden border border-border shadow-lg">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d463878.0275519749!2d46.54239!3d24.7135517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh!5e0!3m2!1sen!2ssa!4v1699900000000!5m2!1sen!2ssa" width="100%" height="100%" style={{
              border: 0
            }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Location Map" />
            </div>
          </div>
        </div>
      </div>
    </section>;
}