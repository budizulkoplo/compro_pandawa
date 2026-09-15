// resources/js/Pages/Admin/ManagementContent/Services/Index.tsx

import { Head, Link, router } from '@inertiajs/react'
import { useState } from 'react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ServiceCard } from '@/components/molecules/service-card'
import { Service } from '@/types/service'
import { BreadcrumbItem } from '@/types'
import { Plus, Search } from 'lucide-react'
import { toast } from 'sonner'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Pagination } from '@/components/molecules/pagination'
import HeadingSmall from '@/components/organism/heading-small'
import { index as servicesIndex } from '@/routes/admin/management-content/services'

interface Props {
    services: {
        data: Service[]
        current_page: number
        last_page: number
        per_page: number
        total: number
    }
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Konten',
         href: '#'
    },
    {
        title: 'Layanan',
        href: servicesIndex().url
     },
]

export default function ServicesIndex({ services }: Props) {
    const [searchTerm, setSearchTerm] = useState('')
    const [deleteDialog, setDeleteDialog] = useState<Service | null>(null)

    const handleView = (service: Service) => {
        router.visit(`/admin/management-content/services/${service.id}`)
    }

    const handleEdit = (service: Service) => {
        router.visit(`/admin/management-content/services/${service.id}/edit`)
    }

    const handleDelete = (service: Service) => {
        setDeleteDialog(service)
    }

    const confirmDelete = () => {
        if (deleteDialog) {
            router.delete(`/admin/management-content/services/${deleteDialog.id}`, {
                onSuccess: () => {
                    toast.success('Layanan berhasil dihapus')
                    setDeleteDialog(null)
                },
                onError: () => {
                    toast.error('Gagal menghapus layanan')
                }
            })
        }
    }

    const filteredServices = services.data.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handlePageChange = (page: number) => {
        router.get('/admin/management-content/services', { page }, {
            preserveState: true,
            preserveScroll: true
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Layanan | Admin" />

            <div className="space-y-6 mx-auto max-w-4xl px-4 py-6">
                <HeadingSmall
                    title="Layanan"
                    description="Kelola layanan yang ditawarkan oleh perusahaan Anda"
                />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Cari layanan..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Link href="/admin/management-content/services/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Layanan
                        </Button>
                    </Link>
                </div>

                {filteredServices.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredServices.map((service) => (
                                <ServiceCard
                                    key={service.id}
                                    service={service}
                                    onView={handleView}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>

                        <Pagination
                            currentPage={services.current_page}
                            lastPage={services.last_page}
                            total={services.total}
                            perPage={services.per_page}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">
                            {searchTerm ? 'Tidak ada layanan yang ditemukan' : 'Belum ada layanan'}
                        </p>
                    </div>
                )}
            </div>

            <AlertDialog open={!!deleteDialog} onOpenChange={() => setDeleteDialog(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Layanan</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus layanan "{deleteDialog?.title}"?
                            Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    )
}
