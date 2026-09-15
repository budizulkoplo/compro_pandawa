// resources/js/Pages/Admin/Certificates/Show.tsx

import { Head, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/atoms/status-badge'
import { ActionButton } from '@/components/atoms/action-button'
import { ArrowLeft, Edit, Trash2, Calendar, Building, Image, Hash } from 'lucide-react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { toast } from 'sonner'
import type { BreadcrumbItem } from '@/types'

interface Certificate {
    id: number
    title: string
    issuer?: string
    issued_at?: string
    expired_at?: string
    image_path?: string
    image_url?: string
    description?: string
    is_active: boolean
    sort_order: number
    created_at: string
    updated_at: string
}

interface Props {
    certificate: Certificate
}

export default function Show({ certificate }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Sertifikat',
            href: '/admin/certificates',
        },
        {
            title: certificate.title,
            href: `/admin/certificates/${certificate.id}`,
        },
    ]

    const isExpired = certificate.expired_at && new Date(certificate.expired_at) < new Date()

    const handleBack = () => {
        router.get('/admin/certificates')
    }

    const handleEdit = () => {
        router.get(`/admin/certificates/${certificate.id}/edit`)
    }

    const handleDelete = () => {
        if (confirm(`Apakah Anda yakin ingin menghapus sertifikat "${certificate.title}"?`)) {
            router.delete(`/admin/certificates/${certificate.id}`, {
                onSuccess: () => {
                    toast.success('Sertifikat berhasil dihapus')
                    router.get('/admin/certificates')
                },
                onError: () => {
                    toast.error('Gagal menghapus sertifikat')
                }
            })
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${certificate.title} | Admin`} />

            <div className="mx-auto max-w-4xl py-4 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleBack}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Kembali
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">{certificate.title}</h1>
                            <p className="text-muted-foreground">Detail sertifikat</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <StatusBadge isActive={certificate.is_active} />
                        <ActionButton
                            icon={Edit}
                            onClick={handleEdit}
                            title="Edit"
                            variant="outline"
                        />
                        <ActionButton
                            icon={Trash2}
                            onClick={handleDelete}
                            title="Hapus"
                            variant="destructive"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Sertifikat</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <h3 className="font-medium text-sm text-muted-foreground">Nama Sertifikat</h3>
                                        <p className="font-medium">{certificate.title}</p>
                                    </div>

                                    {certificate.issuer && (
                                        <div className="space-y-2">
                                            <h3 className="font-medium text-sm text-muted-foreground flex items-center gap-1">
                                                <Building className="w-4 h-4" />
                                                Penerbit
                                            </h3>
                                            <p>{certificate.issuer}</p>
                                        </div>
                                    )}

                                    {certificate.issued_at && (
                                        <div className="space-y-2">
                                            <h3 className="font-medium text-sm text-muted-foreground flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                Tanggal Terbit
                                            </h3>
                                            <p>{format(new Date(certificate.issued_at), 'dd MMMM yyyy', { locale: id })}</p>
                                        </div>
                                    )}

                                    {certificate.expired_at && (
                                        <div className="space-y-2">
                                            <h3 className="font-medium text-sm text-muted-foreground flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                Berlaku Sampai
                                            </h3>
                                            <p className={isExpired ? 'text-destructive' : ''}>
                                                {format(new Date(certificate.expired_at), 'dd MMMM yyyy', { locale: id })}
                                                {isExpired && (
                                                    <Badge variant="destructive" className="ml-2">
                                                        Kedaluwarsa
                                                    </Badge>
                                                )}
                                            </p>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <h3 className="font-medium text-sm text-muted-foreground flex items-center gap-1">
                                            <Hash className="w-4 h-4" />
                                            Urutan Tampil
                                        </h3>
                                        <p>{certificate.sort_order}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="font-medium text-sm text-muted-foreground">Status</h3>
                                        <StatusBadge isActive={certificate.is_active} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {certificate.description && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Deskripsi</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div
                                        className="prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: certificate.description }}
                                    />
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {certificate.image_url && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Image className="w-5 h-5" />
                                        Gambar Sertifikat
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <img
                                        src={certificate.image_url}
                                        alt={certificate.title}
                                        className="w-full rounded-lg border shadow-sm"
                                    />
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Sistem</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div>
                                    <span className="text-muted-foreground">Dibuat:</span>
                                    <p>{format(new Date(certificate.created_at), 'dd MMM yyyy, HH:mm', { locale: id })}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Diperbarui:</span>
                                    <p>{format(new Date(certificate.updated_at), 'dd MMM yyyy, HH:mm', { locale: id })}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
