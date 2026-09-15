// resources/js/components/molecules/gallery-item-public-card.tsx

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { GalleryItem } from "@/types/gallery";

interface GalleryItemPublicCardProps {
    item: GalleryItem;
    onClick?: () => void;
}

export function GalleryItemPublicCard({ item, onClick }: GalleryItemPublicCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <Card
            className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
            onClick={onClick}
        >
            <div className="relative aspect-square overflow-hidden bg-muted">
                {!imageLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-muted" />
                )}
                <img
                    src={`/storage/${item.image_path}`}
                    alt={item.alt_text || item.title}
                    className="h-full w-full object-cover transition-all duration-300 group-hover:scale-110"
                    onLoad={() => setImageLoaded(true)}
                    loading="lazy"
                />

                {/* Overlay with title */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="line-clamp-2 text-sm font-semibold text-white md:text-base">
                            {item.title}
                        </h3>
                        {item.description && (
                            <p className="mt-1 line-clamp-1 text-xs text-white/80">
                                {item.description}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}
