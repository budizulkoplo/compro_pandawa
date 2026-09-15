// resources/js/components/molecules/item-form-fields.tsx

import { FormField } from '@/components/molecules/form-field'
import { ImageUploadField } from '@/components/molecules/image-upload-field'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ItemFormFieldsProps {
    title: string
    description: string
    imagePath: string | null
    altText: string
    isActive: boolean
    sortOrder: number
    categoryId?: number
    onTitleChange: (value: string) => void
    onDescriptionChange: (value: string) => void
    onImagePathChange: (path: string | null) => void // Bisa null
    onAltTextChange: (value: string) => void
    onIsActiveChange: (value: boolean) => void
    onSortOrderChange: (value: number) => void
}

export function ItemFormFields({
    title,
    description,
    imagePath,
    altText,
    isActive,
    sortOrder,
    categoryId,
    onTitleChange,
    onDescriptionChange,
    onImagePathChange,
    onAltTextChange,
    onIsActiveChange,
    onSortOrderChange,
}: ItemFormFieldsProps) {
    return (
        <div className="space-y-6">
            {/* Upload Gambar */}
            <Card>
                <CardHeader>
                    <CardTitle>Gambar</CardTitle>
                </CardHeader>
                <CardContent>
                    <ImageUploadField
                        label="Upload Gambar"
                        value={imagePath}
                        onChange={onImagePathChange}
                        required
                        categoryId={categoryId}
                        title={title}
                        context="gallery"
                    />
                </CardContent>
            </Card>

            {/* Informasi Dasar */}
            <Card>
                <CardHeader>
                    <CardTitle>Informasi Dasar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField
                        label="Judul"
                        name="title"
                        value={title}
                        onChange={onTitleChange}
                        required
                        placeholder="Masukkan judul gambar..."
                    />

                    <FormField
                        label="Deskripsi"
                        name="description"
                        value={description}
                        onChange={onDescriptionChange}
                        type="textarea"
                        placeholder="Masukkan deskripsi gambar..."
                    />

                    <FormField
                        label="Alt Text"
                        name="alt_text"
                        value={altText}
                        onChange={onAltTextChange}
                        placeholder="Text alternatif untuk SEO dan aksesibilitas..."
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
        </div>
    )
}
