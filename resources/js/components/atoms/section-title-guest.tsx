import { cn } from "@/lib/utils";

interface SectionTitleProps {
    children: React.ReactNode;
    subtitle?: string;
    className?: string;
}

export function SectionTitle({ children, subtitle, className }: SectionTitleProps) {
    return (
        <div className={cn("text-center mb-12", className)}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#00334e] mb-4">
                {children}
            </h2>
            {subtitle && (
                <p className="text-lg text-[#126088]/80 max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
