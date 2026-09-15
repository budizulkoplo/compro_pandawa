// resources/js/Pages/Admin/ManagementContent/About.tsx

import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout';
import { AboutForm } from '@/components/organism/about-form'
import { BreadcrumbItem } from '@/types';
import { index as about } from '@/routes/admin/management-content/about';
import HeadingSmall from '@/components/organism/heading-small';

interface AboutUsData {
    id?: number
    description: string
    vision: string
    mission: string
    profile_image?: string
    profile_video?: string
    meta_title: string
    meta_description: string
    meta_keywords: string
    slug: string
}

interface Props {
    aboutUs: AboutUsData
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tentang Kami',
        href: about().url,
    },
];

export default function About({ aboutUs }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tentang Kami | Admin" />

            <div className="space-y-6 mx-auto max-w-4xl px-4 py-6 w-full">
                <HeadingSmall
                    title="Tentang Kami"
                    description="Kelola informasi tentang perusahaan Anda"
                />

                <AboutForm aboutUs={aboutUs} />
            </div>
        </AppLayout>
    )
}
