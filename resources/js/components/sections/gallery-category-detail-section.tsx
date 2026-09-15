// resources/js/components/sections/gallery-category-detail-section.tsx

import { useState } from "react";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import { GalleryCategory } from "@/types/gallery";
import { GalleryItemPublicCard } from "@/components/molecules/gallery-item-public-card";

interface GalleryCategoryDetailSectionProps {
    category: GalleryCategory;
}

export function GalleryCategoryDetailSection({ category }: GalleryCategoryDetailSectionProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const items = category.active_items || [];

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const goToPrevious = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentImageIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") goToPrevious();
        if (e.key === "ArrowRight") goToNext();
        if (e.key === "Escape") setLightboxOpen(false);
    };

    return (
        <section className="py-16">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Back Button */}
                <Link href="/gallery">
                    <Button variant="ghost" className="mb-8 gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Kembali ke Galeri
                    </Button>
                </Link>

                {/* Category Header */}
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                        {category.name}
                    </h1>
                    {category.description && (
                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                            {category.description}
                        </p>
                    )}
                </div>

                {/* Gallery Grid */}
                {items.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {items.map((item, index) => (
                            <GalleryItemPublicCard
                                key={item.id}
                                item={item}
                                onClick={() => openLightbox(index)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-12 text-center">
                        <p className="text-muted-foreground">
                            Belum ada foto dalam kategori ini.
                        </p>
                    </div>
                )}
            </div>

            {/* Lightbox Dialog */}
            <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
                <DialogContent
                    className="max-w-7xl p-0"
                    onKeyDown={handleKeyDown}
                >
                    <div className="relative">
                        {/* Close Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-4 top-4 z-10 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white"
                            onClick={() => setLightboxOpen(false)}
                        >
                            <X className="h-6 w-6" />
                        </Button>

                        {/* Navigation Buttons */}
                        {items.length > 1 && (
                            <>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white"
                                    onClick={goToPrevious}
                                >
                                    <ChevronLeft className="h-8 w-8" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white"
                                    onClick={goToNext}
                                >
                                    <ChevronRight className="h-8 w-8" />
                                </Button>
                            </>
                        )}

                        {/* Image */}
                        {items[currentImageIndex] && (
                            <div className="relative">
                                <img
                                    src={`/storage/${items[currentImageIndex].image_path}`}
                                    alt={items[currentImageIndex].alt_text || items[currentImageIndex].title}
                                    className="h-auto w-full max-h-[90vh] object-contain"
                                />

                                {/* Image Info */}
                                <div className="bg-background p-4">
                                    <h3 className="text-lg font-semibold">
                                        {items[currentImageIndex].title}
                                    </h3>
                                    {items[currentImageIndex].description && (
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {items[currentImageIndex].description}
                                        </p>
                                    )}
                                    <p className="mt-2 text-xs text-muted-foreground">
                                        {currentImageIndex + 1} / {items.length}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
}
