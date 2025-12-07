import { ContactMessage } from '@/hooks/useContactMessages';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Trash2, Mail, Phone, Calendar } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface MessageListProps {
  messages: ContactMessage[];
  onView: (message: ContactMessage) => void;
  onDelete: (id: string) => void;
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

export default function MessageList({ messages, onView, onDelete }: MessageListProps) {
  const formatDate = (date: string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (messages.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          لا توجد رسائل
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((message) => (
        <Card
          key={message.id}
          className={`cursor-pointer transition-colors hover:bg-muted/50 ${
            message.status === 'new' ? 'border-primary/50' : ''
          }`}
          onClick={() => onView(message)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold">{message.full_name}</h3>
                  <Badge className={statusColors[message.status || 'new']}>
                    {statusLabels[message.status || 'new']}
                  </Badge>
                  {message.project_type && (
                    <Badge variant="outline">{message.project_type}</Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <span className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {message.email}
                  </span>
                  {message.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {message.phone}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(message.created_at)}
                  </span>
                </div>
                {message.message && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {message.message}
                  </p>
                )}
              </div>
              <div className="flex gap-2 mr-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onView(message);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                    <AlertDialogHeader>
                      <AlertDialogTitle>حذف الرسالة</AlertDialogTitle>
                      <AlertDialogDescription>
                        هل أنت متأكد من حذف هذه الرسالة؟
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>إلغاء</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(message.id)}>
                        حذف
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}