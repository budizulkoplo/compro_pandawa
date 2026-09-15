// resources/js/components/molecules/category-form-fields.tsx

import { FormField } from '@/components/molecules/form-field'
import { SEOFields } from '@/components/molecules/seo-fields'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CategoryFormFieldsProps {
    name: string
    description: string
    slug: string
    metaTitle: string
    metaDescription: string
    metaKeywords: string
    isActive: boolean
    sortOrder: number
    onNameChange: (value: string) => void
    onDescriptionChange: (value: string) => void
    onSlugChange: (value: string) => void
    onMetaTitleChange: (value: string) => void
    onMetaDescriptionChange: (value: string) => void
    onMetaKeywordsChange: (value: string) => void
    onIsActiveChange: (value: boolean) => void
    onSortOrderChange: (value: number) => void
}

export function CategoryFormFields({
    name,
    description,
    slug,
    metaTitle,
    metaDescription,
    metaKeywords,
    isActive,
    sortOrder,
    onNameChange,
    onDescriptionChange,
    onSlugChange,
    onMetaTitleChange,
    onMetaDescriptionChange,
    onMetaKeywordsChange,
    onIsActiveChange,
    onSortOrderChange,
}: CategoryFormFieldsProps) {
    return (
        <div className="space-y-6">
            {/* Informasi Dasar */}
            <Card>
                <CardHeader>
                    <CardTitle>Informasi Dasar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField
                        label="Nama Kategori"
                        name="name"
                        value={name}
                        onChange={onNameChange}
                        required
                        placeholder="Masukkan nama kategori..."
                    />

                    <FormField
                        label="Deskripsi"
                        name="description"
                        value={description}
                        onChange={onDescriptionChange}
                        type="textarea"
                        placeholder="Masukkan deskripsi kategori..."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="sort_order">Urutan Tampilan</Label>
                            <Input
                                id="sort_order"
                                type="number"
                                min="0"
                                value={sortOrder}
                                onChange={(e) => onSortOrderChange(parseInt(e.target.value) || 0)}
                                placeholder="0"
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="is_active"
                                checked={isActive}
                                onCheckedChange={onIsActiveChange}
                            />
                            <Label htmlFor="is_active">Aktif</Label>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>Pengaturan SEO</CardTitle>
                </CardHeader>
                <CardContent>
                    <SEOFields
                        slug={slug}
                        metaTitle={metaTitle}
                        metaDescription={metaDescription}
                        metaKeywords={metaKeywords}
                        onSlugChange={onSlugChange}
                        onMetaTitleChange={onMetaTitleChange}
                        onMetaDescriptionChange={onMetaDescriptionChange}
                        onMetaKeywordsChange={onMetaKeywordsChange}
                    />
                </CardContent>
            </Card>
        </div>
    )
}
