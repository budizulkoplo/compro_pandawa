// resources/js/components/molecules/profile-image-gallery.tsx

import { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ProfileImageGalleryProps {
    images: string[] | string | null;
    className?: string;
}

export function ProfileImageGallery({ images, className = "" }: ProfileImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Parse images if it's a JSON string
    let imageArray: string[] = [];
    if (typeof images === 'string') {
        try {
            imageArray = JSON.parse(images);
        } catch (e) {
            console.error('Failed to parse images JSON:', e);
            return null;
        }
    } else if (Array.isArray(images)) {
        imageArray = images;
    }

    if (!imageArray || imageArray.length === 0) return null;

    const getImageUrl = (path: string) => {
        if (path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        }
        return `/storage/${path}`;
    };

    return (
        <>
            <div className={`grid grid-cols-2 sm:grid-cols-3 gap-4 ${className}`}>
                {imageArray.map((image, index) => (
                    <div
                        key={index}
                        className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                        onClick={() => setSelectedImage(image)}
                    >
                        <img
                            src={getImageUrl(image)}
                            alt={`Profile ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                ))}
            </div>

            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
                    <div className="relative">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-12 right-0 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        {selectedImage && (
                            <img
                                src={getImageUrl(selectedImage)}
                                alt="Preview"
                                className="w-full h-auto rounded-lg"
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
