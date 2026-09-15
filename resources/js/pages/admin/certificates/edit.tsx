// resources/js/Pages/Admin/Certificates/Edit.tsx

import { Head, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { CertificateForm } from '@/components/organism/certificate-form'
import type { BreadcrumbItem } from '@/types'

interface Certificate {
    id: number
    title: string
    issuer?: string
    issued_at?: string
    expired_at?: string
    image_path?: string
    description?: string
    is_active: boolean
    sort_order: number
}

interface Props {
    certificate: Certificate
}

export default function Edit({ certificate }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Sertifikat',
            href: '/admin/certificates',
        },
        {
            title: certificate.title,
            href: `/admin/certificates/${certificate.id}`,
        },
        {
            title: 'Edit',
            href: `/admin/certificates/${certificate.id}/edit`,
        },
    ]

    const handleBack = () => {
        router.get('/admin/certificates')
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${certificate.title} | Admin`} />

            <div className="mx-auto max-w-7xl py-4">
                <CertificateForm certificate={certificate} onBack={handleBack} />
            </div>
        </AppLayout>
    )
}
