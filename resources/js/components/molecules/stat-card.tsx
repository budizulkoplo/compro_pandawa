// resources/js/components/molecules/stat-card.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
    title: string
    value: number | string
    description?: string
    icon?: React.ReactNode
    trend?: {
        value: number
        isPositive: boolean
    }
    className?: string
}

export function StatCard({
    title,
    value,
    description,
    icon,
    trend,
    className
}: StatCardProps) {
    return (
        <Card className={cn("relative overflow-hidden", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                {icon && (
                    <div className="h-4 w-4 text-muted-foreground">
                        {icon}
                    </div>
                )}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {description && (
                    <p className="text-xs text-muted-foreground">
                        {description}
                    </p>
                )}
                {trend && (
                    <div className={cn(
                        "text-xs flex items-center mt-1",
                        trend.isPositive ? "text-green-600" : "text-red-600"
                    )}>
                        <span className={cn(
                            "mr-1",
                            trend.isPositive ? "↗" : "↘"
                        )}>
                            {trend.isPositive ? "↗" : "↘"}
                        </span>
                        {trend.value}%
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
