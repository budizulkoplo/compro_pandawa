// resources/js/pages/home/index.tsx

import { MainLayout } from "@/layouts/main-layout";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ClientsSection } from "@/components/sections/clients-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { CertificatesCarousel } from "@/components/organism/certificates-carousel";
import { HomePageProps } from "@/types";

export default function Home({
    companySettings,
    featuredServices,
    clientCount,
    clientLogos,
    miniGallery,
    certificates,
    hero,
}: HomePageProps) {
    return (
        <MainLayout settings={companySettings} services={featuredServices}>
            <HeroSection
                clientCount={clientCount}
                settings={companySettings}
                hero={hero}
            />

            <ServicesSection services={featuredServices} />

            <ClientsSection clients={clientLogos} />

            <GallerySection items={miniGallery} />

            <CertificatesCarousel certificates={certificates} />
        </MainLayout>
    );
}
