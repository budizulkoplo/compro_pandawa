import { FormField } from '@/components/molecules/form-field'
import { FileUpload } from '@/components/atoms/file-upload'
import { RichTextEditor } from '@/components/editor/rich-text-editor'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { ServiceFormData } from '@/types/service'

interface ServiceFormFieldsProps {
    formData: ServiceFormData
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFieldChange: (field: keyof ServiceFormData, value: any) => void
    errors?: Record<string, string>
    existingImageUrl?: string | null
}

export function ServiceFormFields({
    formData,
    onFieldChange,
    errors = {},
    existingImageUrl = null
}: ServiceFormFieldsProps) {
    // Determine which image to show: new upload or existing
        const imagePreview =
            formData.image instanceof File
                ? URL.createObjectURL(formData.image)
                : existingImageUrl || null

    return (
        <div className="space-y-6">
            <FormField
                label="Judul Layanan"
                name="title"
                value={formData.title}
                onChange={(value) => onFieldChange('title', value)}
                placeholder="Masukkan judul layanan..."
                required
            />

            <FormField
                label="Deskripsi Singkat"
                name="description"
                value={formData.description}
                onChange={(value) => onFieldChange('description', value)}
                type="textarea"
                placeholder="Masukkan deskripsi singkat layanan..."
                required
            />

            <div className="space-y-2">
                <Label>Konten Layanan</Label>
                <RichTextEditor
                    content={formData.content}
                    onChange={(content) => onFieldChange('content', content)}
                    placeholder="Tulis konten lengkap layanan..."
                />
            </div>

            <FileUpload
                label="Gambar Layanan"
                accept="image/*"
                value={imagePreview}
                onChange={(file) => onFieldChange('image', file)}
                type="image"
                error={errors.image}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    label="Urutan"
                    name="sortOrder"
                    value={formData.sortOrder.toString()}
                    onChange={(value) => onFieldChange('sortOrder', parseInt(value) || 0)}
                    placeholder="0"
                />

                <div className="flex items-center space-x-2">
                    <Switch
                        id="isActive"
                        checked={formData.isActive}
                        onCheckedChange={(checked) => onFieldChange('isActive', checked)}
                    />
                    <Label htmlFor="isActive">Aktifkan Layanan</Label>
                </div>
            </div>
        </div>
    )
}
