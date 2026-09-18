import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import HeadingSmall from '@/components/organism/heading-small'
import { CatalogForm } from '@/components/organism/catalog-form'
import { BreadcrumbItem } from '@/types'
import { index as catalogIndex, create as catalogCreate } from '@/routes/admin/management-content/catalog'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manajemen Konten', href: '#' },
    { title: 'Katalog', href: catalogIndex().url },
    { title: 'Tambah Katalog', href: catalogCreate().url },
]

export default function CreateCatalog({ services }: { services: { id: number; title: string }[] }) {
    return <AppLayout breadcrumbs={breadcrumbs}><Head title="Tambah Katalog | Admin" /><div className="mx-auto max-w-4xl px-4 py-6"><HeadingSmall title="Tambah Katalog" description="Tambahkan item baru ke katalog website" /><div className="mt-6"><CatalogForm services={services} /></div></div></AppLayout>
}