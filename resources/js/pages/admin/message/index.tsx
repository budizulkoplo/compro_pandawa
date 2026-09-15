// resources/js/Pages/Admin/Message/Index.tsx

import { ConfirmDialog } from '@/components/molecules/confirm-dialog';
import { MessageFilters } from '@/components/molecules/message-filters';
import { MessageStats } from '@/components/molecules/message-stats';
import HeadingSmall from '@/components/organism/heading-small';
import { MessageList } from '@/components/organism/message-list';
import AppLayout from '@/layouts/app-layout';
import messageRoute from '@/routes/admin/message';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
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
    stats: {
        total: number;
        unread: number;
        read: number;
        replied: number;
    };
    filters: {
        search?: string;
        status?: string;
    };
}

const breadcrumbs = [
    {
        title: 'Pesan Kontak',
        href: messageRoute.index().url,
    },
];

export default function MessageIndex({ messages, stats, filters }: Props) {
    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean;
        messageId?: number;
    }>({ open: false });

    const handleSearchChange = (search: string) => {
        router.get(
            messageRoute.index().url,
            { ...filters, search: search || undefined },
            { preserveState: true, replace: true },
        );
    };

    const handleStatusChange = (status: string) => {
        router.get(
            messageRoute.index().url,
            { ...filters, status: status === 'all' ? undefined : status },
            { preserveState: true, replace: true },
        );
    };

    const handleResetFilters = () => {
        router.get(messageRoute.index().url);
    };

    const handleView = (id: number) => {
        router.get(messageRoute.show(id).url);
    };

    const handleMarkRead = (id: number) => {
        router.post(
            messageRoute.markRead(id).url,
            {},
            {
                onSuccess: () => {
                    toast.success('Pesan ditandai sebagai sudah dibaca');
                },
                onError: () => {
                    toast.error('Gagal menandai pesan');
                },
            },
        );
    };

    const handleDelete = (id: number) => {
        setDeleteDialog({ open: true, messageId: id });
    };

    const confirmDelete = () => {
        if (!deleteDialog.messageId) return;

        router.delete(messageRoute.destroy(deleteDialog.messageId).url, {
            onSuccess: () => {
                toast.success('Pesan berhasil dihapus');
                setDeleteDialog({ open: false });
            },
            onError: () => {
                toast.error('Gagal menghapus pesan');
            },
        });
    };

    const handlePageChange = (page: number) => {
        router.get(
            messageRoute.index().url,
            { ...filters, page },
            { preserveState: true, replace: true },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pesan Kontak | Admin" />

            <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-6">
                <HeadingSmall
                    title="Pesan Kontak"
                    description="Kelola pesan yang masuk dari formulir kontak"
                />

                <MessageStats stats={stats} />

                <MessageFilters
                    filters={filters}
                    onSearchChange={handleSearchChange}
                    onStatusChange={handleStatusChange}
                    onReset={handleResetFilters}
                />

                <MessageList
                    messages={messages}
                    onView={handleView}
                    onMarkRead={handleMarkRead}
                    onDelete={handleDelete}
                    onPageChange={handlePageChange}
                />
            </div>

            <ConfirmDialog
                open={deleteDialog.open}
                onOpenChange={(open) => setDeleteDialog({ open })}
                title="Hapus Pesan"
                description="Apakah Anda yakin ingin menghapus pesan ini? Tindakan ini tidak dapat dibatalkan."
                onConfirm={confirmDelete}
                confirmText="Hapus"
                cancelText="Batal"
                variant="destructive"
            />
        </AppLayout>
    );
}
