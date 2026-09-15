// resources/js/components/molecules/service-card.tsx

import { Service } from '@/types/service'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/atoms/status-badge'
import { ActionButton } from '@/components/atoms/action-button'
import { Eye, Edit, Trash2 } from 'lucide-react'

interface ServiceCardProps {
    service: Service
    onView: (service: Service) => void
    onEdit: (service: Service) => void
    onDelete: (service: Service) => void
}

export function ServiceCard({ service, onView, onEdit, onDelete }: ServiceCardProps) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <CardTitle className="text-lg line-clamp-2">{service.title}</CardTitle>
                    <StatusBadge isActive={service.isActive} />
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {service.image && (
                    <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
                        <img
                            src={`/storage/${service.image}`}
                            alt={service.title}
                            className="h-full w-full object-cover"
                        />
                    </div>
                )}

                <p className="text-muted-foreground line-clamp-3 text-sm">
                    {service.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-muted-foreground">
                        Urutan: {service.sortOrder}
                    </span>

                    <div className="flex items-center gap-1">
                        <ActionButton
                            icon={Eye}
                            onClick={() => onView(service)}
                            title="Lihat Detail"
                        />
                        <ActionButton
                            icon={Edit}
                            onClick={() => onEdit(service)}
                            title="Edit Layanan"
                        />
                        <ActionButton
                            icon={Trash2}
                            onClick={() => onDelete(service)}
                            variant="destructive"
                            title="Hapus Layanan"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
