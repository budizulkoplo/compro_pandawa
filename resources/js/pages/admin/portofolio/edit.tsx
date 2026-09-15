// resources/js/pages/admin/portfolio/edit.tsx
import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { PortfolioForm } from '@/components/organism/portfolio-form'
import portfolioRoute from '@/routes/admin/management-content/portfolio'

interface Client {
    id: number
    name: string
    slug: string
    sector: string
    description: string
    logo_path: string | null
    images: string[]
    website_url: string | null
    is_active: boolean
    sort_order: number
    meta_title: string
    meta_description: string
    meta_keywords: string
}

interface Props {
    client: Client
}

export default function PortfolioEdit({ client }: Props) {
    return (
        <AppLayout breadcrumbs={[
            {
                title: 'Portofolio',
                href: portfolioRoute.index().url,
            },
            {
                title: client.name,
                href: portfolioRoute.show({ portfolio: client.id }).url,
            },
            {
                title: 'Edit',
                href: portfolioRoute.edit({ portfolio: client.id }).url,
            },
        ]}>
            <Head title={`Edit ${client.name} | Admin`} />

            <div className="space-y-6 mx-auto max-w-4xl px-4 py-6">
                <PortfolioForm client={client} isEdit />
            </div>
        </AppLayout>
    )
}
