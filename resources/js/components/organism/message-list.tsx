// resources/js/components/organisms/message-list.tsx

import { EmptyState } from '@/components/molecules/empty-state';
import { MessageCard } from '@/components/molecules/message-card';
import { Pagination } from '@/components/molecules/pagination';
import { Mail } from 'lucide-react';

interface MessageListProps {
    messages: {
        data: Array<{
            id: number;
            name: string;
            email: string;
            phone?: string;
            subject: string;
            message: string;
            isRead: boolean;
            readAt?: string;
            adminReply?: string;
            repliedAt?: string;
            created_at: string;
            replied_by_user?: {
                name: string;
            };
        }>;
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
    };
    onView: (id: number) => void;
    onMarkRead: (id: number) => void;
    onDelete: (id: number) => void;
    onPageChange: (page: number) => void;
}

export function MessageList({
    messages,
    onView,
    onMarkRead,
    onDelete,
    onPageChange,
}: MessageListProps) {
    if (messages.data.length === 0) {
        return (
            <EmptyState
                icon={Mail}
                title="Tidak ada pesan"
                description="Belum ada pesan yang masuk saat ini."
            />
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid gap-4">
                {messages.data.map((message) => (
                    <MessageCard
                        key={message.id}
                        message={message}
                        onView={onView}
                        onMarkRead={onMarkRead}
                        onDelete={onDelete}
                    />
                ))}
            </div>

            <Pagination
                currentPage={messages.current_page}
                lastPage={messages.last_page}
                total={messages.total}
                perPage={messages.per_page}
                onPageChange={onPageChange}
            />
        </div>
    );
}
