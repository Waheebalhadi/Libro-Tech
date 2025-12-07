import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import MessageList from '@/components/admin/messages/MessageList';
import MessageDetails from '@/components/admin/messages/MessageDetails';
import FilterPanel from '@/components/admin/messages/FilterPanel';
import { ContactMessage, useContactMessages, useDeleteMessage } from '@/hooks/useContactMessages';

export default function AdminMessages() {
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filters, setFilters] = useState({
    status: 'all',
    dateFrom: '',
    dateTo: '',
  });

  const { data: messages, isLoading } = useContactMessages(
    filters.status !== 'all' || filters.dateFrom || filters.dateTo
      ? {
          status: filters.status !== 'all' ? filters.status : undefined,
          dateFrom: filters.dateFrom || undefined,
          dateTo: filters.dateTo || undefined,
        }
      : undefined
  );
  const deleteMessage = useDeleteMessage();

  const newMessagesCount = messages?.filter((m) => m.status === 'new').length || 0;

  const handleResetFilters = () => {
    setFilters({ status: 'all', dateFrom: '', dateTo: '' });
  };

  if (selectedMessage) {
    return (
      <MessageDetails
        message={selectedMessage}
        onBack={() => setSelectedMessage(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">رسائل التواصل</h1>
            {newMessagesCount > 0 && (
              <Badge variant="destructive">{newMessagesCount} جديدة</Badge>
            )}
          </div>
          <p className="text-muted-foreground">
            إدارة الرسائل الواردة من نموذج الاتصال
          </p>
        </div>
      </div>

      <FilterPanel
        filters={filters}
        onFiltersChange={setFilters}
        onReset={handleResetFilters}
      />

      {isLoading ? (
        <p className="text-center text-muted-foreground py-8">جاري التحميل...</p>
      ) : (
        <MessageList
          messages={messages || []}
          onView={setSelectedMessage}
          onDelete={(id) => deleteMessage.mutate(id)}
        />
      )}
    </div>
  );
}