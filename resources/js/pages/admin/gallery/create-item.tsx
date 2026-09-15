import { Head, router } from '@inertiajs/react'
import { useState } from 'react'
import AppLayout from '@/layouts/app-layout'
import HeadingSmall from '@/components/organism/heading-small'
import { GalleryItemForm } from '@/components/organism/gallery-item-form'
import { BreadcrumbItem } from '@/types'
import { index as galleryRoute } from '@/routes/admin/management-content/gallery'
import { index as itemsRoute, create as itemsRouteCreate, store as itemsRouteStore } from '@/routes/admin/management-content/gallery/items'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { GalleryCategory, GalleryItemFormData } from '@/types/gallery'

interface Props {
    category: GalleryCategory
}

export default function CreateGalleryItem({ category }: Props) {
    const [isLoading, setIsLoading] = useState(false)

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Galeri',
            href: galleryRoute().url,
        },
        {
            title: category.name,
            href: itemsRoute({ category: category.id }).url,
        },
        {
            title: 'Tambah Item',
            href: itemsRouteCreate({ category: category.id }).url,
        },
    ]

    const handleSubmit = (data: GalleryItemFormData) => {
        setIsLoading(true)

        // Kirim sebagai JSON karena image_path sudah berupa string path
        router.post(itemsRouteStore({ category: category.id }).url, {
            title: data.title,
            description: data.description || '',
            image_path: data.image_path, // Sudah berupa string path
            alt_text: data.alt_text || '',
            is_active: data.is_active,
            sort_order: data.sort_order || 0,
        }, {
            onSuccess: () => {
                toast.success('Item galeri berhasil dibuat')
            },
            onError: (errors) => {
                toast.error('Gagal membuat item galeri')
                console.error(errors)
            },
            onFinish: () => {
                setIsLoading(false)
            }
        })
    }

    const handleBackToItems = () => {
        router.visit(itemsRoute({ category: category.id }).url)
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Tambah Item | ${category.name} | Admin`} />

            <div className="space-y-6 mx-auto max-w-4xl px-4 py-6">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleBackToItems}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Kembali
                    </Button>
                    <div className="flex-1">
                        <HeadingSmall
                            title={`Tambah Item ke ${category.name}`}
                            description="Tambahkan gambar baru ke kategori galeri"
                        />
                    </div>
                </div>

                <GalleryItemForm
                    category={category}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </div>
        </AppLayout>
    )
}
