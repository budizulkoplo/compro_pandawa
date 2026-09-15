// resources/js/Pages/Admin/ManagementContent/Services/Edit.tsx

import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { ServiceForm } from '@/components/organism/service-form'
import { Service } from '@/types/service'
import { BreadcrumbItem } from '@/types'
import { index as servicesIndex } from '@/routes/admin/management-content/services'
import { post as updateRoute } from '@/routes/admin/management-content/services/update'

interface Props {
    service: Service
}

export default function EditService({ service }: Props) {
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
            <Head title={`Edit ${service.title} | Admin`} />

            <div className="max-w-4xl mx-auto px-4 py-6">
                <ServiceForm service={service} isEditing />
            </div>
        </AppLayout>
    )
}
