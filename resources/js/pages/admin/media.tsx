// resources/js/Pages/Admin/Media/Index.tsx
import { useState, useEffect, useCallback } from 'react'
import { Head, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import HeadingSmall from '@/components/organism/heading-small'
import { MediaUploadDropzone } from '@/components/molecules/media-upload-dropzone'
import { MediaFilterBar } from '@/components/molecules/media-filter-bar'
import { MediaGrid } from '@/components/organism/media-grid'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Upload, Grid } from 'lucide-react'
import media from '@/routes/admin/media'
import type { BreadcrumbItem } from '@/types'

interface MediaFile {
    id: number
    filename: string
    path: string
    size: number
    type: string
    created_at: string
}

interface Props {
    files: {
        data: MediaFile[]
        current_page: number
        last_page: number
        total: number
        per_page: number
    }
    filters: {
        search: string
        sort_by: string
        file_type: string
        page: number
    }
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Media',
        href: media.index().url,
    },
]

export default function Index({ files, filters }: Props) {
    const [selectedFiles, setSelectedFiles] = useState<number[]>([])
    const [localFilters, setLocalFilters] = useState(filters)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLocalFilters(filters)
    }, [filters])

    const updateFilters = (newFilters: Partial<typeof filters>) => {
        const updatedFilters = { ...localFilters, ...newFilters, page: 1 }

        router.get(media.index().url, updatedFilters, {
            preserveState: true,
            replace: true,
            onStart: () => setLoading(true),
            onFinish: () => setLoading(false),
        })
    }

    const handlePageChange = (page: number) => {
        router.get(media.index().url, { ...localFilters, page }, {
            preserveState: true,
            replace: true,
            onStart: () => setLoading(true),
            onFinish: () => setLoading(false),
        })
    }

    const handleFileSelect = (id: number) => {
        setSelectedFiles(prev =>
            prev.includes(id)
                ? prev.filter(fileId => fileId !== id)
                : [...prev, id]
        )
    }

    const handleSelectAll = () => {
        if (selectedFiles.length === files.data.length) {
            setSelectedFiles([])
        } else {
            setSelectedFiles(files.data.map(file => file.id))
        }
    }

    const handleClearSelection = () => {
        setSelectedFiles([])
    }

    const handleClearFilters = () => {
        const resetFilters = {
            search: '',
            sort_by: 'newest',
            file_type: 'all',
            page: 1
        }

        router.get(media.index().url, resetFilters, {
            preserveState: true,
            replace: true,
            onStart: () => setLoading(true),
            onFinish: () => setLoading(false),
        })
    }

    const handleUploadComplete = useCallback(() => {
        // Refresh halaman untuk menampilkan file baru
        router.reload({
            onFinish: () => {
                setSelectedFiles([])
            }
        })
    }, [])

    const handleRefresh = () => {
        router.reload()
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Media | Admin" />

            <div className="space-y-6 mx-auto max-w-7xl py-4">
                <HeadingSmall
                    title="Media"
                    description="Kelola semua file media Anda"
                />

                <Tabs defaultValue="grid" className="space-y-6">
                    <div className="flex items-center justify-between">
                        <TabsList>
                            <TabsTrigger value="grid" className="flex items-center gap-2">
                                <Grid className="w-4 h-4" />
                                Grid
                            </TabsTrigger>
                            <TabsTrigger value="upload" className="flex items-center gap-2">
                                <Upload className="w-4 h-4" />
                                Upload
                            </TabsTrigger>
                        </TabsList>

                        <div className="flex items-center gap-2">
                            {selectedFiles.length > 0 && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleSelectAll}
                                >
                                    {selectedFiles.length === files.data.length ? 'Batal Pilih Semua' : 'Pilih Semua'}
                                </Button>
                            )}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleRefresh}
                                disabled={loading}
                            >
                                Refresh
                            </Button>
                        </div>
                    </div>

                    <TabsContent value="grid" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Filter & Pencarian</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <MediaFilterBar
                                    search={localFilters.search}
                                    onSearchChange={(value) => updateFilters({ search: value })}
                                    sortBy={localFilters.sort_by}
                                    onSortByChange={(value) => updateFilters({ sort_by: value })}
                                    fileType={localFilters.file_type}
                                    onFileTypeChange={(value) => updateFilters({ file_type: value })}
                                    selectedCount={selectedFiles.length}
                                    onClearFilters={handleClearFilters}
                                />
                            </CardContent>
                        </Card>

                        <MediaGrid
                            files={files.data}
                            loading={loading}
                            selectedFiles={selectedFiles}
                            onFileSelect={handleFileSelect}
                            onSelectAll={handleSelectAll}
                            onClearSelection={handleClearSelection}
                            pagination={{
                                current_page: files.current_page,
                                last_page: files.last_page,
                                total: files.total,
                                per_page: files.per_page
                            }}
                            onPageChange={handlePageChange}
                            onRefresh={handleRefresh}
                        />
                    </TabsContent>

                    <TabsContent value="upload">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Upload File</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <MediaUploadDropzone
                                    onUploadComplete={handleUploadComplete}
                                    accept="image/*"
                                    maxFiles={20}
                                    maxSize={5}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    )
}
