// resources/js/components/molecules/gallery-category-public-card.tsx

import { Link } from "@inertiajs/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Images } from "lucide-react";
import { GalleryCategory } from "@/types/gallery";

interface GalleryCategoryPublicCardProps {
    category: GalleryCategory;
}

export function GalleryCategoryPublicCard({ category }: GalleryCategoryPublicCardProps) {
    // Get first image from active items or use placeholder
    const thumbnailImage = category.active_items?.[0]?.image_path;
    const itemCount = category.active_items_count || category.active_items?.length || 0;

    return (
        <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
            {/* Thumbnail Section */}
            <div className="relative h-56 overflow-hidden bg-muted">
                {thumbnailImage ? (
                    <img
                        src={`/storage/${thumbnailImage}`}
                        alt={category.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <Images className="h-16 w-16 text-muted-foreground" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Item Count Badge */}
                <div className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                    {itemCount} Foto
                </div>
            </div>

            <CardHeader>
                <CardTitle className="line-clamp-1 text-xl">
                    {category.name}
                </CardTitle>
                {category.description && (
                    <CardDescription className="line-clamp-2">
                        {category.description}
                    </CardDescription>
                )}
            </CardHeader>

            <CardContent>
                <Link href={`/gallery/${category.slug}`}>
                    <Button
                        variant="ghost"
                        className="group/btn w-full justify-between"
                    >
                        Lihat Galeri
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}
