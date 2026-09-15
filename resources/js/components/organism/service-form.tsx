// resources/js/components/organism/service-form.tsx

import { useState, FormEvent, useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ServiceFormFields } from '@/components/molecules/service-form-fields'
import { SEOFields } from '@/components/molecules/seo-fields'
import { Service, ServiceFormData } from '@/types/service'
import { toast } from 'sonner'
import { Loader2, Save } from 'lucide-react'
import { store as storeRoute } from '@/routes/admin/management-content/services'
import { post as updateRoute } from '@/routes/admin/management-content/services/update'

interface ServiceFormProps {
    service?: Service
    isEditing?: boolean
}

export function ServiceForm({ service, isEditing = false }: ServiceFormProps) {
    const [activeTab, setActiveTab] = useState('basic')

    const { data, setData, post, processing, errors, reset } = useForm<ServiceFormData>({
        title: service?.title || '',
        description: service?.description || '',
        content: service?.content || '',
        image: null,
        isActive: service?.isActive ?? true,
        sortOrder: service?.sortOrder || 0,
        metaTitle: service?.metaTitle || '',
        metaDescription: service?.metaDescription || '',
        metaKeywords: service?.metaKeywords || '',
        slug: service?.slug || '',
    })

    useEffect(() => {
        setData({
            title: service?.title || '',
            description: service?.description || '',
            content: service?.content || '',
            image: null,
            isActive: service?.isActive ?? true,
            sortOrder: service?.sortOrder || 0,
            metaTitle: service?.metaTitle || '',
            metaDescription: service?.metaDescription || '',
            metaKeywords: service?.metaKeywords || '',
            slug: service?.slug || '',
        })
    }, [service, setData])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFieldChange = (field: keyof ServiceFormData, value: any) => {
        setData(field, value)

        // Auto-generate slug from title setiap kali title berubah
        if (field === 'title') {
            const slug = value.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .trim()
            setData('slug', slug)
        }

        // Auto-generate meta title from title if empty
        if (field === 'title' && !data.metaTitle) {
            setData('metaTitle', value)
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (!data.title.trim()) {
            toast.error('Judul layanan harus diisi')
            return
        }

        if (!data.description.trim()) {
            toast.error('Deskripsi layanan harus diisi')
            return
        }

        if (!data.content.trim()) {
            toast.error('Konten layanan harus diisi')
            return
        }

        const url = isEditing
            ? updateRoute(service!.id).url
            : storeRoute().url

        post(url, {
            onSuccess: () => {
                const message = isEditing
                    ? 'Layanan berhasil diperbarui'
                    : 'Layanan berhasil ditambahkan'
                toast.success(message)

                if (!isEditing) {
                    reset()
                }
            },
            onError: (errors) => {
                const firstError = Object.values(errors)[0]
                const message = isEditing
                    ? 'Gagal memperbarui layanan'
                    : 'Gagal menambahkan layanan'
                toast.error(Array.isArray(firstError) ? firstError[0] : message)
                console.log(errors)
            },
            forceFormData: true,
        })
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>
                        {isEditing ? 'Edit Layanan' : 'Tambah Layanan Baru'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="basic">Informasi Dasar</TabsTrigger>
                            <TabsTrigger value="seo">SEO</TabsTrigger>
                        </TabsList>

                        <TabsContent value="basic" className="mt-6">
                            <ServiceFormFields
                                formData={data}
                                onFieldChange={handleFieldChange}
                                errors={errors}
                                existingImageUrl={service?.image ? `${service.image}` : null}
                            />
                        </TabsContent>

                        <TabsContent value="seo" className="mt-6">
                            <SEOFields
                                metaTitle={data.metaTitle}
                                metaDescription={data.metaDescription}
                                metaKeywords={data.metaKeywords}
                                slug={data.slug}
                                onMetaTitleChange={(value) => setData('metaTitle', value)}
                                onMetaDescriptionChange={(value) => setData('metaDescription', value)}
                                onMetaKeywordsChange={(value) => setData('metaKeywords', value)}
                                onSlugChange={(value) => setData('slug', value)}
                            />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <div className="flex items-center justify-end gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                    disabled={processing}
                >
                    Batal
                </Button>
                <Button type="submit" disabled={processing}>
                    {processing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {isEditing ? 'Menyimpan...' : 'Menambahkan...'}
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            {isEditing ? 'Simpan Perubahan' : 'Tambah Layanan'}
                        </>
                    )}
                </Button>
            </div>
        </form>
    )
}
