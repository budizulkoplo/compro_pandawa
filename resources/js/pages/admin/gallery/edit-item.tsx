// resources/js/Pages/Admin/ManagementContent/Gallery/EditItem.tsx

import { Head, router } from '@inertiajs/react'
import { useState } from 'react'
import AppLayout from '@/layouts/app-layout'
import HeadingSmall from '@/components/organism/heading-small'
import { GalleryItemForm } from '@/components/organism/gallery-item-form'
import { BreadcrumbItem } from '@/types'
import { GalleryItem, GalleryCategory, GalleryItemFormData } from '@/types/gallery'
import galleryRoute from '@/routes/admin/management-content/gallery'
import { index as itemsRoute, edit as itemsRouteEdit, update as itemsRouteUpdate } from '@/routes/admin/management-content/gallery/items'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

interface Props {
    category: GalleryCategory
    item: GalleryItem
}

export default function EditGalleryItem({ category, item }: Props) {
    const [isLoading, setIsLoading] = useState(false)

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Galeri',
            href: galleryRoute.index().url,
        },
        {
            title: category.name,
            href: itemsRoute(category.id).url,
        },
        {
            title: item.title,
            href: itemsRouteEdit({category: category.id, item: item.id}).url,
        },
    ]

    const handleSubmit = (data: GalleryItemFormData) => {
        setIsLoading(true)

        const formData = new FormData()
        formData.append('title', data.title)
        if (data.description) {
            formData.append('description', data.description)
        }
        if (data.image_path) {
            formData.append('image_path', data.image_path)
        }
        if (data.alt_text) {
            formData.append('alt_text', data.alt_text)
        }
        formData.append('is_active', data.is_active ? '1' : '0')
        if (data.sort_order !== undefined) {
            formData.append('sort_order', data.sort_order.toString())
        }

        // Add method spoofing for PUT request
        formData.append('_method', 'PUT')

        router.post(itemsRouteUpdate({ category: category.id, item: item.id }).url, formData, {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Item galeri berhasil diperbarui')
            },
            onError: (errors) => {
                toast.error('Gagal memperbarui item galeri')
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
            <Head title={`Edit ${item.title} | ${category.name} | Admin`} />

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
                            title={`Edit: ${item.title}`}
                            description="Perbarui informasi item galeri"
                        />
                    </div>
                </div>

                <GalleryItemForm
                    category={category}
                    item={item}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </div>
        </AppLayout>
    )
}
