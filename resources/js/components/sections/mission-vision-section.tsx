// resources/js/components/sections/mission-vision-section.tsx

import { SectionTitle } from "@/components/atoms/section-title-guest";
import { MissionVisionCard } from "@/components/molecules/mission-vision-card";

interface MissionVisionSectionProps {
    vision?: string;
    mission?: string;
}

export function MissionVisionSection({ vision, mission }: MissionVisionSectionProps) {
    if (!vision && !mission) return null;

    return (
        <section className="py-16 sm:py-20 lg:py-24 px-4 bg-white">
            <div className="container max-w-7xl mx-auto">
                <SectionTitle
                    subtitle="Tujuan dan komitmen kami untuk masa depan yang lebih baik"
                >
                    Visi & Misi
                </SectionTitle>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-12">
                    {vision && (
                        <MissionVisionCard
                            title="Visi"
                            content={vision}
                            type="vision"
                        />
                    )}
                    {mission && (
                        <MissionVisionCard
                            title="Misi"
                            content={mission}
                            type="mission"
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
