// resources/js/components/organism/gallery-category-form.tsx

import { useState } from 'react'
import { router } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { CategoryFormFields } from '@/components/molecules/category-form-fields'
import { GalleryCategory } from '@/types/gallery'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface GalleryCategoryFormProps {
    category?: GalleryCategory
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit: (data: any) => void
    isLoading?: boolean
}

export function GalleryCategoryForm({
    category,
    onSubmit,
    isLoading = false
}: GalleryCategoryFormProps) {
    const [formData, setFormData] = useState({
        name: category?.name || '',
        description: category?.description || '',
        slug: category?.slug || '',
        meta_title: category?.meta_title || '',
        meta_description: category?.meta_description || '',
        meta_keywords: category?.meta_keywords || '',
        is_active: category?.is_active ?? true,
        sort_order: category?.sort_order || 0,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name.trim()) {
            toast.error('Nama kategori wajib diisi')
            return
        }

        onSubmit(formData)
    }

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim()
    }

    const handleNameChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            name: value,
            slug: prev.slug === generateSlug(prev.name) || !prev.slug ? generateSlug(value) : prev.slug,
            meta_title: prev.meta_title === prev.name || !prev.meta_title ? value : prev.meta_title
        }))
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <CategoryFormFields
                name={formData.name}
                description={formData.description}
                slug={formData.slug}
                metaTitle={formData.meta_title}
                metaDescription={formData.meta_description}
                metaKeywords={formData.meta_keywords}
                isActive={formData.is_active}
                sortOrder={formData.sort_order}
                onNameChange={handleNameChange}
                onDescriptionChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                onSlugChange={(value) => setFormData(prev => ({ ...prev, slug: value }))}
                onMetaTitleChange={(value) => setFormData(prev => ({ ...prev, meta_title: value }))}
                onMetaDescriptionChange={(value) => setFormData(prev => ({ ...prev, meta_description: value }))}
                onMetaKeywordsChange={(value) => setFormData(prev => ({ ...prev, meta_keywords: value }))}
                onIsActiveChange={(value) => setFormData(prev => ({ ...prev, is_active: value }))}
                onSortOrderChange={(value) => setFormData(prev => ({ ...prev, sort_order: value }))}
            />

            <div className="flex gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.visit('/admin/management-content/gallery')}
                    disabled={isLoading}
                >
                    Batal
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {category ? 'Perbarui' : 'Simpan'}
                </Button>
            </div>
        </form>
    )
}
