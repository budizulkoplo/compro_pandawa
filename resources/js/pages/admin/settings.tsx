// resources/js/pages/admin/settings.tsx

import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import HeadingSmall from '@/components/organism/heading-small'
import { SettingsForm } from '@/components/organism/settings-form'
import settingsRoute from '@/routes/admin/settings'
import type { BreadcrumbItem } from '@/types'

interface CompanySettings {
    id?: number
    company_name: string
    company_address: string
    company_phone: string
    company_email: string
    company_website: string
    company_description: string
    tagline: string
    short_description_below_tagline: string
    logo_path: string | null
    favicon_path: string | null
    social_media: {
        facebook: string
        instagram: string
        twitter: string
        linkedin: string
        youtube: string
    }
    google_maps_embed: string
    whatsapp_number: string
    whatsapp_default_message: string
    whatsapp_enabled: boolean
    meta_title: string
    meta_description: string
    meta_keywords: string
    founding_year: number | null
}

interface Props {
    settings: CompanySettings
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengaturan Umum',
        href: settingsRoute.index.url(),
    },
]

export default function SettingsIndex({ settings }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan Umum | Admin" />

            <div className="space-y-6 mx-auto max-w-6xl py-4">
                <HeadingSmall
                    title="Pengaturan Umum"
                    description="Kelola informasi dasar perusahaan dan konfigurasi website"
                />

                <SettingsForm settings={settings} />
            </div>
        </AppLayout>
    )
}
