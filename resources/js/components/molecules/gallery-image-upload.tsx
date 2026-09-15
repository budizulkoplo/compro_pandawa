// resources/js/components/molecules/gallery-image-upload.tsx

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'

interface GalleryImageUploadProps {
    value?: string
    onChange: (path: string, url: string) => void
    categoryId?: number
    title?: string
    className?: string
}

export function GalleryImageUpload({
    value,
    onChange,
    categoryId,
    title = '',
    className = ''
}: GalleryImageUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [preview, setPreview] = useState<string>(value || '')

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file')
            return
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size must be less than 5MB')
            return
        }

        setUploading(true)

        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('context', 'gallery')

            if (categoryId) {
                formData.append('category_id', categoryId.toString())
            }

            if (title) {
                formData.append('title', title)
            }

            const response = await fetch('/admin/media/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            })

            const result = await response.json()

            if (result.success) {
                setPreview(result.url)
                onChange(result.path, result.url)
                toast.success('Image uploaded successfully')
            } else {
                toast.error(result.error || 'Upload failed')
            }
        } catch (error) {
            console.error('Upload error:', error)
            toast.error('Upload failed')
        } finally {
            setUploading(false)
            // Reset input
            event.target.value = ''
        }
    }

    const handleRemove = async () => {
        if (!value) return

        try {
            const response = await fetch('/admin/media/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ path: value }),
            })

            const result = await response.json()

            if (result.success) {
                setPreview('')
                onChange('', '')
                toast.success('Image removed')
            } else {
                toast.error('Failed to remove image')
            }
        } catch (error) {
            console.error('Delete error:', error)
            toast.error('Failed to remove image')
        }
    }

    return (
        <div className={`space-y-4 ${className}`}>
            <Label>Gallery Image</Label>

            {preview ? (
                <div className="relative inline-block">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full max-w-md h-48 object-cover rounded-lg border"
                    />
                    <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={handleRemove}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ) : (
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                    <div className="space-y-2">
                        <Label
                            htmlFor="gallery-image-upload"
                            className="cursor-pointer inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                        >
                            <Upload className="h-4 w-4" />
                            {uploading ? 'Uploading...' : 'Choose Image'}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                            PNG, JPG, GIF, WEBP up to 5MB
                        </p>
                    </div>
                </div>
            )}

            <Input
                id="gallery-image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={uploading}
                className="hidden"
            />
        </div>
    )
}
