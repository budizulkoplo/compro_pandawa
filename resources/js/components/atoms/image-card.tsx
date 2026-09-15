// resources/js/components/atoms/image-card.tsx
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ActionButton } from '@/components/atoms/action-button'
import { Eye, Download, Trash2 } from 'lucide-react'

interface ImageCardProps {
    src: string
    alt: string
    filename: string
    size?: string
    onPreview: () => void
    onDownload: () => void
    onDelete: () => void
    isSelected?: boolean
    onSelect?: () => void
}

export function ImageCard({
    src,
    alt,
    filename,
    size,
    onPreview,
    onDownload,
    onDelete,
    isSelected = false,
    onSelect
}: ImageCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false)

    return (
        <Card className={`group relative overflow-hidden transition-all hover:shadow-lg ${isSelected ? 'ring-2 ring-primary' : ''}`}>
            <CardContent className="p-0">
                <div
                    className="relative aspect-square cursor-pointer"
                    onClick={onSelect}
                >
                    <img
                        src={src}
                        alt={alt}
                        className={`w-full h-full object-cover transition-opacity ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setImageLoaded(true)}
                        loading="lazy"
                    />

                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-muted animate-pulse" />
                    )}

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />

                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <ActionButton
                            icon={Eye}
                            onClick={onPreview}
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8 bg-white/90 hover:bg-white"
                            title="Preview"
                        />
                        <ActionButton
                            icon={Download}
                            onClick={onDownload}
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8 bg-white/90 hover:bg-white"
                            title="Download"
                        />
                        <ActionButton
                            icon={Trash2}
                            onClick={onDelete}
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8"
                            title="Hapus"
                        />
                    </div>
                </div>

                <div className="p-3">
                    <p className="text-sm font-medium truncate" title={filename}>
                        {filename}
                    </p>
                    {size && (
                        <p className="text-xs text-muted-foreground mt-1">
                            {size}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
