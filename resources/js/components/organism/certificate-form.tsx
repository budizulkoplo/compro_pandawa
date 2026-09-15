// resources/js/components/organisms/certificate-form.tsx

import { useState } from 'react'
import { useForm } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { FormField } from '@/components/molecules/form-field'
import { ImageUploadField } from '@/components/molecules/image-upload-field'
import { RichTextEditor } from '@/components/editor/rich-text-editor'
import { Save, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

interface Certificate {
    id?: number
    title: string
    issuer?: string
    issued_at?: string
    expired_at?: string
    image_path?: string
    description?: string
    is_active: boolean
    sort_order: number
}

interface CertificateFormProps {
    certificate?: Certificate
    onBack: () => void
}

export function CertificateForm({ certificate, onBack }: CertificateFormProps) {
    const isEdit = !!certificate?.id
    const [deletedImages, setDeletedImages] = useState<string[]>([])

    const { data, setData, post, put, processing, reset } = useForm({
        title: certificate?.title || '',
        issuer: certificate?.issuer || '',
        issued_at: certificate?.issued_at || '',
        expired_at: certificate?.expired_at || '',
        image_path: certificate?.image_path || '',
        description: certificate?.description || '',
        is_active: certificate?.is_active ?? true,
        sort_order: certificate?.sort_order || 0,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const submitData = {
            ...data,
            deleted_images: deletedImages,
        }

        if (isEdit) {
            put(`/admin/certificates/${certificate.id}`, {
                onSuccess: () => {
                    toast.success('Sertifikat berhasil diperbarui')
                },
                onError: (errors) => {
                    toast.error('Gagal memperbarui sertifikat')
                    console.error(errors)
                }
            })
        } else {
            post('/admin/certificates', {
                onSuccess: () => {
                    toast.success('Sertifikat berhasil ditambahkan')
                    reset()
                },
                onError: (errors) => {
                    toast.error('Gagal menambahkan sertifikat')
                    console.error(errors)
                }
            })
        }
    }

    const handleImageDelete = (url: string) => {
        if (url.includes('/storage/')) {
            const path = url.replace('/storage/', '')
            setDeletedImages(prev => [...prev, path])
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onBack}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">
                        {isEdit ? 'Edit Sertifikat' : 'Tambah Sertifikat'}
                    </h1>
                    <p className="text-muted-foreground">
                        {isEdit ? 'Perbarui informasi sertifikat' : 'Tambahkan sertifikat baru'}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Dasar</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    label="Nama Sertifikat"
                                    name="title"
                                    value={data.title}
                                    onChange={(value) => setData('title', value)}
                                    placeholder="Contoh: ISO 9001:2015"
                                    required
                                />

                                <FormField
                                    label="Penerbit"
                                    name="issuer"
                                    value={data.issuer}
                                    onChange={(value) => setData('issuer', value)}
                                    placeholder="Contoh: International Organization for Standardization"
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="issued_at">Tanggal Terbit</Label>
                                        <input
                                            id="issued_at"
                                            name="issued_at"
                                            type="date"
                                            value={data.issued_at}
                                            onChange={(e) => setData('issued_at', e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="expired_at">Tanggal Kedaluwarsa</Label>
                                        <input
                                            id="expired_at"
                                            name="expired_at"
                                            type="date"
                                            value={data.expired_at}
                                            onChange={(e) => setData('expired_at', e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sort_order">Urutan Tampil</Label>
                                    <input
                                        id="sort_order"
                                        name="sort_order"
                                        type="number"
                                        min="0"
                                        value={data.sort_order}
                                        onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="0"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Angka yang lebih kecil akan tampil lebih dahulu
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Deskripsi</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RichTextEditor
                                    content={data.description}
                                    onChange={(content) => setData('description', content)}
                                    placeholder="Masukkan deskripsi sertifikat..."
                                    onImageDelete={handleImageDelete}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Pengaturan</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData('is_active', checked)}
                                    />
                                    <Label htmlFor="is_active">Status Aktif</Label>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Sertifikat yang tidak aktif tidak akan ditampilkan di website
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Gambar Sertifikat</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ImageUploadField
                                    label="Upload Gambar"
                                    value={data.image_path}
                                    onChange={(path) => setData('image_path', path)}
                                    onDelete={() => setData('image_path', '')}
                                    context="certificates"
                                    title={data.title}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Aksi</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {processing ? 'Menyimpan...' : (isEdit ? 'Perbarui' : 'Simpan')}
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onBack}
                                    className="w-full"
                                >
                                    Batal
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    )
}
