// resources/js/components/molecules/recent-message-item.tsx

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { RecentMessage } from "@/types/dashboard"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"
import { Mail, MailOpen } from "lucide-react"

interface RecentMessageItemProps {
    message: RecentMessage
    onClick?: () => void
}

export function RecentMessageItem({ message, onClick }: RecentMessageItemProps) {
    return (
        <div
            className={cn(
                "flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-colors hover:bg-muted/50",
                !message.isRead && "bg-blue-50 border-l-4 border-l-blue-500"
            )}
            onClick={onClick}
        >
            <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full",
                message.isRead ? "bg-muted" : "bg-blue-100"
            )}>
                {message.isRead ? (
                    <MailOpen className="h-4 w-4 text-muted-foreground" />
                ) : (
                    <Mail className="h-4 w-4 text-blue-600" />
                )}
            </div>

            <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                    <p className={cn(
                        "text-sm font-medium leading-none",
                        !message.isRead && "font-semibold"
                    )}>
                        {message.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(message.created_at), {
                            addSuffix: true,
                            locale: id
                        })}
                    </p>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                    {message.subject}
                </p>
                <p className="text-xs text-muted-foreground">
                    {message.email}
                </p>
            </div>

            {!message.isRead && (
                <Badge variant="default" className="ml-2">
                    Baru
                </Badge>
            )}
        </div>
    )
}
