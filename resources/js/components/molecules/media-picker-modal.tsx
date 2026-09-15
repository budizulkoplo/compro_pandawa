// resources/js/components/molecules/media-picker-modal.tsx

import { useState, useEffect, useCallback } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
    Search,
    Upload,
    Check,
    Loader2,
    Image as ImageIcon,
    Link as LinkIcon,
    X,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface MediaFile {
    id: number
    filename: string
    path: string
    size: number
    type: string
    extension: string
    created_at: string
}

interface MediaPickerModalProps {
    isOpen: boolean
    onClose: () => void
    onSelect: (paths: string | string[]) => void // Updated to support multiple
    fileType?: 'image' | 'video' | 'all'
    title?: string
    multiple?: boolean // New prop
}

export function MediaPickerModal({
    isOpen,
    onClose,
    onSelect,
    fileType = 'image',
    title = 'Pilih Media',
    multiple = false,
}: MediaPickerModalProps) {
    const [activeTab, setActiveTab] = useState<'library' | 'upload' | 'url'>('library')
    const [files, setFiles] = useState<MediaFile[]>([])
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)
    const [selectedFiles, setSelectedFiles] = useState<MediaFile[]>([])

    // Filters
    const [search, setSearch] = useState('')
    const [sortBy, setSortBy] = useState('newest')
    const [page, setPage] = useState(1)

    // URL input
    const [urlInput, setUrlInput] = useState('')

    // Upload
    const [uploadFile, setUploadFile] = useState<File | null>(null)
    const [uploadPreview, setUploadPreview] = useState<string>('')

    // Fetch media files
    const fetchFiles = useCallback(async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                search,
                sort_by: sortBy,
                file_type: fileType === 'all' ? 'all' : fileType,
                page: page.toString(),
                per_page: '24',
            })

            const response = await fetch(`/admin/media/data?${params}`, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    Accept: 'application/json',
                },
            })

            if (response.ok) {
                const data = await response.json()
                setFiles(data.files?.data || [])
            }
        } catch (error) {
            console.error('Failed to fetch media:', error)
            toast.error('Gagal memuat media library')
        } finally {
            setLoading(false)
        }
    }, [search, sortBy, fileType, page])

    useEffect(() => {
        if (isOpen && activeTab === 'library') {
            fetchFiles()
        }
    }, [isOpen, activeTab, fetchFiles])

    const handleFileSelect = (file: MediaFile) => {
        if (multiple) {
            // Toggle selection for multiple mode
            setSelectedFiles(prev => {
                const isSelected = prev.some(f => f.id === file.id)
                if (isSelected) {
                    return prev.filter(f => f.id !== file.id)
                } else {
                    return [...prev, file]
                }
            })
        } else {
            // Single selection
            setSelectedFile(file)
        }
    }

    const handleConfirmSelect = () => {
        if (multiple && selectedFiles.length > 0) {
            // Multiple selection
            const paths = selectedFiles.map(f => f.path)
            onSelect(paths)
            handleClose()
        } else if (selectedFile) {
            // Single selection
            onSelect(selectedFile.path)
            handleClose()
        }
    }

    const handleUploadFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type
        if (fileType === 'image' && !file.type.startsWith('image/')) {
            toast.error('File harus berupa gambar')
            return
        }

        if (fileType === 'video' && !file.type.startsWith('video/')) {
            toast.error('File harus berupa video')
            return
        }

        // Validate file size (5MB for images, 10MB for videos)
        const maxSize = fileType === 'video' ? 10 * 1024 * 1024 : 5 * 1024 * 1024
        if (file.size > maxSize) {
            toast.error(
                `Ukuran file maksimal ${fileType === 'video' ? '10MB' : '5MB'}`
            )
            return
        }

        setUploadFile(file)
        setUploadPreview(URL.createObjectURL(file))
    }

    const handleUpload = async () => {
        if (!uploadFile) return

        setUploading(true)
        try {
            const formData = new FormData()
            formData.append('file', uploadFile)

            const response = await fetch('/admin/media/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN':
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute('content') || '',
                },
            })

            const result = await response.json()

            if (result.success) {
                onSelect(result.path)
                toast.success('File berhasil diupload')
                handleClose()
            } else {
                toast.error(result.error || 'Upload gagal')
            }
        } catch (error) {
            console.error('Upload error:', error)
            toast.error('Terjadi kesalahan saat upload')
        } finally {
            setUploading(false)
        }
    }

    const handleUrlSubmit = () => {
        if (!urlInput.trim()) {
            toast.error('URL tidak boleh kosong')
            return
        }

        try {
            // Validate URL
            new URL(urlInput)

            // For video type, just pass the URL directly (YouTube, Vimeo, etc.)
            if (fileType === 'video') {
                onSelect(urlInput)
                toast.success('URL video berhasil ditambahkan')
                handleClose()
                return
            }

            // For images, extract path from URL if it's a storage URL
            let path = urlInput
            if (urlInput.includes('/storage/')) {
                path = urlInput.split('/storage/')[1]
            }

            onSelect(path)
            toast.success('URL berhasil ditambahkan')
            handleClose()
        } catch {
            toast.error('URL tidak valid')
        }
    }

    const handleClose = () => {
        setSelectedFile(null)
        setSelectedFiles([])
        setUploadFile(null)
        setUploadPreview('')
        setUrlInput('')
        setSearch('')
        setPage(1)
        onClose()
    }

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B'
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="!max-w-4xl max-h-[90vh] overflow-x-auto flex flex-col">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        Pilih dari library, upload file baru, atau gunakan URL
                    </DialogDescription>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'library' | 'upload' | 'url')} className="flex-1 flex flex-col overflow-hidden">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="library">
                            <ImageIcon className="w-4 h-4 mr-2" />
                            Media Library
                        </TabsTrigger>
                        <TabsTrigger value="upload">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Baru
                        </TabsTrigger>
                        <TabsTrigger value="url">
                            <LinkIcon className="w-4 h-4 mr-2" />
                            Dari URL
                        </TabsTrigger>
                    </TabsList>

                    {/* Library Tab */}
                    <TabsContent value="library" className="flex-1 flex flex-col space-y-4 mt-0 overflow-hidden">
                        <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                    <Input
                                        placeholder="Cari file..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Urutkan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Terbaru</SelectItem>
                                    <SelectItem value="oldest">Terlama</SelectItem>
                                    <SelectItem value="name">Nama A-Z</SelectItem>
                                    <SelectItem value="name_desc">Nama Z-A</SelectItem>
                                    <SelectItem value="size">Ukuran Kecil</SelectItem>
                                    <SelectItem value="size_desc">Ukuran Besar</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex-1 overflow-y-auto min-h-0 pr-4">
                            {loading ? (
                                <div className="flex items-center justify-center h-64">
                                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                                </div>
                            ) : files.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                                    <ImageIcon className="w-12 h-12 mb-4" />
                                    <p>Tidak ada file ditemukan</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pb-4">
                                    {files.map((file) => {
                                        const isSelected = multiple
                                            ? selectedFiles.some(f => f.id === file.id)
                                            : selectedFile?.id === file.id

                                        return (
                                            <div
                                                key={file.id}
                                                onClick={() => handleFileSelect(file)}
                                                className={cn(
                                                    'relative group cursor-pointer rounded-lg border-2 overflow-hidden transition-all',
                                                    isSelected
                                                        ? 'border-primary ring-2 ring-primary/20'
                                                        : 'border-transparent hover:border-primary/50'
                                                )}
                                            >
                                                <div className="aspect-square bg-muted">
                                                    {file.type === 'image' ? (
                                                        <img
                                                            src={`/storage/${file.path}`}
                                                            alt={file.filename}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <ImageIcon className="w-12 h-12 text-muted-foreground" />
                                                        </div>
                                                    )}
                                                </div>

                                                {isSelected && (
                                                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                                                        <Check className="w-4 h-4" />
                                                    </div>
                                                )}

                                                {multiple && isSelected && (
                                                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                                        {selectedFiles.findIndex(f => f.id === file.id) + 1}
                                                    </div>
                                                )}

                                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-xs">
                                                    <p className="truncate font-medium">
                                                        {file.filename}
                                                    </p>
                                                    <div className="flex items-center justify-between mt-1">
                                                        <Badge variant="secondary" className="text-xs">
                                                            {file.extension}
                                                        </Badge>
                                                        <span className="text-xs">
                                                            {formatFileSize(file.size)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-2 flex-shrink-0 pt-4 border-t">
                            <Button variant="outline" onClick={handleClose}>
                                Batal
                            </Button>
                            <Button
                                onClick={handleConfirmSelect}
                                disabled={multiple ? selectedFiles.length === 0 : !selectedFile}
                            >
                                {multiple
                                    ? `Pilih ${selectedFiles.length} File${selectedFiles.length > 1 ? 's' : ''}`
                                    : 'Pilih File'}
                            </Button>
                        </div>
                    </TabsContent>

                    {/* Upload Tab */}
                    <TabsContent value="upload" className="flex-1 flex flex-col space-y-4 mt-0 overflow-hidden">
                        <div className="flex-1 overflow-y-auto space-y-4">
                            {uploadPreview ? (
                                <div className="relative">
                                    <img
                                        src={uploadPreview}
                                        alt="Preview"
                                        className="w-full max-h-64 object-contain bg-muted rounded-lg"
                                    />
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="absolute top-2 right-2"
                                        onClick={() => {
                                            setUploadFile(null)
                                            setUploadPreview('')
                                        }}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            ) : (
                                <Label
                                    htmlFor="file-upload"
                                    className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                                >
                                    <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                                    <span className="text-sm font-medium">
                                        Klik untuk pilih file
                                    </span>
                                    <span className="text-xs text-muted-foreground mt-2 text-center px-4">
                                        {fileType === 'image'
                                            ? 'PNG, JPG, GIF, WEBP (max 5MB)'
                                            : fileType === 'video'
                                            ? 'MP4, MOV, AVI (max 10MB)'
                                            : 'Semua jenis file'}
                                    </span>
                                    <Input
                                        id="file-upload"
                                        type="file"
                                        accept={
                                            fileType === 'image'
                                                ? 'image/*'
                                                : fileType === 'video'
                                                ? 'video/*'
                                                : '*'
                                        }
                                        onChange={handleUploadFileChange}
                                        className="hidden"
                                    />
                                </Label>
                            )}

                            {uploadFile && (
                                <div className="p-4 bg-muted rounded-lg">
                                    <p className="text-sm font-medium truncate">{uploadFile.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {formatFileSize(uploadFile.size)}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-2 flex-shrink-0 pt-4 border-t">
                            <Button variant="outline" onClick={handleClose}>
                                Batal
                            </Button>
                            <Button
                                onClick={handleUpload}
                                disabled={!uploadFile || uploading}
                            >
                                {uploading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    'Upload & Pilih'
                                )}
                            </Button>
                        </div>
                    </TabsContent>

                    {/* URL Tab */}
                    <TabsContent value="url" className="flex-1 flex flex-col space-y-4 mt-0 overflow-hidden">
                        <div className="flex-1 overflow-y-auto space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="url-input">URL Media</Label>
                                <Input
                                    id="url-input"
                                    type="url"
                                    placeholder="https://example.com/image.jpg atau https://youtube.com/watch?v=..."
                                    value={urlInput}
                                    onChange={(e) => setUrlInput(e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Masukkan URL gambar, video YouTube/Vimeo, atau dari storage lokal
                                </p>
                            </div>

                            {urlInput && (
                                <div className="p-4 border rounded-lg">
                                    <Label className="text-sm font-medium mb-2 block">
                                        Preview:
                                    </Label>
                                    {(urlInput.includes('youtube.com') || urlInput.includes('youtu.be') || urlInput.includes('vimeo.com')) ? (
                                        <div className="aspect-video w-full bg-muted rounded flex items-center justify-center">
                                            <p className="text-sm text-muted-foreground">Video URL terdeteksi</p>
                                        </div>
                                    ) : (
                                        <img
                                            src={urlInput}
                                            alt="URL Preview"
                                            className="w-full max-h-64 object-contain bg-muted rounded"
                                            onError={(e) => {
                                                e.currentTarget.src = ''
                                                e.currentTarget.alt = 'Gagal memuat preview'
                                            }}
                                        />
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-2 flex-shrink-0 pt-4 border-t">
                            <Button variant="outline" onClick={handleClose}>
                                Batal
                            </Button>
                            <Button onClick={handleUrlSubmit} disabled={!urlInput.trim()}>
                                Gunakan URL
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
