// resources/js/components/molecules/message-stats.tsx

import { Card, CardContent } from '@/components/ui/card'
import { Mail, MailOpen, MessageSquare, Reply } from 'lucide-react'

interface MessageStatsProps {
    stats: {
        total: number
        unread: number
        read: number
        replied: number
    }
}

export function MessageStats({ stats }: MessageStatsProps) {
    const statItems = [
        {
            icon: MessageSquare,
            label: 'Total Pesan',
            value: stats.total,
            color: 'text-blue-600',
            bgColor: 'bg-blue-500/10'
        },
        {
            icon: Mail,
            label: 'Belum Dibaca',
            value: stats.unread,
            color: 'text-red-600',
            bgColor: 'bg-red-500/10'
        },
        {
            icon: MailOpen,
            label: 'Sudah Dibaca',
            value: stats.read,
            color: 'text-gray-600',
            bgColor: 'bg-gray-500/10'
        },
        {
            icon: Reply,
            label: 'Dibalas',
            value: stats.replied,
            color: 'text-green-600',
            bgColor: 'bg-green-500/10'
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statItems.map((item, index) => (
                <Card key={index}>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${item.bgColor}`}>
                                <item.icon className={`w-5 h-5 ${item.color}`} />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{item.label}</p>
                                <p className="text-2xl font-bold">{item.value}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
