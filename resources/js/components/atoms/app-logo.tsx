import { cn } from "@/lib/utils";
import { getImageUrl } from "@/utils/image-helper";

interface AppLogoProps {
    logoPath?: string | null;
    companyName: string;
    className?: string;
    size?: "sm" | "md" | "lg";
}

export function AppLogo({
    logoPath,
    companyName,
    className,
    size = "md"
}: AppLogoProps) {
    const sizeClasses = {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-16 w-16"
    };

    if (logoPath) {
        return (
            <img
                src={getImageUrl(logoPath)}
                alt={`${companyName} Logo`}
                className={cn(sizeClasses[size], "object-contain rounded-md", className)}
            />
        );
    }

    return (
        <div className={cn(
            "rounded-lg bg-primary flex items-center justify-center text-white font-bold",
            sizeClasses[size],
            className
        )}>
            {companyName.charAt(0).toUpperCase()}
        </div>
    );
}
