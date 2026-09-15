// resources/js/components/molecules/client-public-card.tsx

import { Link } from "@inertiajs/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2 } from "lucide-react";
import { Client } from "@/types";

interface ClientPublicCardProps {
    client: Client;
}

export function ClientPublicCard({ client }: ClientPublicCardProps) {
    return (
        <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
            {/* Logo Section */}
            <div className="relative flex h-40 items-center justify-center overflow-hidden bg-muted p-6">
                {client.logo_path ? (
                    <img
                        src={`/storage/${client.logo_path}`}
                        alt={client.name}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                ) : (
                    <Building2 className="h-16 w-16 text-muted-foreground" />
                )}

                {/* Sector Badge */}
                {client.sector && (
                    <Badge
                        variant="secondary"
                        className="absolute right-3 top-3"
                    >
                        {client.sector}
                    </Badge>
                )}
            </div>

            <CardHeader>
                <CardTitle className="line-clamp-1 text-xl">
                    {client.name}
                </CardTitle>
                {client.description && (
                    <CardDescription className="line-clamp-2">
                        {client.description}
                    </CardDescription>
                )}
            </CardHeader>

            <CardContent>
                <Link href={`/clients/${client.slug}`}>
                    <Button
                        variant="ghost"
                        className="group/btn w-full justify-between"
                    >
                        Lihat Detail
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}
