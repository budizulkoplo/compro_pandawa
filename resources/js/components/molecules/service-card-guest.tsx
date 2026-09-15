// resources/js/components/molecules/service-card.tsx

import { Link } from "@inertiajs/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";
import { Service } from "@/types";
import { getImageUrl } from "@/utils/image-helper";

interface ServiceCardProps {
    service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
    return (
        <Link href={`/services/${service.slug}`}>
            <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-2 hover:border-[#21b6fc]">
                <CardHeader>
                    {service.image ? (
                        <img
                            src={getImageUrl(service.image)}
                            alt={service.title}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                    ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-[#21b6fc]/20 to-[#1e94d2]/10 rounded-md mb-4 flex items-center justify-center">
                            <Sparkles className="w-12 h-12 text-[#21b6fc]" />
                        </div>
                    )}
                    <CardTitle className="text-xl text-[#00334e] group-hover:text-[#21b6fc] transition-colors">
                        {service.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-[#126088]/80 line-clamp-3 mb-4">
                        {service.description}
                    </CardDescription>
                    <div className="flex items-center text-[#21b6fc] font-semibold group-hover:gap-3 transition-all">
                        Pelajari Lebih Lanjut
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
