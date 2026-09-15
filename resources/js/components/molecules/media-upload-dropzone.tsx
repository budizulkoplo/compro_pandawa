// resources/js/components/molecules/media-upload-dropzone.tsx
import { useState, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Progress } from '@/components/ui/progress'

interface MediaUploadDropzoneProps {
    onUploadComplete: (files: Array<{ url: string, filename: string }>) => void
    accept?: string
    maxFiles?: number
    maxSize?: number // in MB
}

export function MediaUploadDropzone({
    onUploadComplete,
    accept = 'image/*',
    maxFiles = 10,
    maxSize = 5
}: MediaUploadDropzoneProps) {
    const [isDragActive, setIsDragActive] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const validateFiles = (files: FileList): File[] => {
        const validFiles: File[] = []

        for (let i = 0; i < files.length; i++) {
            const file = files[i]

            if (validFiles.length >= maxFiles) {
                toast.error(`Maksimal ${maxFiles} file`)
                break
            }

            if (accept === 'image/*' && !file.type.startsWith('image/')) {
                toast.error(`${file.name}: File harus berupa gambar`)
                continue
            }

            if (file.size > maxSize * 1024 * 1024) {
                toast.error(`${file.name}: Ukuran maksimal ${maxSize}MB`)
                continue
            }

            validFiles.push(file)
        }

        return validFiles
    }

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragActive(true)
        } else if (e.type === 'dragleave') {
            setIsDragActive(false)
        }
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragActive(false)

        const files = validateFiles(e.dataTransfer.files)
        if (files.length > 0) {
            setSelectedFiles(files)
        }
    }, [maxFiles, maxSize, accept])

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = validateFiles(e.target.files)
            if (files.length > 0) {
                setSelectedFiles(files)
            }
        }
    }

    const uploadFiles = async () => {
        if (selectedFiles.length === 0) return

        setIsUploading(true)
        setUploadProgress(0)

        try {
            const uploadedFiles: Array<{ url: string, filename: string }> = []

            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i]
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
                    uploadedFiles.push({
                        url: result.url,
                        filename: file.name
                    })
                } else {
                    toast.error(`${file.name}: ${result.error || 'Upload gagal'}`)
                }

                setUploadProgress(((i + 1) / selectedFiles.length) * 100)
            }

            if (uploadedFiles.length > 0) {
                onUploadComplete(uploadedFiles)
                toast.success(`${uploadedFiles.length} file berhasil diupload`)
            }

            setSelectedFiles([])
        } catch (error) {
            console.error('Upload error:', error)
            toast.error('Terjadi kesalahan saat upload')
        } finally {
            setIsUploading(false)
            setUploadProgress(0)
        }
    }

    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    }

    const openFileDialog = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className="space-y-4">
            <div
                className={`
                    border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                    ${isDragActive
                        ? 'border-primary bg-primary/10'
                        : 'border-muted-foreground/25 hover:border-muted-foreground/40'
                    }
                    ${isUploading ? 'pointer-events-none opacity-50' : ''}
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={openFileDialog}
            >
                <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                <div className="space-y-2">
                    <p className="text-sm font-medium">
                        {isDragActive ? 'Lepaskan file di sini' : 'Drag & drop file atau klik untuk upload'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        PNG, JPG, GIF, WEBP maksimal {maxSize}MB (maksimal {maxFiles} file)
                    </p>
                </div>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                multiple
                onChange={handleFileSelect}
                className="hidden"
                disabled={isUploading}
            />

            {selectedFiles.length > 0 && (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium">File yang dipilih ({selectedFiles.length})</h4>
                        <div className="max-h-40 overflow-y-auto space-y-2">
                            {selectedFiles.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-secondary rounded">
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <ImageIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                        <span className="text-sm truncate">{file.name}</span>
                                        <span className="text-xs text-muted-foreground flex-shrink-0">
                                            ({(file.size / 1024 / 1024).toFixed(1)}MB)
                                        </span>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeFile(index)}
                                        disabled={isUploading}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {isUploading && (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span className="text-sm">Mengupload... {Math.round(uploadProgress)}%</span>
                            </div>
                            <Progress value={uploadProgress} />
                        </div>
                    )}

                    <div className="flex gap-2">
                        <Button
                            onClick={uploadFiles}
                            disabled={isUploading || selectedFiles.length === 0}
                            className="flex-1"
                        >
                            {isUploading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload {selectedFiles.length} File
                                </>
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setSelectedFiles([])}
                            disabled={isUploading}
                        >
                            Batal
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
