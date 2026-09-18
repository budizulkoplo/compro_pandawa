import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import HeadingSmall from '@/components/organism/heading-small'
import { CatalogForm } from '@/components/organism/catalog-form'
import { Catalog } from '@/types/catalog'
import { BreadcrumbItem } from '@/types'
import { index as catalogIndex } from '@/routes/admin/management-content/catalog'

export default function EditCatalog({ catalog, services }: { catalog: Catalog; services: { id: number; title: string }[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Manajemen Konten', href: '#' },
        { title: 'Katalog', href: catalogIndex().url },
        { title: catalog.name, href: `/admin/management-content/catalog/${catalog.id}/edit` },
    ]

    return <AppLayout breadcrumbs={breadcrumbs}><Head title={`Edit ${catalog.name} | Admin`} /><div className="mx-auto max-w-4xl px-4 py-6"><HeadingSmall title={`Edit ${catalog.name}`} description="Perbarui informasi item katalog" /><div className="mt-6"><CatalogForm catalog={catalog} services={services} isEditing /></div></div></AppLayout>
}