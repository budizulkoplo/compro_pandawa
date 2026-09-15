// resources/js/components/organisms/gallery-section.tsx

import { SectionTitle } from "@/components/atoms/section-title-guest";
import { GalleryImage } from "@/components/molecules/gallery-image";
import { GalleryItem } from "@/types";
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

interface GallerySectionProps {
    items: GalleryItem[];
}

export function GallerySection({ items }: GallerySectionProps) {
    return (
        <section className="bg-gradient-to-br from-[#F3FCFF] to-white py-20">
            <div className="container max-w-7xl mx-auto px-4">
                <SectionTitle subtitle="Dokumentasi kegiatan dan project terbaru kami">
                    Galeri Kegiatan
                </SectionTitle>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                    {items.map((item) => (
                        <GalleryImage key={item.id} item={item} />
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/gallery"
                        className="inline-flex items-center gap-2 text-[#21b6fc] hover:text-[#1e94d2] font-semibold text-lg transition-colors group"
                    >
                        Lihat Galeri Lengkap
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
