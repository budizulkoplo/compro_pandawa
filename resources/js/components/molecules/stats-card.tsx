// resources/js/components/molecules/stats-card.tsx

import { AnimatedCounter } from "@/components/atoms/animated-counter";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    value: number;
    label: string;
    icon: LucideIcon;
    suffix?: string;
    className?: string;
}

export function StatsCard({ value, label, icon: Icon, suffix = "+", className = "" }: StatsCardProps) {
    return (
        <div className={`flex flex-col items-center text-center ${className}`}>
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#21b6fc] to-[#1e94d2] rounded-full flex items-center justify-center mb-4">
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e94d2] mb-2">
                <AnimatedCounter end={value} suffix={suffix} />
            </div>
            <p className="text-sm sm:text-base text-[#126088] font-medium">{label}</p>
        </div>
    );
}
