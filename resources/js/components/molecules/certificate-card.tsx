// resources/js/components/molecules/certificate-card.tsx

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ActionButton } from '@/components/atoms/action-button'
import { StatusBadge } from '@/components/atoms/status-badge'
import { Eye, Edit, Trash2, Calendar, Building, Image } from 'lucide-react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

interface Certificate {
    id: number
    title: string
    issuer?: string
    issued_at?: string
    expired_at?: string
    image_path?: string
    image_url?: string
    description?: string
    is_active: boolean
    sort_order: number
}

interface CertificateCardProps {
    certificate: Certificate
    onView: () => void
    onEdit: () => void
    onDelete: () => void
}

export function CertificateCard({
    certificate,
    onView,
    onEdit,
    onDelete
}: CertificateCardProps) {
    const isExpired = certificate.expired_at && new Date(certificate.expired_at) < new Date()

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                            {certificate.title}
                        </h3>
                        {certificate.issuer && (
                            <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                                <Building className="w-4 h-4" />
                                <span className="truncate">{certificate.issuer}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {certificate.image_path && (
                            <Badge variant="outline" className="text-xs">
                                <Image className="w-3 h-3 mr-1" />
                                Gambar
                            </Badge>
                        )}
                        <StatusBadge isActive={certificate.is_active} />
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 space-y-3">
                    {certificate.description && (
                        <div dangerouslySetInnerHTML={{ __html: certificate.description }}  className='text-sm text-muted-foreground line-clamp-3 prose'/>
                    )}

                    <div className="space-y-2">
                        {certificate.issued_at && (
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span>
                                    Terbit: {format(new Date(certificate.issued_at), 'dd MMM yyyy', { locale: id })}
                                </span>
                            </div>
                        )}

                        {certificate.expired_at && (
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span className={isExpired ? 'text-destructive' : ''}>
                                    Berlaku sampai: {format(new Date(certificate.expired_at), 'dd MMM yyyy', { locale: id })}
                                    {isExpired && ' (Kedaluwarsa)'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t mt-4">
                    <span className="text-xs text-muted-foreground">
                        Urutan: {certificate.sort_order}
                    </span>

                    <div className="flex items-center gap-1">
                        <ActionButton
                            icon={Eye}
                            onClick={onView}
                            title="Lihat Detail"
                            variant="outline"
                        />
                        <ActionButton
                            icon={Edit}
                            onClick={onEdit}
                            title="Edit"
                            variant="outline"
                        />
                        <ActionButton
                            icon={Trash2}
                            onClick={onDelete}
                            title="Hapus"
                            variant="destructive"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
