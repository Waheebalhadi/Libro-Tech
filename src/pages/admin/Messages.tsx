import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import MessageList from '@/components/admin/messages/MessageList';
import MessageDetails from '@/components/admin/messages/MessageDetails';
import FilterPanel from '@/components/admin/messages/FilterPanel';
import { ContactMessage, useContactMessages, useDeleteMessage } from '@/hooks/useContactMessages';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export default function AdminMessages() {
  const { t, isRTL } = useLanguage();
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
    <div className={cn("space-y-6", isRTL ? "text-right" : "text-left")}>
      <div className={cn("flex items-center justify-between", isRTL ? "flex-row-reverse" : "")}>
        <div className={cn(isRTL ? "text-right" : "text-left")}>
          <div className={cn("flex items-center gap-3", isRTL ? "flex-row-reverse" : "")}>
            <h1 className="text-2xl font-bold">{t('admin.messages.title')}</h1>
            {newMessagesCount > 0 && (
              <Badge variant="destructive">{newMessagesCount} {t('admin.messages.new')}</Badge>
            )}
          </div>
          <p className="text-muted-foreground">
            {t('admin.messages.desc')}
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