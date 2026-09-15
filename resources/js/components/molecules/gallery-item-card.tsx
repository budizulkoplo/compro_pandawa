// resources/js/components/molecules/gallery-item-card.tsx

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ActionButton } from '@/components/atoms/action-button'
import { StatusBadge } from '@/components/atoms/status-badge'
import { Edit, Trash2, Eye } from 'lucide-react'
import { GalleryItem } from '@/types/gallery'
import { MediaPreviewModal } from '@/components/molecules/media-preview-modal'
import { useState } from 'react'

interface GalleryItemCardProps {
    item: GalleryItem
    onEdit: () => void
    onDelete: () => void
}

export function GalleryItemCard({
    item,
    onEdit,
    onDelete
}: GalleryItemCardProps) {
    const [previewOpen, setPreviewOpen] = useState(false)

    return (
        <>
            <Card className="group overflow-hidden">
                <div className="relative aspect-square overflow-hidden">
                    <img
                        src={`/storage/${item.image_path}`}
                        alt={item.alt_text || item.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />

                    {/* Overlay actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <ActionButton
                            icon={Eye}
                            onClick={() => setPreviewOpen(true)}
                            variant="secondary"
                            title="Preview gambar"
                        />
                        <ActionButton
                            icon={Edit}
                            onClick={onEdit}
                            variant="secondary"
                            title="Edit item"
                        />
                        <ActionButton
                            icon={Trash2}
                            onClick={onDelete}
                            variant="destructive"
                            title="Hapus item"
                        />
                    </div>

                    {/* Status badge */}
                    <div className="absolute top-2 left-2">
                        <StatusBadge isActive={item.is_active} />
                    </div>

                    {/* Sort order badge */}
                    <div className="absolute top-2 right-2">
                        <Badge variant="outline" className="bg-background/80">
                            #{item.sort_order}
                        </Badge>
                    </div>
                </div>

                <CardContent className="p-4">
                    <h3 className="font-medium line-clamp-1 mb-1">{item.title}</h3>
                    {item.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {item.description}
                        </p>
                    )}
                </CardContent>
            </Card>

            <MediaPreviewModal
                isOpen={previewOpen}
                onClose={() => setPreviewOpen(false)}
                mediaUrl={item.image_path}
                mediaType="image"
                title={item.title}
            />
        </>
    )
}
