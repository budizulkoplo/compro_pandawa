// resources/js/pages/admin/portfolio/index.tsx
import { Head, Link, router } from '@inertiajs/react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ActionButton } from '@/components/atoms/action-button'
import { StatusBadge } from '@/components/atoms/status-badge'
import { SearchInput } from '@/components/atoms/search-input'
import { Pagination } from '@/components/molecules/pagination'
import AppLayout from '@/layouts/app-layout'
import HeadingSmall from '@/components/organism/heading-small'
import { Plus, Edit, Eye, Trash2, ExternalLink, Image } from 'lucide-react'
import { toast } from 'sonner'
import portfolioRoute from '@/routes/admin/management-content/portfolio'

interface Client {
    id: number
    name: string
    slug: string
    sector: string
    description: string
    logo_path: string | null
    images: string[]
    website_url: string | null
    is_active: boolean
    sort_order: number
    created_at: string
    updated_at: string
    logo_url?: string
    image_urls?: string[]
}

interface PaginatedClients {
    data: Client[]
    current_page: number
    last_page: number
    per_page: number
    total: number
}

interface Props {
    clients: PaginatedClients
    filters: {
        search?: string
        status?: string
        sort_by?: string
        sort_direction?: string
    }
}

const breadcrumbs = [
    {
        title: 'Portofolio',
        href: portfolioRoute.index().url,
    },
]

export default function PortfolioIndex({ clients, filters }: Props) {
    const [deleteModal, setDeleteModal] = useState<{ open: boolean; client: Client | null }>({
        open: false,
        client: null
    })

    const handleSearch = (search: string) => {
        router.get(portfolioRoute.index().url,
            { ...filters, search, page: 1 },
            { preserveState: true, replace: true }
        )
    }

    const handleStatusFilter = (status: string) => {
        const statusValue = status === 'all' ? undefined : status
        router.get(portfolioRoute.index().url,
            { ...filters, status: statusValue, page: 1 },
            { preserveState: true, replace: true }
        )
    }

    const handlePageChange = (page: number) => {
        router.get(portfolioRoute.index().url,
            { ...filters, page },
            { preserveState: true, replace: true }
        )
    }

    const handleDelete = () => {
        if (!deleteModal.client) return

        router.delete(portfolioRoute.destroy({ portfolio: deleteModal.client.id }).url, {
            onSuccess: () => {
                toast.success('Klien berhasil dihapus')
                setDeleteModal({ open: false, client: null })
            },
            onError: () => {
                toast.error('Gagal menghapus klien')
            }
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Portofolio Klien | Admin" />

            <div className="space-y-6 mx-auto max-w-4xl px-4 py-6 w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <HeadingSmall
                        title="Manajemen Portofolio"
                        description="Kelola daftar klien dan proyek perusahaan"
                    />

                    <Button asChild>
                        <Link href={portfolioRoute.create().url}>
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Klien
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <SearchInput
                                    value={filters.search || ''}
                                    onChange={handleSearch}
                                    placeholder="Cari klien, sektor, atau deskripsi..."
                                />
                            </div>

                            <Select
                                value={filters.status || 'all'}
                                onValueChange={handleStatusFilter}
                            >
                                <SelectTrigger className="w-full md:w-48">
                                    <SelectValue placeholder="Filter Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Status</SelectItem>
                                    <SelectItem value="1">Aktif</SelectItem>
                                    <SelectItem value="0">Tidak Aktif</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Client Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {clients.data.map((client) => (
                        <Card key={client.id} className="group hover:shadow-lg transition-shadow w-full">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg line-clamp-1">
                                            {client.name}
                                        </CardTitle>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {client.sector}
                                        </p>
                                    </div>
                                    <StatusBadge isActive={client.is_active} />
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4 w-full">
                                {/* Logo */}
                                {client.logo_path && (
                                    <div className="flex justify-center">
                                        <img
                                            src={`/storage/${client.logo_path}`}
                                            alt={`Logo ${client.name}`}
                                            className="h-16 w-auto object-contain rounded"
                                        />
                                    </div>
                                )}

                                {/* Description Preview */}
                                <div
                                    className="text-sm text-muted-foreground line-clamp-3 prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: client.description.substring(0, 150) + '...'
                                    }}
                                />

                                {/* Image Count */}
                                {client.images && client.images.length > 0 && (
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Image className="w-4 h-4" />
                                        {client.images.length} gambar
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex items-center justify-between pt-2 border-t">
                                    <div className="flex items-center gap-1">
                                        <ActionButton
                                            icon={Eye}
                                            onClick={() => router.visit(portfolioRoute.show({ portfolio: client.id }).url)}
                                            title="Lihat Detail"
                                            variant="outline"
                                        />

                                        <ActionButton
                                            icon={Edit}
                                            onClick={() => router.visit(portfolioRoute.edit({ portfolio: client.id }).url)}
                                            title="Edit"
                                            variant="outline"
                                        />

                                        {client.website_url && (
                                            <ActionButton
                                                icon={ExternalLink}
                                                onClick={() => window.open(client.website_url!, '_blank')}
                                                title="Kunjungi Website"
                                                variant="outline"
                                            />
                                        )}
                                    </div>

                                    <ActionButton
                                        icon={Trash2}
                                        onClick={() => setDeleteModal({ open: true, client })}
                                        title="Hapus"
                                        variant="destructive"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {clients.data.length === 0 && (
                    <Card>
                        <CardContent className="text-center py-12">
                            <div className="text-muted-foreground">
                                <Image className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p className="text-lg font-medium mb-2">Belum ada klien</p>
                                <p className="text-sm mb-4">
                                    {filters.search
                                        ? 'Tidak ada klien yang sesuai dengan pencarian'
                                        : 'Tambahkan klien pertama Anda'
                                    }
                                </p>
                                {!filters.search && (
                                    <Button asChild>
                                        <Link href={portfolioRoute.create().url}>
                                            <Plus className="w-4 h-4 mr-2" />
                                            Tambah Klien
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {clients.last_page > 1 && (
                    <Pagination
                        currentPage={clients.current_page}
                        lastPage={clients.last_page}
                        total={clients.total}
                        perPage={clients.per_page}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>

            {/* Delete Modal */}
            <Dialog open={deleteModal.open} onOpenChange={(open) => setDeleteModal({ open, client: null })}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Hapus</DialogTitle>
                        <DialogDescription>
                            Apakah Anda yakin ingin menghapus klien <strong>{deleteModal.client?.name}</strong>?
                            <br />
                            Tindakan ini tidak dapat dibatalkan dan akan menghapus semua data terkait.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteModal({ open: false, client: null })}
                        >
                            Batal
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Hapus
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    )
}
