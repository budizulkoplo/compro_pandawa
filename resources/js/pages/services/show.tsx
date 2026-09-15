// resources/js/pages/services/show.tsx

import { MainLayout } from "@/layouts/main-layout";
import { ServiceDetailSection } from "@/components/sections/service-detail-section";
import { CompanySetting, Service } from "@/types";

interface ServiceShowPageProps {
    companySettings: CompanySetting;
    service: Service;
    featuredServices: Service[];
}

export default function ServiceShow({
    companySettings,
    service,
    featuredServices
}: ServiceShowPageProps) {
    return (
        <MainLayout settings={companySettings} services={featuredServices} title={service.metaTitle || `${service.title} | ${companySettings.company_name}`} description={service.metaDescription || service.description}>

            <ServiceDetailSection service={service} />
        </MainLayout>
    );
}
