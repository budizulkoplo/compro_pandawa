// resources/js/components/templates/certificate-list.tsx

import { useState } from 'react'
import { router } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SearchInput } from '@/components/atoms/search-input'
import { CertificateCard } from '@/components/molecules/certificate-card'
import { Pagination } from '@/components/molecules/pagination'
import { Plus, Filter, SortAsc, SortDesc } from 'lucide-react'
import { toast } from 'sonner'

interface Certificate {
    id: number
    title: string
    issuer?: string
    issued_at?: string
    expired_at?: string
    image_path?: string
    image_url?: string
    description?: string
    is_active: boolean
    sort_order: number
}

interface PaginationData {
    current_page: number
    last_page: number
    per_page: number
    total: number
    data: Certificate[]
}

interface Filters {
    search?: string
    status?: string
    sort_by?: string
    sort_order?: 'asc' | 'desc'
}

interface CertificateListProps {
    certificates: PaginationData
    filters: Filters
    onCreateNew: () => void
    onViewDetail: (certificate: Certificate) => void
    onEdit: (certificate: Certificate) => void
}

export function CertificateList({
    certificates,
    filters,
    onCreateNew,
    onViewDetail,
    onEdit
}: CertificateListProps) {
    const [localFilters, setLocalFilters] = useState<Filters>(filters)

    const updateFilters = (newFilters: Partial<Filters>) => {
        const updatedFilters = { ...localFilters, ...newFilters }
        setLocalFilters(updatedFilters)

        router.get('/admin/certificates', updatedFilters, {
            preserveState: true,
            preserveScroll: true,
        })
    }

    const handleDelete = (certificate: Certificate) => {
        if (confirm(`Apakah Anda yakin ingin menghapus sertifikat "${certificate.title}"?`)) {
            router.delete(`/admin/certificates/${certificate.id}`, {
                onSuccess: () => {
                    toast.success('Sertifikat berhasil dihapus')
                },
                onError: () => {
                    toast.error('Gagal menghapus sertifikat')
                }
            })
        }
    }

    const handlePageChange = (page: number) => {
        router.get('/admin/certificates', { ...localFilters, page }, {
            preserveState: true,
            preserveScroll: true,
        })
    }

    const toggleSort = (field: string) => {
        const currentOrder = localFilters.sort_by === field && localFilters.sort_order === 'asc' ? 'desc' : 'asc'
        updateFilters({ sort_by: field, sort_order: currentOrder })
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Sertifikat</h1>
                    <p className="text-muted-foreground">Kelola sertifikat perusahaan</p>
                </div>

                <Button onClick={onCreateNew} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Tambah Sertifikat
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Filter & Pencarian
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <SearchInput
                            value={localFilters.search || ''}
                            onChange={(value) => updateFilters({ search: value })}
                            placeholder="Cari nama sertifikat atau penerbit..."
                            className="md:col-span-2"
                        />

                        <Select
                            value={localFilters.status || 'all'}
                                                        onValueChange={(value) => updateFilters({ status: value === 'all' ? '' : value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Status</SelectItem>
                                <SelectItem value="active">Aktif</SelectItem>
                                <SelectItem value="inactive">Tidak Aktif</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="flex items-center gap-2">
                            <Select
                                value={localFilters.sort_by || 'sort_order'}
                                onValueChange={(value) => updateFilters({ sort_by: value })}
                            >
                                <SelectTrigger className="flex-1">
                                    <SelectValue placeholder="Urutkan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sort_order">Urutan</SelectItem>
                                    <SelectItem value="title">Nama</SelectItem>
                                    <SelectItem value="issued_at">Tanggal Terbit</SelectItem>
                                    <SelectItem value="created_at">Tanggal Dibuat</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleSort(localFilters.sort_by || 'sort_order')}
                                className="px-3"
                            >
                                {localFilters.sort_order === 'desc' ?
                                    <SortDesc className="w-4 h-4" /> :
                                    <SortAsc className="w-4 h-4" />
                                }
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Menampilkan {certificates.data.length} dari {certificates.total} sertifikat
                    </p>
                </div>

                {certificates.data.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <div className="space-y-4">
                                <div className="w-16 h-16 mx-auto bg-secondary rounded-full flex items-center justify-center">
                                    <Plus className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium">Belum ada sertifikat</h3>
                                    <p className="text-muted-foreground">
                                        {localFilters.search ?
                                            'Tidak ada hasil yang sesuai dengan pencarian Anda.' :
                                            'Mulai dengan menambahkan sertifikat pertama.'
                                        }
                                    </p>
                                </div>
                                {!localFilters.search && (
                                    <Button onClick={onCreateNew}>
                                        Tambah Sertifikat Pertama
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {certificates.data.map((certificate) => (
                                <CertificateCard
                                    key={certificate.id}
                                    certificate={certificate}
                                    onView={() => onViewDetail(certificate)}
                                    onEdit={() => onEdit(certificate)}
                                    onDelete={() => handleDelete(certificate)}
                                />
                            ))}
                        </div>

                        {certificates.last_page > 1 && (
                            <Pagination
                                currentPage={certificates.current_page}
                                lastPage={certificates.last_page}
                                total={certificates.total}
                                perPage={certificates.per_page}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
