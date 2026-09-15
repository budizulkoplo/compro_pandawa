
import { SectionTitle } from "@/components/atoms/section-title-guest";
import { ClientLogoItem } from "@/components/molecules/client-logo-item";
import { Client } from "@/types";
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

interface ClientsSectionProps {
    clients: Client[];
}

export function ClientsSection({ clients }: ClientsSectionProps) {
    return (
        <section className="container max-w-7xl mx-auto py-20 px-4">
            <SectionTitle subtitle="Dipercaya oleh berbagai perusahaan terkemuka">
                Klien Kami
            </SectionTitle>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                {clients.map((client) => (
                    <ClientLogoItem key={client.id} client={client} />
                ))}
            </div>

            <div className="text-center">
                <Link
                    href="/clients"
                    className="inline-flex items-center gap-2 text-[#21b6fc] hover:text-[#1e94d2] font-semibold text-lg transition-colors group"
                >
                    Lihat Semua Klien
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </section>
    );
}
