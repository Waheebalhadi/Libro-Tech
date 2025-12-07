import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filter, X } from 'lucide-react';

interface FilterPanelProps {
  filters: {
    status: string;
    dateFrom: string;
    dateTo: string;
  };
  onFiltersChange: (filters: { status: string; dateFrom: string; dateTo: string }) => void;
  onReset: () => void;
}

export default function FilterPanel({ filters, onFiltersChange, onReset }: FilterPanelProps) {
  const hasFilters = filters.status !== 'all' || filters.dateFrom || filters.dateTo;

  return (
    <Card>
      <CardContent className="py-4">
        <div className="flex items-end gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">تصفية</span>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">الحالة</Label>
            <Select
              value={filters.status}
              onValueChange={(value) => onFiltersChange({ ...filters, status: value })}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="new">جديد</SelectItem>
                <SelectItem value="read">مقروء</SelectItem>
                <SelectItem value="replied">تم الرد</SelectItem>
                <SelectItem value="archived">مؤرشف</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">من تاريخ</Label>
            <Input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => onFiltersChange({ ...filters, dateFrom: e.target.value })}
              className="w-40"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">إلى تاريخ</Label>
            <Input
              type="date"
              value={filters.dateTo}
              onChange={(e) => onFiltersChange({ ...filters, dateTo: e.target.value })}
              className="w-40"
            />
          </div>

          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={onReset}>
              <X className="h-4 w-4 ml-1" />
              إزالة الفلاتر
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}