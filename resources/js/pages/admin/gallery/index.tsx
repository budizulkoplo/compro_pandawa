import { Head, router } from '@inertiajs/react'
import { useState } from 'react'
import AppLayout from '@/layouts/app-layout'
import HeadingSmall from '@/components/organism/heading-small'
import { DataTableHeader } from '@/components/molecules/data-table-header'
import { GalleryCategoryCard } from '@/components/molecules/gallery-category-card'
import { Pagination } from '@/components/molecules/pagination'
import { BreadcrumbItem } from '@/types'
import { index as galleryIndex } from '@/routes/admin/management-content/gallery'
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
import { GalleryCategory, PaginatedResponse } from '@/types/gallery'
import { create as galleryRouteCreate, edit as galleryRouteEdit, destroy as galleryRouteDestroy } from '@/routes/admin/management-content/gallery/category'
import { index as itemsRoute, create as itemsRouteCreate } from '@/routes/admin/management-content/gallery/items'

interface Props {
    categories: PaginatedResponse<GalleryCategory>
    filters: {
        search: string
        per_page: number
    }
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Galeri',
        href: galleryIndex.url(),
    },
]

export default function GalleryIndex({ categories, filters }: Props) {
    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean
        category: GalleryCategory | null
    }>({
        open: false,
        category: null
    })

    const handleSearch = (search: string) => {
        router.get(galleryIndex.url(), {
            search,
            per_page: filters.per_page,
        }, {
            preserveState: true,
            replace: true,
        })
    }

    const handlePageChange = (page: number) => {
        router.get(galleryIndex.url(), {
            ...filters,
            page,
        }, {
            preserveState: true,
            replace: true,
        })
    }

    const handleCreateCategory = () => {
        router.visit(galleryRouteCreate.url())
    }

    const handleEditCategory = (category: GalleryCategory) => {
        router.visit(galleryRouteEdit(category.id).url)
    }

    const handleDeleteCategory = (category: GalleryCategory) => {
        setDeleteDialog({
            open: true,
            category
        })
    }

    const confirmDeleteCategory = () => {
        if (!deleteDialog.category) return

        router.delete(galleryRouteDestroy(deleteDialog.category.id).url, {
            onSuccess: () => {
                toast.success('Kategori berhasil dihapus')
                setDeleteDialog({ open: false, category: null })
            },
            onError: (errors) => {
                toast.error(errors.message || 'Gagal menghapus kategori')
            }
        })
    }

    const handleViewItems = (category: GalleryCategory) => {
        router.visit(itemsRoute(category.id).url)
    }

    const handleAddItem = (category: GalleryCategory) => {
        router.visit(itemsRouteCreate(category.id).url)
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Galeri | Admin" />

            <div className="space-y-6 mx-auto max-w-4xl px-4 py-6">
                <HeadingSmall
                    title="Galeri"
                    description="Kelola kategori dan item galeri"
                />

                <DataTableHeader
                    title="Kategori Galeri"
                    searchValue={filters.search}
                    onSearchChange={handleSearch}
                    onCreateClick={handleCreateCategory}
                    createButtonText="Tambah Kategori"
                />

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categories.data.map((category) => (
                        <GalleryCategoryCard
                            key={category.id}
                            category={category}
                            onEdit={() => handleEditCategory(category)}
                            onDelete={() => handleDeleteCategory(category)}
                            onViewItems={() => handleViewItems(category)}
                            onAddItem={() => handleAddItem(category)}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {categories.data.length === 0 && (
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
                                {filters.search ? 'Tidak ada hasil' : 'Belum ada kategori'}
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                {filters.search
                                    ? `Tidak ditemukan kategori yang sesuai dengan "${filters.search}"`
                                    : 'Mulai dengan membuat kategori galeri pertama Anda'
                                }
                            </p>
                            {!filters.search && (
                                <button
                                    onClick={handleCreateCategory}
                                    className="text-primary hover:text-primary/80 font-medium"
                                >
                                    Tambah Kategori Pertama
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {categories.last_page > 1 && (
                    <Pagination
                        currentPage={categories.current_page}
                        lastPage={categories.last_page}
                        total={categories.total}
                        perPage={categories.per_page}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>

            {/* Delete Dialog */}
            <AlertDialog
                open={deleteDialog.open}
                onOpenChange={(open) => setDeleteDialog({ open, category: null })}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Kategori</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus kategori "{deleteDialog.category?.name}"?
                            Semua gambar dalam kategori ini juga akan dihapus. Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDeleteCategory}
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
