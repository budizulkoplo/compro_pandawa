// resources/js/components/sections/profile-section.tsx

import { SectionTitle } from "@/components/atoms/section-title-guest";
import { ProfileImageGallery } from "@/components/molecules/profile-image-gallery";
import { VideoPlayer } from "@/components/atoms/video-player";

interface ProfileSectionProps {
    images?: string[] | string | null;
    videoUrl?: string;
}

export function ProfileSection({ images, videoUrl }: ProfileSectionProps) {
    // Check if images exist (handle both array and JSON string)
    const hasImages = images && (
        (typeof images === 'string' && images.length > 0) ||
        (Array.isArray(images) && images.length > 0)
    );

    if (!hasImages && !videoUrl) return null;

    return (
        <section className="py-16 sm:py-20 lg:py-24 px-4 bg-gradient-to-br from-gray-50 to-white">
            <div className="container max-w-7xl mx-auto">
                <SectionTitle
                    subtitle="Dokumentasi perjalanan dan aktivitas kami"
                >
                    Profil Perusahaan
                </SectionTitle>

                <div className="mt-12 space-y-12">
                    {videoUrl && (
                        <div className="max-w-7xl mx-auto">
                            <VideoPlayer videoUrl={videoUrl} />
                        </div>
                    )}

                    {images && images.length > 0 && (
                        <ProfileImageGallery images={images} />
                    )}
                </div>
            </div>
        </section>
    );
}
