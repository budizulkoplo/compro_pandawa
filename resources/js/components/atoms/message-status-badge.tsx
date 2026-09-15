// resources/js/components/atoms/message-status-badge.tsx

import { Badge } from '@/components/ui/badge'

interface MessageStatusBadgeProps {
    isRead: boolean
    hasReply: boolean
    className?: string
}

export function MessageStatusBadge({
    isRead,
    hasReply,
    className = ''
}: MessageStatusBadgeProps) {
    if (hasReply) {
        return (
            <Badge variant="default" className={`bg-green-500 hover:bg-green-600 ${className}`}>
                Dibalas
            </Badge>
        )
    }

    return (
        <Badge
            variant={isRead ? 'secondary' : 'destructive'}
            className={className}
        >
            {isRead ? 'Dibaca' : 'Belum Dibaca'}
        </Badge>
    )
}
