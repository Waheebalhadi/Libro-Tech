import { Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ServiceData } from '@/hooks/useServices';

interface ServiceListProps {
  services: ServiceData[];
  onEdit: (service: ServiceData) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

export default function ServiceList({ services, onEdit, onDelete, isLoading }: ServiceListProps) {
  if (isLoading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-12 w-12 bg-muted rounded-xl mb-4" />
              <div className="h-4 bg-muted rounded w-3/4 mb-2" />
              <div className="h-3 bg-muted rounded w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <ImageIcon className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          لا توجد خدمات بعد
        </h3>
        <p className="text-muted-foreground">
          أضف أول خدمة بالضغط على زر "إضافة خدمة جديدة"
        </p>
      </Card>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service) => (
        <Card key={service.id} className="group hover:border-primary/50 transition-all">
          <CardContent className="p-6">
            {/* Icon */}
            <div className="flex items-start justify-between mb-4">
              {service.icon_url ? (
                <img 
                  src={service.icon_url} 
                  alt={service.name_ar}
                  className="h-12 w-12 rounded-xl object-cover"
                />
              ) : (
                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <ImageIcon className="h-6 w-6 text-primary" />
                </div>
              )}
              
              {/* Actions */}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(service)}
                  className="h-8 w-8 text-muted-foreground hover:text-primary"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(service.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
              {service.name_ar}
            </h3>
            <p className="text-xs text-muted-foreground mb-2 line-clamp-1" dir="ltr">
              {service.name_en}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {service.description_ar || 'لا يوجد وصف'}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
