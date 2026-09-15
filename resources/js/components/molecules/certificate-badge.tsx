// resources/js/components/molecules/certificate-badge.tsx

import { Certificate } from "@/types";
import { getImageUrl } from "@/utils/image-helper";
import { Award } from "lucide-react";

interface CertificateBadgeProps {
    certificate: Certificate;
}

export function CertificateBadge({ certificate }: CertificateBadgeProps) {
    return (
        <div className="flex-shrink-0 w-40 h-40 bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center gap-3 hover:shadow-xl transition-shadow">
            {certificate.image_path ? (
                <img
                    src={getImageUrl(certificate.image_path)}
                    alt={certificate.title}
                    className="max-h-20 object-contain"
                />
            ) : (
                <Award className="w-16 h-16 text-[#21b6fc]" />
            )}
            <p className="text-xs text-center font-medium text-[#00334e] line-clamp-2">
                {certificate.title}
            </p>
        </div>
    );
}
