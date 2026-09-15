// resources/js/components/organisms/dashboard-stats-grid.tsx

import { StatCard } from "@/components/molecules/stat-card"
import { DashboardStats } from "@/types/dashboard"
import {
    FileText,
    Briefcase,
    Users,
    Image,
    FolderOpen,
    MessageSquare,
    Award
} from "lucide-react"

interface DashboardStatsGridProps {
    stats: DashboardStats
}

export function DashboardStatsGrid({ stats }: DashboardStatsGridProps) {
    return (
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
                title="Halaman Tentang"
                value={stats.pages.about}
                description="Total halaman tentang kami"
                icon={<FileText />}
            />

            <StatCard
                title="Layanan Aktif"
                value={stats.pages.services}
                description="Layanan yang dipublikasikan"
                icon={<Briefcase />}
            />

            <StatCard
                title="Klien Portfolio"
                value={stats.pages.clients}
                description="Klien yang terdaftar"
                icon={<Users />}
            />

            <StatCard
                title="Kategori Galeri"
                value={stats.gallery.categories}
                description="Kategori galeri aktif"
                icon={<FolderOpen />}
            />

            <StatCard
                title="Item Galeri"
                value={stats.gallery.items}
                description="Total item galeri"
                icon={<Image />}
            />

            <StatCard
                title="Pesan Masuk"
                value={stats.messages.total}
                description={`${stats.messages.unread} belum dibaca`}
                icon={<MessageSquare />}
                className={stats.messages.unread > 0 ? "border-blue-200 bg-blue-50" : ""}
            />

            <StatCard
                title="Pesan Hari Ini"
                value={stats.messages.today}
                description="Pesan masuk hari ini"
                icon={<MessageSquare />}
            />

            <StatCard
                title="Sertifikat Aktif"
                value={stats.certificates.active}
                description={`dari ${stats.certificates.total} total`}
                icon={<Award />}
            />
        </div>
    )
}
