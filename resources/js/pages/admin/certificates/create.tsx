// resources/js/Pages/Admin/Certificates/Create.tsx

import { Head, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { CertificateForm } from '@/components/organism/certificate-form'
import type { BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sertifikat',
        href: '/admin/certificates',
    },
    {
        title: 'Tambah Sertifikat',
        href: '/admin/certificates/create',
    },
]

export default function Create() {
    const handleBack = () => {
        router.get('/admin/certificates')
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Sertifikat | Admin" />

            <div className="mx-auto max-w-7xl py-4">
                <CertificateForm onBack={handleBack} />
            </div>
        </AppLayout>
    )
}
