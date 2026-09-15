// resources/js/components/molecules/gallery-category-card.tsx

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ActionButton } from '@/components/atoms/action-button'
import { StatusBadge } from '@/components/atoms/status-badge'
import { Edit, Trash2, Eye, Image } from 'lucide-react'
import { GalleryCategory } from '@/types/gallery'

interface GalleryCategoryCardProps {
    category: GalleryCategory
    onEdit: () => void
    onDelete: () => void
    onViewItems: () => void
    onAddItem: () => void
}

export function GalleryCategoryCard({
    category,
    onEdit,
    onDelete,
    onViewItems,
    onAddItem
}: GalleryCategoryCardProps) {
    return (
        <Card className="h-full">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <StatusBadge isActive={category.is_active} />
                    </div>
                    <div className="flex items-center gap-2">
                        <ActionButton
                            icon={Edit}
                            onClick={onEdit}
                            title="Edit kategori"
                        />
                        <ActionButton
                            icon={Trash2}
                            onClick={onDelete}
                            variant="destructive"
                            title="Hapus kategori"
                        />
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {category.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {category.description}
                    </p>
                )}

                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                        {category.gallery_items_count || 0} gambar
                    </span>
                    <Badge variant="outline">
                        Urutan: {category.sort_order}
                    </Badge>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onViewItems}
                        className="flex-1"
                    >
                        <Eye className="mr-2 h-4 w-4" />
                        Lihat Galeri
                    </Button>
                    <Button
                        size="sm"
                        onClick={onAddItem}
                        className="flex-1"
                    >
                        <Image className="mr-2 h-4 w-4" />
                        Tambah Gambar
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
