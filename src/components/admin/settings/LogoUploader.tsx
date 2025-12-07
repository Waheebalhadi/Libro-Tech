import { Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageInput from '@/components/admin/shared/ImageInput';

interface LogoUploaderProps {
  logoUrl: string | null;
  faviconUrl: string | null;
  onLogoChange: (url: string) => void;
  onFaviconChange: (url: string) => void;
  onUpload: (file: File, type: 'logo' | 'favicon') => Promise<string | null>;
}

export default function LogoUploader({ 
  logoUrl, 
  faviconUrl, 
  onLogoChange, 
  onFaviconChange,
  onUpload 
}: LogoUploaderProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-primary" />
          الشعار والأيقونة
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageInput
            label="شعار الموقع"
            value={logoUrl || ''}
            onChange={onLogoChange}
            onUpload={(file) => onUpload(file, 'logo')}
            aspectRatio="banner"
          />
          
          <ImageInput
            label="أيقونة المتصفح (Favicon)"
            value={faviconUrl || ''}
            onChange={onFaviconChange}
            onUpload={(file) => onUpload(file, 'favicon')}
            aspectRatio="square"
          />
        </div>
      </CardContent>
    </Card>
  );
}
