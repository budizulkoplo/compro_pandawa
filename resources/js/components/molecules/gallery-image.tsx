// resources/js/components/molecules/gallery-image.tsx

import { GalleryItem } from "@/types";
import { getImageUrl } from "@/utils/image-helper";
import { useState } from "react";

interface GalleryImageProps {
    item: GalleryItem;
}

export function GalleryImage({ item }: GalleryImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer">
            <img
                src={getImageUrl(item.image_path)}
                alt={item.alt_text || item.title}
                className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setIsLoaded(true)}
            />
            {!isLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#21b6fc]/20 to-[#1e94d2]/10 animate-pulse" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                </div>
            </div>
        </div>
    );
}
