// resources/js/Pages/Admin/ManagementContent/Services/Show.tsx

import { Head, Link } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/atoms/status-badge'
import { Service } from '@/types/service'
import { BreadcrumbItem } from '@/types'
import { Edit, ArrowLeft, Globe, Tag, FileText } from 'lucide-react'
import { index as servicesIndex } from '@/routes/admin/management-content/services'
import { post as updateRoute } from '@/routes/admin/management-content/services/update'

interface Props {
    service: Service
}

export default function ShowService({ service }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Manajemen Konten',
            href: '#'
        },
        {
            title: 'Layanan',
            href: servicesIndex().url
        },
        {
            title: service.title,
            href: updateRoute(service.id).url
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${service.title} | Admin`} />

            <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 px-4 py-6">
                {/* Header Section - Mobile Friendly */}
                <div className="space-y-4">
                    {/* Back Button */}
                    <Link href="/admin/management-content/services">
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>

                    {/* Title and Actions */}
                    <div className="space-y-3">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold break-words">{service.title}</h1>
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                                <StatusBadge isActive={service.isActive} />
                                <span className="text-sm text-muted-foreground">
                                    Urutan: {service.sortOrder}
                                </span>
                            </div>
                        </div>

                        {/* Edit Button - Full width on mobile */}
                        <Link href={`/admin/management-content/services/${service.id}/edit`} className="block sm:inline-block">
                            <Button className="w-full sm:w-auto">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Layanan
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Content Grid - Responsive */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-4 md:space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                    <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                                    Konten Layanan
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="font-medium mb-2 text-sm sm:text-base">Deskripsi</h3>
                                    <p className="text-muted-foreground text-sm sm:text-base break-words">{service.description}</p>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2 text-sm sm:text-base">Konten Lengkap</h3>
                                    <div
                                        className="prose prose-sm max-w-none break-words overflow-hidden"
                                        dangerouslySetInnerHTML={{ __html: service.content }}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {service.image && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base sm:text-lg">Gambar Layanan</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
                                        <img
                                            src={`/storage/${service.image}`}
                                            alt={service.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar - SEO & Info */}
                    <div className="space-y-4 md:space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                    <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
                                    Informasi SEO
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-sm mb-1">URL Slug</h4>
                                    <Badge variant="outline" className="font-mono text-xs break-all">
                                        /{service.slug}
                                    </Badge>
                                </div>

                                {service.metaTitle && (
                                    <div>
                                        <h4 className="font-medium text-sm mb-1">Meta Title</h4>
                                        <p className="text-sm text-muted-foreground break-words">{service.metaTitle}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {service.metaTitle.length}/60 karakter
                                        </p>
                                    </div>
                                )}

                                {service.metaDescription && (
                                    <div>
                                        <h4 className="font-medium text-sm mb-1">Meta Description</h4>
                                        <p className="text-sm text-muted-foreground break-words">{service.metaDescription}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {service.metaDescription.length}/160 karakter
                                        </p>
                                    </div>
                                )}

                                {service.metaKeywords && (
                                    <div>
                                        <h4 className="font-medium text-sm mb-1">Keywords</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {service.metaKeywords.split(',').map((keyword, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs break-all">
                                                    <Tag className="mr-1 h-3 w-3 flex-shrink-0" />
                                                    {keyword.trim()}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base sm:text-lg">Informasi Lainnya</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-sm">
                                    <span className="text-muted-foreground">Dibuat pada</span>
                                    <span className="font-medium">{new Date(service.created_at).toLocaleDateString('id-ID')}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-sm">
                                    <span className="text-muted-foreground">Terakhir diubah</span>
                                    <span className="font-medium">{new Date(service.updated_at).toLocaleDateString('id-ID')}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-sm">
                                    <span className="text-muted-foreground">ID Layanan</span>
                                    <Badge variant="outline">#{service.id}</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
