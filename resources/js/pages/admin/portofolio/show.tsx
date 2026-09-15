// resources/js/pages/admin/portfolio/show.tsx
import { Head, Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import AppLayout from '@/layouts/app-layout'
import { StatusBadge } from '@/components/atoms/status-badge'
import { Edit, ExternalLink, ArrowLeft, Globe, Building2, Calendar, Image } from 'lucide-react'
import portfolioRoute from '@/routes/admin/management-content/portfolio'
import { Label } from '@/components/ui/label'

interface Client {
    id: number
    name: string
    slug: string
    sector: string
    description: string
    logo_path: string | null
    images: string[]
    website_url: string | null
    is_active: boolean
    sort_order: number
    meta_title: string
    meta_description: string
    meta_keywords: string
    created_at: string
    updated_at: string
}

interface Props {
    client: Client
}

export default function PortfolioShow({ client }: Props) {
    return (
        <AppLayout breadcrumbs={[
            {
                title: 'Portofolio',
                href: portfolioRoute.index().url,
            },
            {
                title: client.name,
                href: portfolioRoute.show({ portfolio: client.id }).url,
            },
        ]}>
            <Head title={`${client.name} | Admin`} />

            <div className="space-y-6 mx-auto max-w-4xl px-4 py-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={portfolioRoute.index().url}>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Kembali
                            </Link>
                        </Button>

                        <div>
                            <h1 className="text-2xl font-bold flex items-center gap-2">
                                {client.name}
                                <StatusBadge isActive={client.is_active} />
                            </h1>
                            <p className="text-muted-foreground flex items-center gap-1 mt-1">
                                <Building2 className="w-4 h-4" />
                                {client.sector}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {client.website_url && (
                            <Button variant="outline" asChild>
                                <a href={client.website_url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Website
                                </a>
                            </Button>
                        )}

                        <Button asChild>
                            <Link href={portfolioRoute.edit({ portfolio: client.id }).url}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Logo */}
                        {client.logo_path && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Logo Klien</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-center p-8 bg-secondary/30 rounded-lg">
                                        <img
                                            src={`/storage/${client.logo_path}`}
                                            alt={`Logo ${client.name}`}
                                            className="max-h-32 w-auto object-contain"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Description */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Deskripsi</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div
                                    className="prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: client.description }}
                                />
                            </CardContent>
                        </Card>

                        {/* Gallery */}
                        {client.images && client.images.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Image className="w-5 h-5" />
                                        Galeri Proyek ({client.images.length})
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {client.images.map((imagePath, index) => (
                                            <div key={index} className="aspect-square">
                                                <img
                                                    src={`/storage/${imagePath}`}
                                                    alt={`${client.name} - Gambar ${index + 1}`}
                                                    className="w-full h-full object-cover rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                                    onClick={() => {
                                                        // Open in modal or new tab
                                                        window.open(`/storage/${imagePath}`, '_blank')
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Slug URL
                                    </Label>
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-muted-foreground" />
                                        <code className="text-sm bg-secondary px-2 py-1 rounded">
                                            /{client.slug}
                                        </code>
                                    </div>
                                </div>

                                {client.website_url && (
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-muted-foreground">
                                            Website
                                        </Label>
                                        <a
                                            href={client.website_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            {client.website_url}
                                        </a>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Urutan Tampil
                                    </Label>
                                    <p className="text-sm">{client.sort_order}</p>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-muted-foreground mr-2">
                                        Status
                                    </Label>
                                    <StatusBadge isActive={client.is_active} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* SEO Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>SEO</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {client.meta_title && (
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-muted-foreground">
                                            Meta Title
                                        </Label>
                                        <p className="text-sm">{client.meta_title}</p>
                                    </div>
                                )}

                                {client.meta_description && (
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-muted-foreground">
                                            Meta Description
                                        </Label>
                                        <p className="text-sm">{client.meta_description}</p>
                                    </div>
                                )}

                                {client.meta_keywords && (
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-muted-foreground">
                                            Keywords
                                        </Label>
                                        <div className="flex flex-wrap gap-1">
                                            {client.meta_keywords.split(',').map((keyword, index) => (
                                                <Badge key={index} variant="secondary"
                                                                                                    className="text-xs"
                                                >
                                                    {keyword.trim()}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Timestamps */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Timeline</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Dibuat
                                    </Label>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="w-4 h-4 text-muted-foreground" />
                                        {new Date(client.created_at).toLocaleDateString('id-ID', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Terakhir Diperbarui
                                    </Label>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="w-4 h-4 text-muted-foreground" />
                                        {new Date(client.updated_at).toLocaleDateString('id-ID', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
