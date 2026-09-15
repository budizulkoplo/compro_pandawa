// resources/js/components/sections/gallery-hero-section.tsx

import { SectionTitle } from "../atoms/section-title-guest";

interface GalleryHeroSectionProps {
    companyName: string;
}

export function GalleryHeroSection({ companyName }: GalleryHeroSectionProps) {
    return (
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center">
                    <SectionTitle subtitle={`Dokumentasi visual layanan dan kegiatan ${companyName}`}>Galeri Kami</SectionTitle>
                    <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                            <circle cx="9" cy="9" r="2" />
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                        <span>Lihat koleksi foto dan video kami</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
