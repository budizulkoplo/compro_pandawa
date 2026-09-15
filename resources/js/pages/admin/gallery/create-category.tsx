import { Head, router } from '@inertiajs/react'
import { useState } from 'react'
import AppLayout from '@/layouts/app-layout'
import HeadingSmall from '@/components/organism/heading-small'
import { GalleryCategoryForm } from '@/components/organism/gallery-category-form'
import { BreadcrumbItem } from '@/types'
import { index as galleryRoute } from '@/routes/admin/management-content/gallery'
import category from '@/routes/admin/management-content/gallery/category'
import { toast } from 'sonner'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Galeri',
        href: galleryRoute.url(),
    },
    {
        title: 'Tambah Kategori',
        href: category.create().url,
    },
]

export default function CreateGalleryCategory() {
    const [isLoading, setIsLoading] = useState(false)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = (data: any) => {
        setIsLoading(true)

        router.post(category.store().url, data, {
            onSuccess: () => {
                toast.success('Kategori galeri berhasil dibuat')
            },
            onError: (errors) => {
                toast.error('Gagal membuat kategori galeri')
                console.error(errors)
            },
            onFinish: () => {
                setIsLoading(false)
            }
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Kategori Galeri | Admin" />

            <div className="space-y-6 mx-auto max-w-4xl px-4 py-6">
                <HeadingSmall
                    title="Tambah Kategori Galeri"
                    description="Buat kategori baru untuk mengelompokkan gambar galeri"
                />

                <GalleryCategoryForm
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </div>
        </AppLayout>
    )
}
