// resources/js/components/molecules/multi-image-upload.tsx
import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { X, Image as ImageIcon, Loader2, GripVertical } from 'lucide-react'
import { toast } from 'sonner'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

interface MultiImageUploadProps {
    label: string
    value: string[]
    onChange: (paths: string[]) => void
    maxImages?: number
    className?: string
}

export function MultiImageUpload({
    label,
    value = [],
    onChange,
    maxImages = 10,
    className = ''
}: MultiImageUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [dragActive, setDragActive] = useState(false)

    const handleFiles = useCallback(async (files: FileList) => {
        const remainingSlots = maxImages - value.length
        const filesToUpload = Array.from(files).slice(0, remainingSlots)

        if (filesToUpload.length === 0) {
            toast.error(`Maksimal ${maxImages} gambar`)
            return
        }

        setUploading(true)

        try {
            const uploadPromises = filesToUpload.map(async (file) => {
                if (!file.type.startsWith('image/')) {
                    throw new Error(`${file.name} bukan file gambar`)
                }

                if (file.size > 5 * 1024 * 1024) {
                    throw new Error(`${file.name} terlalu besar (max 5MB)`)
                }

                const formData = new FormData()
                formData.append('file', file)

                const response = await fetch('/admin/media/upload', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    },
                })

                const result = await response.json()
                if (!result.success) {
                    throw new Error(result.error || `Gagal upload ${file.name}`)
                }

                return result.path
            })

            const uploadedPaths = await Promise.all(uploadPromises)
            onChange([...value, ...uploadedPaths])
            toast.success(`${uploadedPaths.length} gambar berhasil diupload`)
        } catch (error) {
            console.error('Upload error:', error)
            toast.error(error instanceof Error ? error.message : 'Terjadi kesalahan saat upload')
        } finally {
            setUploading(false)
        }
    }, [value, onChange, maxImages])

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files) {
            handleFiles(e.dataTransfer.files)
        }
    }, [handleFiles])

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFiles(e.target.files)
        }
    }, [handleFiles])

    const removeImage = async (index: number) => {
        const pathToRemove = value[index]

        try {
            const response = await fetch('/admin/media/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ path: pathToRemove }),
            })

            const result = await response.json()
            if (result.success) {
                const newImages = [...value]
                newImages.splice(index, 1)
                onChange(newImages)
                toast.success('Gambar berhasil dihapus')
            } else {
                toast.error('Gagal menghapus gambar')
            }
        } catch (error) {
            console.error('Delete error:', error)
            toast.error('Terjadi kesalahan saat menghapus gambar')
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDragEnd = (result: any) => {
        if (!result.destination) return

        const items = Array.from(value)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        onChange(items)
    }

    return (
        <div className={`space-y-4 ${className}`}>
            <Label>{label}</Label>

            {/* Upload Area */}
            {value.length < maxImages && (
                <div
                    className={`
                        border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                        ${dragActive
                            ? 'border-primary bg-primary/10'
                            : 'border-muted-foreground/25 hover:border-muted-foreground/40'
                        }
                        ${uploading ? 'pointer-events-none opacity-50' : ''}
                    `}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('multi-file-input')?.click()}
                >
                    {uploading ? (
                        <div className="flex flex-col items-center">
                            <Loader2 className="w-8 h-8 mx-auto text-muted-foreground mb-2 animate-spin" />
                            <p className="text-sm font-medium">Mengupload...</p>
                        </div>
                    ) : (
                        <>
                            <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground/50 mb-2" />
                            <p className="text-sm font-medium mb-1">
                                {dragActive ? 'Lepaskan gambar di sini' : 'Drag & drop gambar atau klik untuk upload'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                PNG, JPG, GIF, WEBP maksimal 5MB ({value.length}/{maxImages})
                            </p>
                        </>
                    )}
                </div>
            )}

            <input
                id="multi-file-input"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                disabled={uploading}
                className="hidden"
            />

            {/* Image Grid */}
            {value.length > 0 && (
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="images" direction="horizontal">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                            >
                                {value.map((path, index) => (
                                    <Draggable key={path} draggableId={path} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className="relative group"
                                            >
                                                <img
                                                    src={`/storage/${path}`}
                                                    alt={`Upload ${index + 1}`}
                                                    className="w-full h-32 object-cover rounded-lg border shadow-sm"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                    <div className="flex gap-2">
                                                        <div
                                                            {...provided.dragHandleProps}
                                                            className="p-1 bg-white/90 rounded cursor-move"
                                                        >
                                                            <GripVertical className="w-4 h-4" />
                                                        </div>
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => removeImage(index)}
                                                            className="p-1 h-6 w-6"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            )}
        </div>
    )
}
