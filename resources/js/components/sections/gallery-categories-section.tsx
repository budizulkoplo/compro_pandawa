// resources/js/components/sections/gallery-categories-section.tsx

import { GalleryCategory } from "@/types/gallery";
import { GalleryCategoryPublicCard } from "@/components/molecules/gallery-category-public-card";

interface GalleryCategoriesSectionProps {
    categories: GalleryCategory[];
}

export function GalleryCategoriesSection({ categories }: GalleryCategoriesSectionProps) {
    if (!categories || categories.length === 0) {
        return (
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p className="text-muted-foreground">
                            Belum ada kategori galeri yang tersedia saat ini.
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
                    {categories.map((category) => (
                        <GalleryCategoryPublicCard key={category.id} category={category} />
                    ))}
                </div>
            </div>
        </section>
    );
}
