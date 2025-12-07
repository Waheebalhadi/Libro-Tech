import { useState } from 'react';
import { Upload, Link, X, Image as ImageIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ImageInputProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  onUpload?: (file: File) => Promise<string | null>;
  bucket?: string;
  aspectRatio?: 'square' | 'video' | 'banner';
  accept?: string;
}

export default function ImageInput({ 
  label, 
  value, 
  onChange, 
  onUpload, 
  bucket,
  aspectRatio = 'video',
  accept = 'image/*'
}: ImageInputProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      let url: string | null = null;
      
      if (onUpload) {
        url = await onUpload(file);
      } else if (bucket) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(fileName, file);
        
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from(bucket)
          .getPublicUrl(fileName);
        
        url = publicUrl;
      }
      
      if (url) {
        onChange(url);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('حدث خطأ أثناء رفع الصورة');
    }
    setIsUploading(false);
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUrlSubmit();
    }
  };

  const heightClass = {
    square: 'h-32 w-32',
    video: 'h-48 w-full',
    banner: 'h-32 w-full',
  }[aspectRatio];

  const previewHeight = {
    square: 'h-32 w-32',
    video: 'h-48',
    banner: 'h-32',
  }[aspectRatio];

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      
      {value ? (
        <div className={`relative rounded-xl overflow-hidden border border-border ${aspectRatio === 'square' ? 'w-32' : 'w-full'}`}>
          <img 
            src={value} 
            alt="Preview"
            className={`${previewHeight} w-full object-cover`}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 left-2 p-2 bg-destructive text-white rounded-full hover:bg-destructive/90 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="upload" className="gap-2">
              <Upload className="h-4 w-4" />
              رفع ملف
            </TabsTrigger>
            <TabsTrigger value="url" className="gap-2">
              <Link className="h-4 w-4" />
              إدراج رابط
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <label className={`flex flex-col items-center justify-center ${heightClass} border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-all`}>
              {isUploading ? (
                <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              ) : (
                <>
                  <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">اضغط لرفع صورة</span>
                  <span className="text-xs text-muted-foreground/70 mt-1">PNG, JPG, WEBP</span>
                </>
              )}
              <input 
                type="file" 
                className="hidden" 
                accept={accept}
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </label>
          </TabsContent>
          
          <TabsContent value="url">
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="https://example.com/image.jpg"
                  dir="ltr"
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={handleUrlSubmit}
                  disabled={!urlInput.trim()}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  إضافة
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                أدخل رابط الصورة واضغط Enter أو زر إضافة
              </p>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
