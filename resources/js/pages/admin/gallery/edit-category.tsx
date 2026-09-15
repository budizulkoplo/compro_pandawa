
import { Head, router } from '@inertiajs/react'
import { useState } from 'react'
import AppLayout from '@/layouts/app-layout'
import HeadingSmall from '@/components/organism/heading-small'
import { GalleryCategoryForm } from '@/components/organism/gallery-category-form'
import { BreadcrumbItem} from '@/types'
import * as categoryRoute from '@/routes/admin/management-content/gallery/category'
import { index as galleryIndex } from '@/routes/admin/management-content/gallery'
import { toast } from 'sonner'
import { GalleryCategory, GalleryCategoryFormData } from '@/types/gallery'

interface Props {
    category: GalleryCategory
}

export default function EditGalleryCategory({ category }: Props) {
    const [isLoading, setIsLoading] = useState(false)

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Galeri',
            href: galleryIndex().url,
        },
        {
            title: category.name,
            href: categoryRoute.edit(category.id).url,
        },
    ]

    const handleSubmit = (data: GalleryCategoryFormData) => {
        setIsLoading(true)

        const submitData = {
            name: data.name,
            description: data.description || '',
            meta_title: data.meta_title || '',
            meta_description: data.meta_description || '',
            meta_keywords: data.meta_keywords || '',
            is_active: data.is_active,
            sort_order: data.sort_order || 0,
        }

        router.put(categoryRoute.update(category.id).url, submitData, {
            onSuccess: () => {
                toast.success('Kategori galeri berhasil diperbarui')
            },
            onError: (errors) => {
                toast.error('Gagal memperbarui kategori galeri')
                console.error(errors)
            },
            onFinish: () => {
                setIsLoading(false)
            }
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${category.name} | Admin`} />

            <div className="space-y-6 mx-auto max-w-4xl px-4 py-6">
                <HeadingSmall
                    title={`Edit Kategori: ${category.name}`}
                    description="Perbarui informasi kategori galeri"
                />

                <GalleryCategoryForm
                    category={category}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </div>
        </AppLayout>
    )
}
