// resources/js/types/dashboard.ts

export interface DashboardStats {
    pages: {
        about: number
        services: number
        clients: number
    }
    gallery: {
        categories: number
        items: number
    }
    messages: {
        total: number
        unread: number
        today: number
    }
    certificates: {
        total: number
        active: number
    }
}

export interface RecentMessage {
    id: number
    name: string
    email: string
    subject: string
    isRead: boolean
    created_at: string
    repliedByUser?: {
        id: number
        name: string
    }
}

export interface QuickStats {
    totalPages: number
    totalGalleryItems: number
    unreadMessages: number
    activeCertificates: number
}

export interface DashboardProps {
    stats: DashboardStats
    recentMessages: RecentMessage[]
    quickStats: QuickStats
}
