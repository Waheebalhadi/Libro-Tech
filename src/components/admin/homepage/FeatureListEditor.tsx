import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layers } from 'lucide-react';
import { HomepageData } from '@/hooks/useHomepage';

interface FeatureListEditorProps {
  data: HomepageData | null;
  onChange: (updates: Partial<HomepageData>) => void;
}

export default function FeatureListEditor({ data, onChange }: FeatureListEditorProps) {
  const pillars = [
    { 
      num: 1, 
      titleKey: 'pillar1_title' as keyof HomepageData, 
      descKey: 'pillar1_desc' as keyof HomepageData,
      label: 'الركيزة الأولى'
    },
    { 
      num: 2, 
      titleKey: 'pillar2_title' as keyof HomepageData, 
      descKey: 'pillar2_desc' as keyof HomepageData,
      label: 'الركيزة الثانية'
    },
    { 
      num: 3, 
      titleKey: 'pillar3_title' as keyof HomepageData, 
      descKey: 'pillar3_desc' as keyof HomepageData,
      label: 'الركيزة الثالثة'
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" />
          الركائز الأساسية
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pillar1" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {pillars.map((pillar) => (
              <TabsTrigger key={pillar.num} value={`pillar${pillar.num}`}>
                {pillar.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {pillars.map((pillar) => (
            <TabsContent key={pillar.num} value={`pillar${pillar.num}`} className="space-y-4 mt-4">
              <div className="p-4 bg-muted/50 rounded-xl space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <span className="text-primary font-bold">{pillar.num}</span>
                  </div>
                  <h3 className="font-semibold text-foreground">{pillar.label}</h3>
                </div>

                <div className="space-y-2">
                  <Label>العنوان</Label>
                  <Input
                    value={(data?.[pillar.titleKey] as string) || ''}
                    onChange={(e) => onChange({ [pillar.titleKey]: e.target.value })}
                    placeholder={`عنوان ${pillar.label}`}
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label>الوصف</Label>
                  <Textarea
                    value={(data?.[pillar.descKey] as string) || ''}
                    onChange={(e) => onChange({ [pillar.descKey]: e.target.value })}
                    placeholder={`وصف ${pillar.label}`}
                    rows={3}
                    dir="rtl"
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
