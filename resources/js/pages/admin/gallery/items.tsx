// resources/js/Pages/Admin/ManagementContent/Gallery/Items.tsx

import { Head, router } from '@inertiajs/react'
import { useState } from 'react'
import AppLayout from '@/layouts/app-layout'
import HeadingSmall from '@/components/organism/heading-small'
import { DataTableHeader } from '@/components/molecules/data-table-header'
import { GalleryItemCard } from '@/components/molecules/gallery-item-card'
import { Pagination } from '@/components/molecules/pagination'
import { BreadcrumbItem } from '@/types'
import { GalleryItem, GalleryCategory, PaginatedResponse } from '@/types/gallery'
import { index as galleryRoute } from '@/routes/admin/management-content/gallery'
import * as itemsRoute from '@/routes/admin/management-content/gallery/items'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
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

interface Props {
    category: GalleryCategory
    items: PaginatedResponse<GalleryItem>
    filters: {
        search: string
        per_page: number
    }
}

export default function GalleryItems({ category, items, filters }: Props) {
    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean
        item: GalleryItem | null
    }>({
        open: false,
        item: null
    })

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Galeri',
            href: galleryRoute().url,
        },
        {
            title: category.name,
            href: itemsRoute.index(category.id).url,
        },
    ]

    const handleSearch = (search: string) => {
        router.get(itemsRoute.index(category.id).url, {
            search,
            per_page: filters.per_page,
        }, {
            preserveState: true,
            replace: true,
        })
    }

    const handlePageChange = (page: number) => {
        router.get(itemsRoute.index(category.id).url, {
            ...filters,
            page,
        }, {
            preserveState: true,
            replace: true,
        })
    }

    const handleCreateItem = () => {
        router.visit(itemsRoute.create(category.id).url)
    }

    const handleEditItem = (item: GalleryItem) => {
        router.visit(itemsRoute.edit({ category: category.id, item: item.id }).url)
    }

    const handleDeleteItem = (item: GalleryItem) => {
        setDeleteDialog({
            open: true,
            item
        })
    }

    const confirmDeleteItem = () => {
        if (!deleteDialog.item) return

        router.delete(itemsRoute.destroy({ category: category.id, item: deleteDialog.item.id }).url, {
            onSuccess: () => {
                toast.success('Item galeri berhasil dihapus')
                setDeleteDialog({ open: false, item: null })
            },
            onError: (errors) => {
                toast.error(errors.message || 'Gagal menghapus item galeri')
            }
        })
    }

    const handleBackToCategories = () => {
        router.visit(galleryRoute().url)
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${category.name} | Galeri | Admin`} />

            <div className="space-y-6 mx-auto max-w-4xl px-4 py-6">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleBackToCategories}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Kembali
                    </Button>
                    <div className="flex-1">
                        <HeadingSmall
                            title={category.name}
                            description={`${items.total} item dalam kategori ini`}
                        />
                    </div>
                </div>

                <DataTableHeader
                    title="Item Galeri"
                    searchValue={filters.search}
                    onSearchChange={handleSearch}
                    onCreateClick={handleCreateItem}
                    createButtonText="Tambah Item"
                />

                {/* Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {items.data.map((item) => (
                        <GalleryItemCard
                            key={item.id}
                            item={item}
                            onEdit={() => handleEditItem(item)}
                            onDelete={() => handleDeleteItem(item)}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {items.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="mx-auto max-w-sm">
                            <div className="rounded-full bg-muted/50 p-6 mx-auto w-fit mb-4">
                                <svg
                                    className="h-12 w-12 text-muted-foreground"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-foreground mb-2">
                                {filters.search ? 'Tidak ada hasil' : 'Belum ada item'}
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                {filters.search
                                    ? `Tidak ditemukan item yang sesuai dengan "${filters.search}"`
                                    : 'Mulai dengan menambahkan gambar pertama ke kategori ini'
                                }
                            </p>
                            {!filters.search && (
                                <button
                                    onClick={handleCreateItem}
                                    className="text-primary hover:text-primary/80 font-medium"
                                >
                                    Tambah Item Pertama
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {items.last_page > 1 && (
                    <Pagination
                        currentPage={items.current_page}
                        lastPage={items.last_page}
                        total={items.total}
                        perPage={items.per_page}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>

            {/* Delete Dialog */}
            <AlertDialog
                open={deleteDialog.open}
                onOpenChange={(open) => setDeleteDialog({ open, item: null })}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Item Galeri</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus item "{deleteDialog.item?.title}"?
                            Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDeleteItem}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    )
}
