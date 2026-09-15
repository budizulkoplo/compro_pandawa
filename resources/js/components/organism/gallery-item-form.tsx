// resources/js/components/organism/gallery-item-form.tsx

import { useState } from 'react'
import { router } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { ItemFormFields } from '@/components/molecules/item-form-fields'
import { GalleryItem, GalleryCategory } from '@/types/gallery'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface GalleryItemFormProps {
    item?: GalleryItem
    category: GalleryCategory
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit: (data: any) => void
    isLoading?: boolean
}

export function GalleryItemForm({
    item,
    category,
    onSubmit,
    isLoading = false
}: GalleryItemFormProps) {
    const [formData, setFormData] = useState({
        title: item?.title || '',
        description: item?.description || '',
        image_path: item?.image_path || null,
        alt_text: item?.alt_text || '',
        is_active: item?.is_active ?? true,
        sort_order: item?.sort_order || 0,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.title.trim()) {
            toast.error('Judul wajib diisi')
            return
        }

        if (!formData.image_path) {
            toast.error('Gambar wajib diupload')
            return
        }

        // Submit langsung formData karena image_path sudah berupa path string
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <ItemFormFields
                title={formData.title}
                description={formData.description}
                imagePath={formData.image_path}
                altText={formData.alt_text}
                isActive={formData.is_active}
                sortOrder={formData.sort_order}
                categoryId={category.id}
                onTitleChange={(value) => {
                    setFormData(prev => ({
                        ...prev,
                        title: value,
                        alt_text: prev.alt_text === prev.title || !prev.alt_text ? value : prev.alt_text
                    }))
                }}
                onDescriptionChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                onImagePathChange={(path) => setFormData(prev => ({ ...prev, image_path: path }))}
                onAltTextChange={(value) => setFormData(prev => ({ ...prev, alt_text: value }))}
                onIsActiveChange={(value) => setFormData(prev => ({ ...prev, is_active: value }))}
                onSortOrderChange={(value) => setFormData(prev => ({ ...prev, sort_order: value }))}
            />

            <div className="flex gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.visit(`/admin/management-content/gallery/category/${category.id}/items`)}
                    disabled={isLoading}
                >
                    Batal
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {item ? 'Perbarui' : 'Simpan'}
                </Button>
            </div>
        </form>
    )
}
