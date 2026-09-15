// resources/js/pages/admin/portfolio/create.tsx
import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { PortfolioForm } from '@/components/organism/portfolio-form'
import portfolioRoute from '@/routes/admin/management-content/portfolio'

const breadcrumbs = [
    {
        title: 'Portofolio',
        href: portfolioRoute.index().url,
    },
    {
        title: 'Tambah Klien',
        href: portfolioRoute.create().url,
    },
]

export default function PortfolioCreate() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Klien | Admin" />

            <div className="space-y-6 mx-auto max-w-4xl px-4 py-6">
                <PortfolioForm />
            </div>
        </AppLayout>
    )
}
