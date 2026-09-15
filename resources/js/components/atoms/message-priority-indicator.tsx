// resources/js/components/atoms/message-priority-indicator.tsx

interface MessagePriorityIndicatorProps {
    createdAt: string
    className?: string
}

export function MessagePriorityIndicator({
    createdAt,
    className = ''
}: MessagePriorityIndicatorProps) {
    const messageDate = new Date(createdAt)
    const now = new Date()
    const diffHours = Math.abs(now.getTime() - messageDate.getTime()) / 36e5

    if (diffHours < 24) {
        return (
            <div className={`w-2 h-2 bg-red-500 rounded-full ${className}`}
                 title="Pesan baru (< 24 jam)" />
        )
    }

    if (diffHours < 72) {
        return (
            <div className={`w-2 h-2 bg-yellow-500 rounded-full ${className}`}
                 title="Pesan terbaru (< 3 hari)" />
        )
    }

    return null
}
