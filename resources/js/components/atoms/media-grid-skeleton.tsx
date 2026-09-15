// resources/js/components/atoms/media-grid-skeleton.tsx
import { Card, CardContent } from '@/components/ui/card'

export function MediaGridSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                        <div className="aspect-square bg-muted animate-pulse" />
                        <div className="p-3 space-y-2">
                            <div className="h-4 bg-muted animate-pulse rounded" />
                            <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
