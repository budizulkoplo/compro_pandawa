// resources/js/components/sections/clients-hero-section.tsx

import { SectionTitle } from "../atoms/section-title-guest";

interface ClientsHeroSectionProps {
    title?: string;
    description?: string;
}

export function ClientsHeroSection({
    title = "Klien Kami",
    description = "Dipercaya oleh berbagai perusahaan terkemuka di berbagai sektor industri"
}: ClientsHeroSectionProps) {
    return (
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-background py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center">
                    <SectionTitle subtitle={description}>
                        {title}
                    </SectionTitle>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
                <div className="absolute -left-4 top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -right-4 bottom-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
            </div>
        </section>
    );
}
