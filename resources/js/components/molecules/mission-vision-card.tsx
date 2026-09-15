// resources/js/components/molecules/mission-vision-card.tsx

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Target, Eye, LucideIcon } from "lucide-react";

interface MissionVisionCardProps {
    title: string;
    content: string;
    type: "vision" | "mission";
    className?: string;
}

export function MissionVisionCard({ title, content, type, className = "" }: MissionVisionCardProps) {
    const Icon: LucideIcon = type === "vision" ? Eye : Target;
    const gradientClass = type === "vision"
        ? "from-[#21b6fc] to-[#1e94d2]"
        : "from-[#1e94d2] to-[#126088]";

    return (
        <Card className={`h-full hover:shadow-xl transition-shadow ${className}`}>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${gradientClass} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#00334e]">{title}</h3>
                </div>
            </CardHeader>
            <CardContent>
                <div
                    className="text-sm sm:text-base text-[#126088] leading-relaxed prose prose-sm sm:prose-base max-w-none"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </CardContent>
        </Card>
    );
}
