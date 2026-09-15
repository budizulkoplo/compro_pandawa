// resources/js/pages/gallery/index.tsx

import { Head } from "@inertiajs/react";
import { MainLayout } from "@/layouts/main-layout";
import { GalleryHeroSection } from "@/components/sections/gallery-hero-section";
import { GalleryCategoriesSection } from "@/components/sections/gallery-categories-section";
import { CompanySetting, Service } from "@/types";
import type { GalleryCategory } from "@/types/gallery";

interface GalleryIndexPageProps {
    companySettings: CompanySetting;
    categories: GalleryCategory[];
    featuredServices: Service[];
}

export default function GalleryIndex({
    companySettings,
    categories,
    featuredServices
}: GalleryIndexPageProps) {
    const pageTitle = `Galeri - ${companySettings.company_name}`;
    const pageDescription = `Lihat dokumentasi visual layanan ${companySettings.company_name}. Galeri foto kegiatan keamanan, pengelolaan parkir, dan outsourcing.`;

    return (
        <MainLayout settings={companySettings} services={featuredServices}>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta
                    name="keywords"
                    content="galeri, foto, dokumentasi, jasa keamanan, security services, pengelolaan parkir, outsourcing"
                />
            </Head>

            <GalleryHeroSection
                companyName={companySettings.company_name}
            />

            <GalleryCategoriesSection categories={categories} />
        </MainLayout>
    );
}
