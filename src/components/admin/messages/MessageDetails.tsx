import { ContactMessage, useUpdateMessageStatus } from '@/hooks/useContactMessages';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Calendar, User, Briefcase, ArrowRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect } from 'react';

interface MessageDetailsProps {
  message: ContactMessage;
  onBack: () => void;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  read: 'bg-gray-100 text-gray-800',
  replied: 'bg-green-100 text-green-800',
  archived: 'bg-yellow-100 text-yellow-800',
};

const statusLabels: Record<string, string> = {
  new: 'جديد',
  read: 'مقروء',
  replied: 'تم الرد',
  archived: 'مؤرشف',
};

export default function MessageDetails({ message, onBack }: MessageDetailsProps) {
  const updateStatus = useUpdateMessageStatus();

  // Mark as read when viewed
  useEffect(() => {
    if (message.status === 'new') {
      updateStatus.mutate({ id: message.id, status: 'read' });
    }
  }, [message.id]);

  const formatDate = (date: string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleStatusChange = (status: string) => {
    updateStatus.mutate({ id: message.id, status });
  };

  return (
    <div className="space-y-4">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowRight className="h-4 w-4" />
        العودة للرسائل
      </Button>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <User className="h-5 w-5" />
            {message.full_name}
          </CardTitle>
          <div className="flex items-center gap-3">
            <Select
              value={message.status || 'new'}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">جديد</SelectItem>
                <SelectItem value="read">مقروء</SelectItem>
                <SelectItem value="replied">تم الرد</SelectItem>
                <SelectItem value="archived">مؤرشف</SelectItem>
              </SelectContent>
            </Select>
            <Badge className={statusColors[message.status || 'new']}>
              {statusLabels[message.status || 'new']}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">البريد الإلكتروني</p>
                <a
                  href={`mailto:${message.email}`}
                  className="font-medium hover:text-primary"
                >
                  {message.email}
                </a>
              </div>
            </div>
            {message.phone && (
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">رقم الهاتف</p>
                  <a
                    href={`tel:${message.phone}`}
                    className="font-medium hover:text-primary"
                  >
                    {message.phone}
                  </a>
                </div>
              </div>
            )}
            {message.project_type && (
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Briefcase className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">نوع المشروع</p>
                  <p className="font-medium">{message.project_type}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">تاريخ الإرسال</p>
                <p className="font-medium">{formatDate(message.created_at)}</p>
              </div>
            </div>
          </div>

          {message.message && (
            <div className="space-y-2">
              <h4 className="font-semibold">الرسالة</h4>
              <div className="p-4 bg-muted rounded-lg whitespace-pre-wrap">
                {message.message}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t">
            <Button asChild>
              <a href={`mailto:${message.email}`}>
                <Mail className="h-4 w-4 ml-2" />
                إرسال رد بالبريد
              </a>
            </Button>
            {message.phone && (
              <Button variant="outline" asChild>
                <a href={`tel:${message.phone}`}>
                  <Phone className="h-4 w-4 ml-2" />
                  اتصال
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}