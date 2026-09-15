// resources/js/components/sections/about-hero-section.tsx

import { SectionTitle } from "@/components/atoms/section-title-guest";

interface AboutHeroSectionProps {
    description: string;
}

export function AboutHeroSection({ description }: AboutHeroSectionProps) {
    return (
        <section className="relative bg-gradient-to-br from-[#F3FCFF] via-[#E6F7FB] to-[#C1E8F7] py-16 sm:py-20 lg:py-24 px-4 overflow-hidden w-full">
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-[#21b6fc]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-40 h-40 sm:w-60 sm:h-60 bg-[#1e94d2]/15 rounded-full blur-3xl" />

            <div className="container max-w-7xl mx-auto relative z-10">
                <SectionTitle
                    subtitle="Kenali lebih dekat tentang perjalanan dan komitmen kami"
                >
                    Tentang Kami
                </SectionTitle>

                <div
                    className="text-base sm:text-lg text-[#126088] leading-relaxed mt-8 prose prose-sm sm:prose-lg text-center indent-8 w-full mx-auto"
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            </div>
        </section>
    );
}
