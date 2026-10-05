import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Upload, X, Eye, FileImage, FileVideo, FolderOpen } from 'lucide-react'
import { MediaPreviewModal } from '@/components/molecules/media-preview-modal'
import { MediaPickerModal } from '@/components/molecules/media-picker-modal'
import { toast } from 'sonner'

interface FileUploadProps {
    label: string
    accept: string
    value: string | File | Array<string | File> | null
    onChange: (files: File | string | File[] | string[] | null) => void // Support single or multiple
    type: 'image' | 'video'
    error?: string
    className?: string
    multiple?: boolean // New prop for multiple upload
}

export function FileUpload({
    label,
    accept,
    value,
    onChange,
    type,
    error,
    className = '',
    multiple = false
}: FileUploadProps) {
    const [previewModal, setPreviewModal] = useState(false)
    const [selectedPreviewIndex, setSelectedPreviewIndex] = useState<number>(0)
    const [showMediaPicker, setShowMediaPicker] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFiles = (files: File[]) => {
        const maxSize = type === 'video' ? 10 * 1024 * 1024 : 5 * 1024 * 1024
        const validFiles = files.filter((file) => {
            if (type === 'image' && !file.type.startsWith('image/')) {
                toast.error('File harus berupa gambar')
                return false
            }

            if (type === 'video' && !file.type.startsWith('video/')) {
                toast.error('File harus berupa video')
                return false
            }

            if (file.size > maxSize) {
                toast.error(`Ukuran file maksimal ${type === 'video' ? '10MB' : '5MB'}`)
                return false
            }

            return true
        })

        if (multiple) {
            onChange(validFiles)
        } else {
            onChange(validFiles[0] || null)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (multiple) {
            handleFiles(Array.from(e.target.files || []))
        } else {
            handleFiles(e.target.files?.[0] ? [e.target.files[0]] : [])
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(false)
        handleFiles(Array.from(e.dataTransfer.files))
    }

    const handleClick = () => {
        // Buka media picker modal, bukan file input
        setShowMediaPicker(true)
    }

    const handleDelete = (index?: number) => {
        if (multiple && Array.isArray(value) && typeof index === 'number') {
            // Remove specific item from array
            const newValues = value.filter((_, i) => i !== index)
            onChange(newValues.length > 0 ? newValues as File[] | string[] : null)
        } else {
            // Clear all
            onChange(null)
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const openPreview = (index: number = 0) => {
        if (value) {
            setSelectedPreviewIndex(index)
            setPreviewModal(true)
        }
    }

    const handleMediaSelect = (paths: string | string[]) => {
        if (multiple && Array.isArray(paths)) {
            // Multiple selection
            const currentValues = Array.isArray(value) ? value : []
            onChange([...currentValues, ...paths] as File[] | string[])
            toast.success(`${paths.length} ${type === 'image' ? 'gambar' : 'video'} berhasil dipilih dari library`)
        } else if (typeof paths === 'string') {
            // Single selection
            onChange(paths)
            toast.success(`${type === 'image' ? 'Gambar' : 'Video'} berhasil dipilih dari library`)
        }
    }

    // Get current preview URL for modal
    const getPreviewUrl = (): string | null => {
        if (!value) return null
        if (Array.isArray(value)) {
            const item = value[selectedPreviewIndex] || value[0]
            return item instanceof File ? URL.createObjectURL(item) : item
        }
        return value instanceof File ? URL.createObjectURL(value) : value
    }

    // Check if has any value
    const hasValue = value && (Array.isArray(value) ? value.length > 0 : true)

    return (
        <div className={`space-y-2 ${className}`}>
            <Label>{label}</Label>

            <div className="space-y-3">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    multiple={multiple}
                    className="hidden"
                />

                {hasValue ? (
                    multiple && Array.isArray(value) ? (
                        // Multiple items preview
                        <div className="space-y-2">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm font-medium">
                                    {value.length} {type === 'image' ? 'Gambar' : 'Video'} dipilih
                                </p>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowMediaPicker(true)}
                                >
                                    <FolderOpen className="w-4 h-4 mr-2" />
                                    Tambah Lagi
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {value.map((item, index) => (
                                    <div key={index} className="relative group border-2 border-dashed rounded-lg p-3">
                                        <div className="space-y-2">
                                            {type === 'image' ? (
                                                <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                                                    <img
                                                        src={typeof item === 'string' ? (item.startsWith('http') ? item : `/storage/${item}`) : URL.createObjectURL(item as File)}
                                                        alt={`Preview ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center aspect-square bg-gray-100 dark:bg-gray-800 rounded">
                                                    <FileVideo className="w-8 h-8" />
                                                </div>
                                            )}

                                            <div className="flex items-center gap-1">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => openPreview(index)}
                                                    className="flex-1"
                                                >
                                                    <Eye className="w-3 h-3" />
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDelete(index)}
                                                    className="border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                >
                                                    <X className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        // Single item preview
                        <div
                            className="relative group border-2 border-dashed rounded-lg p-4"
                            onDragEnter={(e) => {
                                e.preventDefault()
                                setIsDragging(true)
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                        >
                            <div
                                className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-lg border-2 border-dashed bg-background/90 text-sm font-medium transition-opacity ${
                                    isDragging ? 'border-blue-500 opacity-100' : 'opacity-0'
                                }`}
                            >
                                Lepaskan file untuk mengganti gambar
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {type === 'image' ? (
                                        <img
                                            src={typeof value === 'string'
                                                ? (value.startsWith('http') ? value : `/storage/${value}`)
                                                : URL.createObjectURL(value as File)}
                                            alt={label}
                                            className="h-16 w-16 rounded-md object-cover"
                                        />
                                    ) : (
                                        <FileVideo className="w-8 h-8" />
                                    )}
                                    <div>
                                        <p className="text-sm font-medium">
                                            {type === 'image' ? 'Gambar' : 'Video'} berhasil dipilih
                                        </p>
                                        <p className="text-xs">
                                            Klik preview untuk melihat
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => openPreview()}
                                    >
                                        <Eye className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleClick}
                                        className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Ganti
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete()}
                                        className="border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                ) : (
                    <>
                        <div
                            onClick={handleClick}
                            onDragEnter={(e) => {
                                e.preventDefault()
                                setIsDragging(true)
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                                isDragging
                                    ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
                                    : 'hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10'
                            }`}
                        >
                            <Upload className="w-12 h-12 mx-auto" />
                            <p className="text-sm font-medium mb-1">
                                {isDragging
                                    ? `Lepaskan ${type === 'image' ? 'gambar' : 'video'} di sini`
                                    : `Klik atau drag & drop ${type === 'image' ? 'gambar' : 'video'} baru`}
                            </p>
                            <p className="text-xs">
                                {type === 'image'
                                    ? 'PNG, JPG, JPEG hingga 5MB'
                                    : 'MP4, MOV, AVI hingga 10MB'
                                }
                            </p>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2">
                                    Atau
                                </span>
                            </div>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => setShowMediaPicker(true)}
                        >
                            <FolderOpen className="mr-2 h-4 w-4" />
                            Pilih dari Media Library
                        </Button>
                    </>
                )}
            </div>

            {error && (
                <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>
            )}

            <MediaPreviewModal
                isOpen={previewModal}
                onClose={() => setPreviewModal(false)}
                mediaUrl={getPreviewUrl()}
                mediaType={type}
                title={multiple ? `${label} (${selectedPreviewIndex + 1}/${Array.isArray(value) ? value.length : 1})` : label}
            />

            <MediaPickerModal
                isOpen={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={handleMediaSelect}
                fileType={type}
                title={`Pilih ${type === 'image' ? 'Gambar' : 'Video'}${multiple ? ' (Multiple)' : ''}`}
                multiple={multiple}
            />
        </div>
    )
}
