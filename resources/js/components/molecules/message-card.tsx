// resources/js/components/molecules/message-card.tsx

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ActionButton } from '@/components/atoms/action-button'
import { MessageStatusBadge } from '@/components/atoms/message-status-badge'
import { MessagePriorityIndicator } from '@/components/atoms/message-priority-indicator'
import { Eye, Mail, Trash2, Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'

interface MessageCardProps {
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
    onView: (id: number) => void
    onMarkRead: (id: number) => void
    onDelete: (id: number) => void
}

export function MessageCard({
    message,
    onView,
    onMarkRead,
    onDelete
}: MessageCardProps) {
    const truncateText = (text: string, limit: number) => {
        return text.length > limit ? text.substring(0, limit) + '...' : text
    }

    return (
        <Card className={`transition-all hover:shadow-md ${!message.isRead ? 'border-l-4 border-l-blue-500' : ''}`}>
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <MessagePriorityIndicator createdAt={message.created_at} />
                        <div>
                            <h3 className="font-semibold text-base">{message.name}</h3>
                            <p className="text-sm text-muted-foreground">{message.email}</p>
                            {message.phone && (
                                <p className="text-sm text-muted-foreground">{message.phone}</p>
                            )}
                        </div>
                    </div>
                    <MessageStatusBadge
                        isRead={message.isRead}
                        hasReply={!!message.adminReply}
                    />
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Subjek:</h4>
                    <p className="font-medium">{message.subject}</p>
                </div>

                <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Pesan:</h4>
                    <p className="text-sm leading-relaxed">
                        {truncateText(message.message, 150)}
                    </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {message.created_at && !isNaN(new Date(message.created_at).getTime())
                            ? formatDistanceToNow(new Date(message.created_at), {
                                addSuffix: true,
                                locale: id
                            })
                            : '-'
                        }
                        {message.repliedAt && (
                            <span className="text-green-600">
                                • Dibalas {formatDistanceToNow(new Date(message.repliedAt), {
                                    addSuffix: true,
                                    locale: id
                                })}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-1">
                        <ActionButton
                            icon={Eye}
                            onClick={() => onView(message.id)}
                            title="Lihat detail"
                            variant="outline"
                        />

                        {!message.isRead && (
                            <ActionButton
                                icon={Mail}
                                onClick={() => onMarkRead(message.id)}
                                title="Tandai sudah dibaca"
                                variant="outline"
                            />
                        )}

                        <ActionButton
                            icon={Trash2}
                            onClick={() => onDelete(message.id)}
                            title="Hapus pesan"
                            variant="destructive"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
