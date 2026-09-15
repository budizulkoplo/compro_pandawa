// resources/js/components/molecules/client-logo-item.tsx

import { Client } from "@/types";
import { getImageUrl } from "@/utils/image-helper";
import { Building2 } from "lucide-react";

interface ClientLogoItemProps {
    client: Client;
}

export function ClientLogoItem({ client }: ClientLogoItemProps) {
    return (
        <div className="group p-6 border-2 rounded-lg hover:border-[#21b6fc] transition-all duration-300 hover:shadow-lg bg-white/50 backdrop-blur-sm flex items-center justify-center h-32">
            {client.logo_path ? (
                <img
                    src={getImageUrl(client.logo_path)}
                    alt={client.name}
                    className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all rounded-md"
                />
            ) : (
                <div className="flex flex-col items-center gap-2 text-[#126088]/60">
                    <Building2 className="w-8 h-8" />
                    <span className="text-xs font-medium">{client.name}</span>
                </div>
            )}
        </div>
    );
}
