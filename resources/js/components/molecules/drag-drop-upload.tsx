// resources/js/components/molecules/drag-drop-upload.tsx
import { useState, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Upload, X, Image as ImageIcon, Loader2, FileImage } from 'lucide-react'
import { toast } from 'sonner'

interface DragDropUploadProps {
    label: string
    value: string | null
    onChange: (path: string) => void
    onDelete: () => void
    required?: boolean
    accept?: string
    maxSize?: number // in MB
    className?: string
}

export function DragDropUpload({
    label,
    value,
    onChange,
    onDelete,
    required = false,
    accept = 'image/*',
    maxSize = 5,
    className = ''
}: DragDropUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [dragActive, setDragActive] = useState(false)
    const [preview, setPreview] = useState<string>(value ? `/storage/${value}` : '')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFiles = useCallback(async (files: FileList) => {
        const file = files[0]
        if (!file) return

        // Validate file type
        if (accept === 'image/*' && !file.type.startsWith('image/')) {
            toast.error('File harus berupa gambar')
            return
        }

        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
            toast.error(`Ukuran file maksimal ${maxSize}MB`)
            return
        }

        setUploading(true)

        try {
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

            if (result.success) {
                setPreview(result.url)
                onChange(result.path)
                toast.success('File berhasil diupload')
            } else {
                toast.error(result.error || 'Upload gagal')
            }
        } catch (error) {
            console.error('Upload error:', error)
            toast.error('Terjadi kesalahan saat upload')
        } finally {
            setUploading(false)
        }
    }, [accept, maxSize, onChange])

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

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files)
        }
    }, [handleFiles])

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files)
        }
    }, [handleFiles])

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
                onDelete()
                toast.success('File berhasil dihapus')
            } else {
                toast.error('Gagal menghapus file')
            }
        } catch (error) {
            console.error('Delete error:', error)
            toast.error('Terjadi kesalahan saat menghapus file')
        }
    }

    const openFileDialog = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className={`space-y-4 ${className}`}>
            <Label>
                {label} {required && <span className="text-destructive">*</span>}
            </Label>

            {preview ? (
                <div className="relative max-w-md">
                    {accept === 'image/*' ? (
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg border shadow-sm"
                        />
                    ) : (
                        <div className="flex items-center gap-3 p-4 border rounded-lg bg-secondary/50">
                            <FileImage className="w-8 h-8 text-blue-500" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">File berhasil dipilih</p>
                                <p className="text-xs text-muted-foreground">{preview.split('/').pop()}</p>
                            </div>
                        </div>
                    )}
                    <div className="absolute top-2 right-2 flex gap-2">
                        <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={openFileDialog}
                            disabled={uploading}
                        >
                            {uploading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Upload className="h-4 w-4" />
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={handleRemove}
                            disabled={uploading}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ) : (
                <div
                    className={`
                        border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
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
                    onClick={openFileDialog}
                >
                    {uploading ? (
                        <div className="flex flex-col items-center">
                            <Loader2 className="w-12 h-12 mx-auto text-muted-foreground mb-4 animate-spin" />
                            <p className="text-sm font-medium mb-1">Mengupload...</p>
                        </div>
                    ) : (
                        <>
                            <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                            <div className="space-y-2">
                                <p className="text-sm font-medium">
                                    {dragActive ? 'Lepaskan file di sini' : 'Drag & drop file atau klik untuk upload'}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {accept === 'image/*'
                                        ? `PNG, JPG, GIF, WEBP maksimal ${maxSize}MB`
                                        : `File maksimal ${maxSize}MB`
                                    }
                                </p>
                            </div>
                        </>
                    )}
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={handleFileSelect}
                disabled={uploading}
                className="hidden"
            />
        </div>
    )
}
