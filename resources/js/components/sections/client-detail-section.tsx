// resources/js/components/sections/client-detail-section.tsx

import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Building2 } from "lucide-react";
import { Client } from "@/types";

interface ClientDetailSectionProps {
    client: Client;
}

export function ClientDetailSection({ client }: ClientDetailSectionProps) {
    return (
        <article className="py-16">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-7xl">
                    {/* Back Button */}
                    <Link href="/clients">
                        <Button variant="ghost" className="mb-8 gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke Klien
                        </Button>
                    </Link>

                    {/* Client Header */}
                    <div className="mb-8">
                        <div className="mb-4 flex flex-wrap items-center gap-4">
                            {client.sector && (
                                <Badge variant="secondary" className="text-sm">
                                    {client.sector}
                                </Badge>
                            )}
                        </div>

                        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                            {client.name}
                        </h1>

                        {client.website_url && (
                            <a
                                href={client.website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-primary hover:underline"
                            >
                                <ExternalLink className="h-4 w-4" />
                                Kunjungi Website
                            </a>
                        )}
                    </div>

                    {/* Client Logo */}
                    {client.logo_path && (
                        <Card className="mb-8">
                            <CardContent className="flex items-center justify-center p-12">
                                <img
                                    src={`/storage/${client.logo_path}`}
                                    alt={client.name}
                                    className="h-auto max-h-32 w-auto max-w-full object-contain"
                                />
                            </CardContent>
                        </Card>
                    )}

                    {/* Client Description */}
                    {client.description && (
                        <div className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold">Tentang Klien</h2>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-muted-foreground">{client.description}</p>
                            </div>
                        </div>
                    )}

                    {/* Client Images Gallery */}
                    {client.images && client.images.length > 0 && (
                        <div>
                            <h2 className="mb-4 text-2xl font-semibold">Galeri</h2>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {client.images.map((image, index) => (
                                    <Card key={index} className="overflow-hidden">
                                        <CardContent className="p-0">
                                            <img
                                                src={`/storage/${image}`}
                                                alt={`${client.name} - ${index + 1}`}
                                                className="h-64 w-full object-cover"
                                            />
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Empty State */}
                    {!client.description && (!client.images || client.images.length === 0) && (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                                <Building2 className="mb-4 h-16 w-16 text-muted-foreground" />
                                <p className="text-muted-foreground">
                                    Detail informasi klien belum tersedia.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </article>
    );
}
