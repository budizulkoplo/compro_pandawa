// resources/js/components/sections/stats-section.tsx

import { StatsCard } from "@/components/molecules/stats-card";
import { Award, Users, Briefcase, Clock } from "lucide-react";

export function StatsSection() {
    return (
        <section className="py-16 sm:py-20 lg:py-24 px-4 bg-white">
            <div className="container max-w-7xl mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    <StatsCard
                        value={50}
                        label="Project Selesai"
                        icon={Briefcase}
                        suffix="+"
                    />
                    <StatsCard
                        value={40}
                        label="Klien Puas"
                        icon={Users}
                        suffix="+"
                    />
                    <StatsCard
                        value={5}
                        label="Tahun Pengalaman"
                        icon={Clock}
                        suffix="+"
                    />
                    <StatsCard
                        value={10}
                        label="Penghargaan"
                        icon={Award}
                        suffix="+"
                    />
                </div>
            </div>
        </section>
    );
}
