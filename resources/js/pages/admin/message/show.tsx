// resources/js/Pages/Admin/Message/Show.tsx

import { Head } from '@inertiajs/react'
import { router } from '@inertiajs/react'
import { useState } from 'react'
import AppLayout from '@/layouts/app-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { RichTextEditor } from '@/components/editor/rich-text-editor'
import { MessageStatusBadge } from '@/components/atoms/message-status-badge'
import { ArrowLeft, Mail, Phone, Calendar, User, Reply, Send } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'
import messageRoute from '@/routes/admin/message'

interface Props {
    message: {
        id: number
        name: string
        email: string
        phone?: string
        subject: string
        message: string
        isRead: boolean
        readAt?: string
        adminReply?: string
        repliedAt?: string
        created_at: string
        replied_by_user?: {
            name: string
        }
    }
}

const breadcrumbs = [
    {
        title: 'Pesan Kontak',
        href: messageRoute.index().url,
    },
    {
        title: 'Detail Pesan',
        href: '#',
    },
]

export default function MessageShow({ message }: Props) {
    const [reply, setReply] = useState(message.adminReply || '')
    const [isReplying, setIsReplying] = useState(false)

    const handleBackToList = () => {
        router.get(messageRoute.index().url)
    }

    const handleSendReply = () => {
        if (!reply.trim()) {
            toast.error('Balasan tidak boleh kosong')
            return
        }

        setIsReplying(true)

        router.post(messageRoute.reply(message.id).url,
            { reply },
            {
                onSuccess: () => {
                    toast.success('Balasan berhasil dikirim')
                    setIsReplying(false)
                },
                onError: (errors) => {
                    toast.error(errors.reply?.[0] || 'Gagal mengirim balasan')
                    setIsReplying(false)
                }
            }
        )
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Pesan: ${message.subject} | Admin`} />

            <div className="space-y-6 mx-auto max-w-4xl py-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleBackToList}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Kembali ke Daftar
                    </Button>

                    <MessageStatusBadge
                        isRead={message.isRead}
                        hasReply={!!message.adminReply}
                    />
                </div>

                {/* Message Details Card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div>
                                <CardTitle className="text-2xl">{message.subject}</CardTitle>
                                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {format(new Date(message.created_at), 'dd MMMM yyyy, HH:mm')}
                                    </div>
                                    {message.readAt && (
                                        <div className="flex items-center gap-1">
                                            <Mail className="w-4 h-4" />
                                            Dibaca: {format(new Date(message.readAt), 'dd MMM yyyy, HH:mm')}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Sender Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-secondary/50 rounded-lg">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Nama</p>
                                    <p className="font-medium">{message.name}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium">{message.email}</p>
                                </div>
                            </div>

                            {message.phone && (
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Telepon</p>
                                        <p className="font-medium">{message.phone}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Separator />

                        {/* Original Message */}
                        <div>
                            <h3 className="font-semibold mb-3">Pesan:</h3>
                            <div className="p-4 bg-background border rounded-lg">
                                <p className="whitespace-pre-wrap leading-relaxed">
                                    {message.message}
                                </p>
                            </div>
                        </div>

                        {/* Previous Reply (if exists) */}
                        {message.adminReply && (
                            <>
                                <Separator />
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Reply className="w-4 h-4" />
                                        <h3 className="font-semibold">Balasan Sebelumnya:</h3>
                                        {message.repliedAt && (
                                            <Badge variant="outline" className="text-xs">
                                                {format(new Date(message.repliedAt), 'dd MMM yyyy, HH:mm')}
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="p-4 rounded-lg overflow-x-auto">
                                        <div
                                            className="prose prose-sm max-w-full break-words"
                                            style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}
                                            dangerouslySetInnerHTML={{ __html: message.adminReply }}
                                        />
                                        {message.replied_by_user && (
                                            <p className="text-xs text-muted-foreground mt-3 border-t pt-2">
                                                Dibalas oleh: {message.replied_by_user.name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}

                        <Separator />

                        {/* Reply Section */}
                        <div>
                            <h3 className="font-semibold mb-3">
                                {message.adminReply ? 'Kirim Balasan Baru:' : 'Balas Pesan:'}
                            </h3>

                            <div className="space-y-4">
                                <RichTextEditor
                                    content={reply}
                                    onChange={setReply}
                                    placeholder="Tulis balasan Anda di sini..."
                                />

                                <div className="flex justify-end">
                                    <Button
                                        onClick={handleSendReply}
                                        disabled={isReplying || !reply.trim()}
                                    >
                                        {isReplying ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                Mengirim...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 mr-2" />
                                                Kirim Balasan
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
