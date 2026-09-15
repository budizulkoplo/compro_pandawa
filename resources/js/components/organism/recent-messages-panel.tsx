// resources/js/components/organisms/recent-messages-panel.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RecentMessageItem } from "@/components/molecules/recent-message-item"
import { RecentMessage } from "@/types/dashboard"
import { Button } from "@/components/ui/button"
import { MessageSquare, ArrowRight } from "lucide-react"
import { router } from "@inertiajs/react"
import { show as message, index } from "@/routes/admin/message"

interface RecentMessagesPanelProps {
    messages: RecentMessage[]
    unreadCount: number
}

export function RecentMessagesPanel({ messages, unreadCount }: RecentMessagesPanelProps) {
    const handleViewMessage = (messageId: number) => {
        router.visit(message(messageId));
    }

    const handleViewAllMessages = () => {
        router.visit(index());
    }

    return (
        <Card className="col-span-full lg:col-span-2">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <MessageSquare className="h-5 w-5" />
                        <CardTitle>Pesan Terbaru</CardTitle>
                        {unreadCount > 0 && (
                            <Badge variant="destructive">
                                {unreadCount} baru
                            </Badge>
                        )}
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleViewAllMessages}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        Lihat Semua
                        <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                {messages.length > 0 ? (
                    <div className="space-y-0">
                        {messages.map((message) => (
                            <RecentMessageItem
                                key={message.id}
                                message={message}
                                onClick={() => handleViewMessage(message.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="p-6 text-center text-muted-foreground">
                        <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Belum ada pesan masuk</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
