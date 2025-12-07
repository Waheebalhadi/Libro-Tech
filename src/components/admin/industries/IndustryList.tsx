import { Edit, Trash2, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { IndustryData } from '@/hooks/useIndustries';

interface IndustryListProps {
  industries: IndustryData[];
  onEdit: (industry: IndustryData) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

export default function IndustryList({ industries, onEdit, onDelete, isLoading }: IndustryListProps) {
  if (isLoading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-0">
              <div className="h-40 bg-muted rounded-t-xl" />
              <div className="p-4">
                <div className="h-5 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (industries.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Building2 className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          لا توجد قطاعات بعد
        </h3>
        <p className="text-muted-foreground">
          أضف أول قطاع بالضغط على زر "إضافة قطاع جديد"
        </p>
      </Card>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {industries.map((industry) => (
        <Card key={industry.id} className="group overflow-hidden hover:border-primary/50 transition-all">
          <CardContent className="p-0">
            {/* Image */}
            <div className="relative h-40 bg-muted">
              {industry.icon_url ? (
                <img 
                  src={industry.icon_url} 
                  alt={industry.name_ar}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                  <Building2 className="h-12 w-12 text-primary/40" />
                </div>
              )}
              
              {/* Actions Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onEdit(industry)}
                  className="gap-1"
                >
                  <Edit className="h-4 w-4" />
                  تعديل
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(industry.id)}
                  className="gap-1"
                >
                  <Trash2 className="h-4 w-4" />
                  حذف
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                {industry.name_ar}
              </h3>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-1" dir="ltr">
                {industry.name_en}
              </p>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {industry.description_ar || 'لا يوجد وصف'}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
