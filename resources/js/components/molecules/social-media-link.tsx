// resources/js/components/molecules/social-media-link.tsx

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";

interface SocialMediaLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
    ariaLabel: string;
}

export function SocialMediaLink({ href, icon: Icon, label, ariaLabel }: SocialMediaLinkProps) {
    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 bg-white/10 hover:bg-[#21b6fc] rounded-lg flex items-center justify-center transition-colors group"
                        aria-label={ariaLabel}
                    >
                        <Icon className="w-4 h-4 text-white/80 group-hover:text-white" />
                    </a>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="text-sm">{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
