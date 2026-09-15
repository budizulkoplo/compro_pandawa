// resources/js/pages/clients/index.tsx

import { Head } from "@inertiajs/react";
import { MainLayout } from "@/layouts/main-layout";
import { ClientsHeroSection } from "@/components/sections/clients-hero-section";
import { ClientsListSection } from "@/components/sections/clients-list-section";
import { CompanySetting, Service, Client } from "@/types";

interface ClientsIndexPageProps {
    companySettings: CompanySetting;
    clients: Client[];
    featuredServices: Service[];
}

export default function ClientsIndex({
    companySettings,
    clients,
    featuredServices
}: ClientsIndexPageProps) {
    return (
        <MainLayout settings={companySettings} services={featuredServices}>
            <Head>
                <title>{`Klien Kami - ${companySettings.company_name}`}</title>
                <meta
                    name="description"
                    content={`Klien dan mitra ${companySettings.company_name} dari berbagai sektor industri`}
                />
            </Head>

            <ClientsHeroSection />

            <ClientsListSection clients={clients} />
        </MainLayout>
    );
}
