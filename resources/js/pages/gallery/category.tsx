// resources/js/pages/gallery/category.tsx

import { Head } from "@inertiajs/react";
import { MainLayout } from "@/layouts/main-layout";
import { GalleryCategoryDetailSection } from "@/components/sections/gallery-category-detail-section";
import { CompanySetting, Service } from "@/types";
import type { GalleryCategory } from "@/types/gallery";

interface GalleryCategoryPageProps {
    companySettings: CompanySetting;
    category: GalleryCategory;
    featuredServices: Service[];
}

export default function GalleryCategory({
    companySettings,
    category,
    featuredServices
}: GalleryCategoryPageProps) {
    return (
        <MainLayout settings={companySettings} services={featuredServices}>
            <Head>
                <title>
                    {category.meta_title || `${category.name} - Galeri - ${companySettings.company_name}`}
                </title>
                <meta
                    name="description"
                    content={category.meta_description || category.description || `Galeri ${category.name}`}
                />
                {category.meta_keywords && (
                    <meta name="keywords" content={category.meta_keywords} />
                )}
            </Head>

            <GalleryCategoryDetailSection category={category} />
        </MainLayout>
    );
}
