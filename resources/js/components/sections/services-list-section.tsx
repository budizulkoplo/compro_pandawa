// resources/js/components/sections/services-list-section.tsx

import { Service } from "@/types";
import { ServicePublicCard } from "@/components/molecules/service-public-card";

interface ServicesListSectionProps {
    services: Service[];
}

export function ServicesListSection({ services }: ServicesListSectionProps) {
    if (!services || services.length === 0) {
        return (
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p className="text-muted-foreground">
                            Belum ada layanan yang tersedia saat ini.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <ServicePublicCard key={service.id} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
}
