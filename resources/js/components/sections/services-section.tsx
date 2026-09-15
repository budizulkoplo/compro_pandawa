// resources/js/components/organisms/services-section.tsx

import { SectionTitle } from "@/components/atoms/section-title-guest";
import { ServiceCard } from "@/components/molecules/service-card-guest";
import { Service } from "@/types";
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

interface ServicesSectionProps {
    services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
    return (
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
            <div className="container max-w-7xl mx-auto px-4">
                <SectionTitle subtitle="Layanan profesional yang disesuaikan dengan kebutuhan bisnis Anda">
                    Layanan Unggulan Kami
                </SectionTitle>

                <div className="flex flex-wrap justify-center gap-6 mb-12">
                    {services.map((service) => (
                        <div key={service.id} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
                            <ServiceCard service={service} />
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 text-[#21b6fc] hover:text-[#1e94d2] font-semibold text-lg transition-colors group"
                    >
                        Lihat Semua Layanan
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
