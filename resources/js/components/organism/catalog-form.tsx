import { FormEvent } from 'react'
import { useForm } from '@inertiajs/react'
import { Catalog, CatalogFormData } from '@/types/catalog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RichTextEditor } from '@/components/editor/rich-text-editor'
import { toast } from 'sonner'
import { Loader2, Save } from 'lucide-react'
import { create as createRoute } from '@/routes/admin/management-content/catalog'

interface CatalogFormProps {
    catalog?: Catalog
    services: { id: number; title: string }[]
    isEditing?: boolean
}

export function CatalogForm({ catalog, services, isEditing = false }: CatalogFormProps) {
    const { data, setData, post, processing, errors } = useForm<CatalogFormData>({
        name: catalog?.name || '',
        slug: catalog?.slug || '',
        description: catalog?.description || '',
        price: catalog?.price?.toString() || '',
        image: null,
        service_id: catalog?.service_id?.toString() || '',
        isActive: catalog?.isActive ?? true,
        sortOrder: catalog?.sortOrder || 0,
    })

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()

        post(isEditing ? `/admin/management-content/catalog/${catalog!.id}` : createRoute().url.replace('/create', ''), {
            forceFormData: true,
            onSuccess: () => toast.success(isEditing ? 'Katalog berhasil diperbarui' : 'Katalog berhasil ditambahkan'),
            onError: () => toast.error(isEditing ? 'Gagal memperbarui katalog' : 'Gagal menambahkan katalog'),
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>{isEditing ? 'Edit Katalog' : 'Tambah Katalog'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama katalog</Label>
                            <Input id="name" value={data.name} onChange={(event) => {
                                const name = event.target.value
                                setData('name', name)
                                setData('slug', name.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-'))
                            }} required />
                            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Harga</Label>
                            <Input id="price" type="number" min="0" step="0.01" value={data.price} onChange={(event) => setData('price', event.target.value)} placeholder="Opsional" />
                            {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Deskripsi</Label>
                        <RichTextEditor
                            content={data.description}
                            onChange={(description) => setData('description', description)}
                        />
                        {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="service_id">Layanan</Label>
                        <Select value={data.service_id || 'none'} onValueChange={(value) => setData('service_id', value === 'none' ? '' : value)}>
                            <SelectTrigger id="service_id">
                                <SelectValue placeholder="Pilih layanan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">Tanpa layanan</SelectItem>
                                {services.map((service) => (
                                    <SelectItem key={service.id} value={service.id.toString()}>{service.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.service_id && <p className="text-sm text-destructive">{errors.service_id}</p>}
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="image">Gambar katalog</Label>
                            <Input id="image" type="file" accept="image/*" onChange={(event) => setData('image', event.target.files?.[0] || null)} />
                            {catalog?.image && <img src={`/storage/${catalog.image}`} alt={catalog.name} className="mt-2 h-32 w-48 rounded-md object-cover" />}
                            {errors.image && <p className="text-sm text-destructive">{errors.image}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sortOrder">Urutan tampil</Label>
                            <Input id="sortOrder" type="number" min="0" value={data.sortOrder} onChange={(event) => setData('sortOrder', Number(event.target.value))} />
                        </div>
                    </div>

                    <label className="flex items-center gap-3">
                        <Checkbox checked={data.isActive} onCheckedChange={(checked) => setData('isActive', checked === true)} />
                        <span className="text-sm font-medium">Tampilkan katalog di website</span>
                    </label>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => window.history.back()} disabled={processing}>Batal</Button>
                <Button type="submit" disabled={processing}>
                    {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    {isEditing ? 'Simpan Perubahan' : 'Tambah Katalog'}
                </Button>
            </div>
        </form>
    )
}