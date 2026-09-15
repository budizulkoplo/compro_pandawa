// resources/js/Pages/Admin/ManagementContent/Services/Create.tsx

import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { ServiceForm } from '@/components/organism/service-form'
import { BreadcrumbItem } from '@/types'
import { index as servicesIndex, create } from '@/routes/admin/management-content/services'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Konten',
        href: '#',
    },
    {
        title: 'Layanan',
        href: servicesIndex().url,
    },
    {
        title: 'Tambah Layanan',
        href: create().url,
    }
]

export default function CreateService() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Layanan | Admin" />

            <div className="max-w-4xl mx-auto px-4 py-6">
                <ServiceForm />
            </div>
        </AppLayout>
    )
}
