// resources/js/pages/clients/show.tsx

import { Head } from "@inertiajs/react";
import { MainLayout } from "@/layouts/main-layout";
import { ClientDetailSection } from "@/components/sections/client-detail-section";
import { CompanySetting, Service, Client } from "@/types";

interface ClientShowPageProps {
    companySettings: CompanySetting;
    client: Client;
    featuredServices: Service[];
}

export default function ClientShow({
    companySettings,
    client,
    featuredServices
}: ClientShowPageProps) {
    return (
        <MainLayout settings={companySettings} services={featuredServices}>
            <Head>
                <title>
                    {client.meta_title || `${client.name} - Klien - ${companySettings.company_name}`}
                </title>
                <meta
                    name="description"
                    content={client.meta_description || client.description || `Klien ${client.name}`}
                />
                {client.meta_keywords && (
                    <meta name="keywords" content={client.meta_keywords} />
                )}
            </Head>

            <ClientDetailSection client={client} />
        </MainLayout>
    );
}
