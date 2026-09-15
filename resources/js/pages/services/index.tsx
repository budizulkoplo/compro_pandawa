// resources/js/pages/services/index.tsx

import { MainLayout } from "@/layouts/main-layout";
import { ServicesHeroSection } from "@/components/sections/services-hero-section";
import { ServicesListSection } from "@/components/sections/services-list-section";
import { CompanySetting, Service } from "@/types";

interface ServicesPageProps {
    companySettings: CompanySetting;
    services: Service[];
    featuredServices: Service[];
}

export default function Services({
    companySettings,
    services,
    featuredServices
}: ServicesPageProps) {
    return (
        <MainLayout settings={companySettings} title="Layanan" description={`Berbagai layanan profesional dari ${companySettings.company_name}`} services={featuredServices}>

            <ServicesHeroSection />

            <ServicesListSection services={services} />
        </MainLayout>
    );
}
