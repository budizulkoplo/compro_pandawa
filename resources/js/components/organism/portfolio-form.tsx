// resources/js/components/organisms/portfolio-form.tsx
import { useState } from 'react'
import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { FormField } from '@/components/molecules/form-field'
import { MultiImageUpload } from '@/components/molecules/multi-image-upload'
import { SEOFields } from '@/components/molecules/seo-fields'
import { RichTextEditor } from '@/components/editor/rich-text-editor'
import portfolioRoute from '@/routes/admin/management-content/portfolio'
import { post as portoRouteUpdate } from '@/routes/admin/management-content/portfolio/update'
import { Loader2 } from 'lucide-react'
import { FileUpload } from '../atoms/file-upload'

interface Client {
    id?: number
    name: string
    slug: string
    sector: string
    description: string
    logo_path: File | string | null
    images: string[]
    website_url: string | null
    is_active: boolean
    sort_order: number
    meta_title: string
    meta_description: string
    meta_keywords: string
}

interface PortfolioFormProps {
    client?: Client
    isEdit?: boolean
}

export function PortfolioForm({ client, isEdit = false }: PortfolioFormProps) {
    const [activeTab, setActiveTab] = useState('basic')

    const { data, setData, post, put, processing, errors } = useForm({
        name: client?.name || '',
        slug: client?.slug || '',
        sector: client?.sector || '',
        description: client?.description || '',
        logo_path: client?.logo_path || null,
        images: client?.images || [],
        website_url: client?.website_url || '',
        is_active: client?.is_active ?? true,
        sort_order: client?.sort_order || 0,
        meta_title: client?.meta_title || '',
        meta_description: client?.meta_description || '',
        meta_keywords: client?.meta_keywords || '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const action = isEdit && client && typeof client.id !== 'undefined'
            ? () => put(portoRouteUpdate({ portfolio: client.id as number }).url)
            : () => post(portfolioRoute.store.url())

        action()
    }

    const handleImageDelete = (path: string) => {
        // This will be called by the rich text editor when images are deleted
        console.log('Image deleted from editor:', path)
    }

    // Auto-generate slug from name
    const handleNameChange = (name: string) => {
        setData('name', name)
        if (!isEdit || !data.slug) {
            const slug = name
                .toLowerCase()
                                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim()
            setData('slug', slug)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">
                        {isEdit ? 'Edit Klien' : 'Tambah Klien Baru'}
                    </h2>
                    <p className="text-muted-foreground">
                        {isEdit ? 'Perbarui informasi klien' : 'Tambahkan klien/portofolio baru'}
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch
                        checked={data.is_active}
                        onCheckedChange={(checked) => setData('is_active', checked)}
                        id="is_active"
                    />
                    <Label htmlFor="is_active">Aktif</Label>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Informasi Dasar</TabsTrigger>
                    <TabsTrigger value="media">Media</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Klien</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    label="Nama Klien"
                                    name="name"
                                    value={data.name}
                                    onChange={handleNameChange}
                                    placeholder="Masukkan nama klien..."
                                    required
                                />

                                <FormField
                                    label="Sektor/Bidang"
                                    name="sector"
                                    value={data.sector}
                                    onChange={(value) => setData('sector', value)}
                                    placeholder="Contoh: Teknologi, Manufaktur, Retail..."
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    label="Slug URL"
                                    name="slug"
                                    value={data.slug}
                                    onChange={(value) => setData('slug', value)}
                                    placeholder="nama-klien"
                                    readonly={true}
                                />

                                <FormField
                                    label="Website URL"
                                    name="website_url"
                                    value={data.website_url || ''}
                                    onChange={(value) => setData('website_url', value)}
                                    placeholder="https://website-klien.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>
                                    Deskripsi Klien/Proyek
                                    <span className="text-destructive ml-1">*</span>
                                </Label>
                                <RichTextEditor
                                    content={data.description}
                                    onChange={(content) => setData('description', content)}
                                    placeholder="Deskripsikan klien atau proyek yang dikerjakan..."
                                    onImageDelete={handleImageDelete}
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">{errors.description}</p>
                                )}
                            </div>

                            <FormField
                                label="Urutan Tampil"
                                name="sort_order"
                                value={data.sort_order.toString()}
                                onChange={(value) => setData('sort_order', parseInt(value) || 0)}
                                placeholder="0"
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="media" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Logo Klien</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FileUpload
                                label="Logo Perusahaan"
                                value={typeof data.logo_path === 'string' ? data.logo_path : null}
                                onChange={(path) => {
                                    // If path is an array, take the first item, otherwise use as is
                                    if (Array.isArray(path)) {
                                        setData('logo_path', path.length > 0 ? path[0] : null)
                                    } else {
                                        setData('logo_path', path)
                                    }
                                }}
                                accept="image/*"
                                type="image"
                            />
                            {errors.logo_path && (
                                <p className="text-sm text-destructive mt-2">{errors.logo_path}</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Galeri Proyek</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <MultiImageUpload
                                label="Gambar Proyek/Aktivitas"
                                value={data.images}
                                onChange={(paths) => setData('images', paths)}
                                maxImages={10}
                            />
                            {errors.images && (
                                <p className="text-sm text-destructive mt-2">{errors.images}</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="seo" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>SEO Settings</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Optimalkan halaman klien untuk mesin pencari
                            </p>
                        </CardHeader>
                        <CardContent>
                            <SEOFields
                                metaTitle={data.meta_title}
                                metaDescription={data.meta_description}
                                metaKeywords={data.meta_keywords}
                                slug={data.slug}
                                onMetaTitleChange={(value) => setData('meta_title', value)}
                                onMetaDescriptionChange={(value) => setData('meta_description', value)}
                                onMetaKeywordsChange={(value) => setData('meta_keywords', value)}
                                onSlugChange={(value) => setData('slug', value)}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                >
                    Batal
                </Button>
                <Button
                    type="submit"
                    disabled={processing}
                    className="min-w-[120px]"
                >
                    {processing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {isEdit ? 'Memperbarui...' : 'Menyimpan...'}
                        </>
                    ) : (
                        <>{isEdit ? 'Perbarui' : 'Simpan'}</>
                    )}
                </Button>
            </div>
        </form>
    )
}
