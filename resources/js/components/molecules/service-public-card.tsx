// resources/js/components/molecules/service-public-card.tsx

import { Link } from "@inertiajs/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Service } from "@/types";

interface ServicePublicCardProps {
    service: Service;
}

export function ServicePublicCard({ service }: ServicePublicCardProps) {
    return (
        <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
            {/* Image Section */}
            {service.image && (
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={`/storage/${service.image}`}
                        alt={service.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
            )}

            <CardHeader>
                <CardTitle className="line-clamp-2 text-xl">
                    {service.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                    {service.description}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Link href={`/services/${service.slug}`}>
                    <Button
                        variant="ghost"
                        className="group/btn w-full justify-between"
                    >
                        Selengkapnya
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}
