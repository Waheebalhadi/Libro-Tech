-- Add WhatsApp number field to site_settings table
ALTER TABLE public.site_settings 
ADD COLUMN whatsapp_number text;