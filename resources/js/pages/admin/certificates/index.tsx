// resources/js/Pages/Admin/Certificates/Index.tsx

import { Head, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { CertificateList } from '@/components/templates/certificate-list'
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
}

interface PaginationData {
    current_page: number
    last_page: number
    per_page: number
    total: number
    data: Certificate[]
}

interface Filters {
    search?: string
    status?: string
    sort_by?: string
    sort_order?: 'asc' | 'desc'
}

interface Props {
    certificates: PaginationData
    filters: Filters
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sertifikat',
        href: '/admin/certificates',
    },
]

export default function Index({ certificates, filters }: Props) {
    const handleCreateNew = () => {
        router.get('/admin/certificates/create')
    }

    const handleViewDetail = (certificate: Certificate) => {
        router.get(`/admin/certificates/${certificate.id}`)
    }

    const handleEdit = (certificate: Certificate) => {
        router.get(`/admin/certificates/${certificate.id}/edit`)
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sertifikat | Admin" />

            <div className="space-y-6 mx-auto max-w-4xl px-4 py-6 w-full">
                <CertificateList
                    certificates={certificates}
                    filters={filters}
                    onCreateNew={handleCreateNew}
                    onViewDetail={handleViewDetail}
                    onEdit={handleEdit}
                />
            </div>
        </AppLayout>
    )
}
