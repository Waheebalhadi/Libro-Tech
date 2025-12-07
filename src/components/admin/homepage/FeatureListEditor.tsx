import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layers } from 'lucide-react';
import { HomepageData } from '@/hooks/useHomepage';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface FeatureListEditorProps {
  data: HomepageData | null;
  onChange: (updates: Partial<HomepageData>) => void;
}

export default function FeatureListEditor({ data, onChange }: FeatureListEditorProps) {
  const { isRTL, t } = useLanguage();
  
  const pillars = [
    { 
      num: 1, 
      titleKey: 'pillar1_title' as keyof HomepageData, 
      descKey: 'pillar1_desc' as keyof HomepageData,
    },
    { 
      num: 2, 
      titleKey: 'pillar2_title' as keyof HomepageData, 
      descKey: 'pillar2_desc' as keyof HomepageData,
    },
    { 
      num: 3, 
      titleKey: 'pillar3_title' as keyof HomepageData, 
      descKey: 'pillar3_desc' as keyof HomepageData,
    },
  ];

  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border/50">
        <CardTitle className={cn("flex items-center gap-2", isRTL ? "flex-row-reverse" : "")}>
          <Layers className="h-5 w-5 text-primary" />
          {t('admin.homepage.pillars')}
        </CardTitle>
      </CardHeader>
      <CardContent className={cn("p-6", isRTL ? "text-right" : "text-left")}>
        <Tabs defaultValue="pillar1" className="w-full">
          <TabsList className={cn("grid w-full grid-cols-3", isRTL ? "flex-row-reverse" : "")}>
            {pillars.map((pillar) => (
              <TabsTrigger 
                key={pillar.num} 
                value={`pillar${pillar.num}`}
                className={cn(isRTL ? "text-right" : "text-left")}
              >
                {t('admin.homepage.pillar')} {pillar.num}
              </TabsTrigger>
            ))}
          </TabsList>

          {pillars.map((pillar) => (
            <TabsContent 
              key={pillar.num} 
              value={`pillar${pillar.num}`} 
              className={cn("space-y-4 mt-4", isRTL ? "text-right" : "text-left")}
            >
              <div className={cn("p-4 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl space-y-4 border border-border/50", isRTL ? "text-right" : "text-left")}>
                <div className={cn("flex items-center gap-3 mb-4", isRTL ? "flex-row-reverse" : "")}>
                  <div className="h-10 w-10 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center border border-primary/20 shadow-sm">
                    <span className="text-primary font-bold">{pillar.num}</span>
                  </div>
                  <h3 className={cn("font-semibold text-foreground", isRTL ? "text-right" : "text-left")}>
                    {t('admin.homepage.pillar')} {pillar.num}
                  </h3>
                </div>

                <div className={cn("space-y-2", isRTL ? "text-right" : "text-left")}>
                  <Label className={cn(isRTL ? "text-right" : "text-left")}>
                    {t('admin.homepage.pillarTitle')}
                  </Label>
                  <Input
                    value={(data?.[pillar.titleKey] as string) || ''}
                    onChange={(e) => onChange({ [pillar.titleKey]: e.target.value })}
                    placeholder={isRTL ? `عنوان ${t('admin.homepage.pillar')} ${pillar.num}` : `Title for ${t('admin.homepage.pillar')} ${pillar.num}`}
                    dir={isRTL ? "rtl" : "ltr"}
                    className={cn("w-full", isRTL ? "text-right" : "text-left")}
                  />
                </div>

                <div className={cn("space-y-2", isRTL ? "text-right" : "text-left")}>
                  <Label className={cn(isRTL ? "text-right" : "text-left")}>
                    {t('admin.homepage.pillarDesc')}
                  </Label>
                  <Textarea
                    value={(data?.[pillar.descKey] as string) || ''}
                    onChange={(e) => onChange({ [pillar.descKey]: e.target.value })}
                    placeholder={isRTL ? `وصف ${t('admin.homepage.pillar')} ${pillar.num}` : `Description for ${t('admin.homepage.pillar')} ${pillar.num}`}
                    rows={3}
                    dir={isRTL ? "rtl" : "ltr"}
                    className={cn("w-full", isRTL ? "text-right" : "text-left")}
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
