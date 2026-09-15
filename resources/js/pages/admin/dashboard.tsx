// resources/js/Pages/admin/dashboard.tsx

import { Head } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import { DashboardStatsGrid } from "@/components/organism/dashboard-stats-grid"
import { RecentMessagesPanel } from "@/components/organism/recent-messages-panel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardProps } from "@/types/dashboard"
import { BreadcrumbItem } from "@/types"
import {
    BarChart3,
    TrendingUp,
    Calendar,
    Image,
    Briefcase,
    BookOpen,
    Images,
    Cog,
    Building2
    , PanelsTopLeft
} from "lucide-react"
import { router } from "@inertiajs/react"
import { dashboard } from '@/routes/admin';
import { index as aboutRute } from "@/routes/admin/management-content/about"
import { create as serviceRouteCreate } from "@/routes/admin/management-content/services"
import { index as catalogIndex } from "@/routes/admin/management-content/catalog"
import { index as galleryIndex } from "@/routes/admin/management-content/gallery"
import { index as settingRoute } from "@/routes/admin/settings"
import HeadingSmall from "@/components/organism/heading-small"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard.url(),
    },
]

export default function Dashboard({ stats, recentMessages, quickStats }: DashboardProps) {
    const quickActions = [
        {
            title: "Kelola Hero Section",
            description: "Atur tampilan utama halaman beranda",
            icon: <PanelsTopLeft className="h-5 w-5" />,
            href: "/admin/management-content/hero",
            color: "bg-cyan-600"
        },
        {
            title: "Kelola Tentang Kami",
            description: "Edit informasi perusahaan",
            icon: <Building2 className="h-5 w-5" />,
            href: aboutRute(),
            color: "bg-blue-500"
        },
        {
            title: "Tambah Layanan",
            description: "Buat layanan baru",
            icon: <Briefcase className="h-5 w-5" />,
            href: serviceRouteCreate(),
            color: "bg-green-500"
        },
        {
            title: "Kelola Katalog",
            description: "Tambah dan ubah item katalog",
            icon: <BookOpen className="h-5 w-5" />,
            href: catalogIndex(),
            color: "bg-amber-500"
        },
        {
            title: "Upload Galeri",
            description: "Tambah foto ke galeri",
            icon: <Images className="h-5 w-5" />,
            href: galleryIndex(),
            color: "bg-purple-500"
        },
        {
            title: "Pengaturan",
            description: "Konfigurasi sistem",
            icon: <Cog className="h-5 w-5" />,
            href: settingRoute(),
            color: "bg-gray-500"
        }
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard | Admin" />

            <div className="space-y-6 mx-auto max-w-7xl px-4 py-6 w-full">
                {/* Welcome Section */}
                <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                    <HeadingSmall
                        title="Dashboard"
                        description="Selamat datang di panel administrasi. Kelola konten website Anda dengan mudah."
                    />
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                            <Calendar className="mr-2 h-4 w-4" />
                            {new Date().toLocaleDateString('id-ID', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </Button>
                    </div>
                </div>

                {/* Stats Overview */}
                <DashboardStatsGrid stats={stats} />

                {/* Content Grid */}
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <TrendingUp className="h-5 w-5" />
                                <span>Aksi Cepat</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {quickActions.map((action, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50"
                                    onClick={() => router.visit(action.href)}
                                >
                                    <div className={`p-2 rounded-md text-white ${action.color}`}>
                                        {action.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate">
                                            {action.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {action.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Recent Messages Panel */}
                    <RecentMessagesPanel
                        messages={recentMessages}
                        unreadCount={stats.messages.unread}
                    />
                </div>

                {/* Summary Cards */}
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-2xl font-bold">{quickStats.totalPages}</p>
                                    <p className="text-sm text-muted-foreground">Total Halaman</p>
                                </div>
                                <BarChart3 className="h-8 w-8 text-muted-foreground" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-2xl font-bold">{quickStats.totalGalleryItems}</p>
                                    <p className="text-sm text-muted-foreground">Item Galeri</p>
                                </div>
                                <Image className="h-8 w-8 text-muted-foreground" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className={quickStats.unreadMessages > 0 ? "border-orange-200 bg-orange-50" : ""}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-2xl font-bold">{quickStats.unreadMessages}</p>
                                    <p className="text-sm text-muted-foreground">Pesan Belum Dibaca</p>
                                </div>
                                <div className={quickStats.unreadMessages > 0 ? "text-orange-600" : "text-muted-foreground"}>
                                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-2xl font-bold">{quickStats.activeCertificates}</p>
                                    <p className="text-sm text-muted-foreground">Sertifikat Aktif</p>
                                </div>
                                <svg className="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    )
}
