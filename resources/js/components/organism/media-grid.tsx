// resources/js/components/organisms/media-grid.tsx
import { useState } from 'react'
import { ImageCard } from '@/components/atoms/image-card'
import { MediaGridSkeleton } from '@/components/atoms/media-grid-skeleton'
import { MediaPreviewModal } from '@/components/molecules/media-preview-modal'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/molecules/pagination'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Download, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface MediaFile {
    id: number
    filename: string
    path: string
    size: number
    type: string
    created_at: string
}

interface MediaGridProps {
    files: MediaFile[]
    loading: boolean
    selectedFiles: number[]
    onFileSelect: (id: number) => void
    onSelectAll: () => void
    onClearSelection: () => void
    pagination: {
        current_page: number
        last_page: number
        total: number
        per_page: number
    }
    onPageChange: (page: number) => void
    onRefresh: () => void
}

export function MediaGrid({
    files,
    loading,
    selectedFiles,
    onFileSelect,
    onClearSelection,
    pagination,
    onPageChange,
    onRefresh
}: MediaGridProps) {
    const [previewFile, setPreviewFile] = useState<MediaFile | null>(null)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [deletingFiles, setDeletingFiles] = useState<number[]>([])
    const [deleting, setDeleting] = useState(false)

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const handlePreview = (file: MediaFile) => {
        setPreviewFile(file)
    }

    const handleDownload = (file: MediaFile) => {
        const link = document.createElement('a')
        link.href = `/storage/${file.path}`
        link.download = file.filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const handleDownloadSelected = () => {
        selectedFiles.forEach(fileId => {
            const file = files.find(f => f.id === fileId)
            if (file) {
                handleDownload(file)
            }
        })
    }

    const handleDeleteSingle = (file: MediaFile) => {
        setDeletingFiles([file.id])
        setDeleteDialog(true)
    }

    const handleDeleteSelected = () => {
        setDeletingFiles(selectedFiles)
        setDeleteDialog(true)
    }

    const confirmDelete = async () => {
        setDeleting(true)

        try {
            const response = await fetch('/admin/media/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ ids: deletingFiles }),
            })

            const result = await response.json()

            if (result.success) {
                toast.success(`${deletingFiles.length} file berhasil dihapus`)
                onClearSelection()
                onRefresh()
            } else {
                toast.error(result.error || 'Gagal menghapus file')
            }
        } catch (error) {
            console.error('Delete error:', error)
            toast.error('Terjadi kesalahan saat menghapus file')
        } finally {
            setDeleting(false)
            setDeleteDialog(false)
            setDeletingFiles([])
        }
    }

    if (loading) {
        return <MediaGridSkeleton />
    }

    if (files.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-muted-foreground">
                    <p className="text-lg mb-2">Tidak ada file ditemukan</p>
                    <p className="text-sm">Upload file pertama Anda untuk mulai</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {selectedFiles.length > 0 && (
                <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <span className="text-sm font-medium">
                        {selectedFiles.length} file dipilih
                    </span>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDownloadSelected}
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleDeleteSelected}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Hapus
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClearSelection}
                        >
                            Batal
                        </Button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {files.map((file) => (
                    <ImageCard
                        key={file.id}
                        src={`/storage/${file.path}`}
                        alt={file.filename}
                        filename={file.filename}
                        size={formatFileSize(file.size)}
                        onPreview={() => handlePreview(file)}
                        onDownload={() => handleDownload(file)}
                        onDelete={() => handleDeleteSingle(file)}
                        isSelected={selectedFiles.includes(file.id)}
                        onSelect={() => onFileSelect(file.id)}
                    />
                ))}
            </div>

            <Pagination
                currentPage={pagination.current_page}
                lastPage={pagination.last_page}
                total={pagination.total}
                perPage={pagination.per_page}
                onPageChange={onPageChange}
            />

            <MediaPreviewModal
                isOpen={previewFile !== null}
                onClose={() => setPreviewFile(null)}
                mediaUrl={previewFile?.path || null}
                mediaType="image"
                title={previewFile?.filename || ''}
            />

            <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus File</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus {deletingFiles.length} file?
                            Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleting}>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            disabled={deleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {deleting ? 'Menghapus...' : 'Hapus'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
