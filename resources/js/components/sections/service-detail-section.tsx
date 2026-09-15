// resources/js/components/sections/service-detail-section.tsx

import { Service } from "@/types";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

interface ServiceDetailSectionProps {
    service: Service;
}

export function ServiceDetailSection({ service }: ServiceDetailSectionProps) {
    return (
        <article className="py-16">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-7xl">
                    {/* Back Button */}
                    <Link href="/services">
                        <Button variant="ghost" className="mb-8 gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke Layanan
                        </Button>
                    </Link>

                    {/* Service Title */}
                    <h1 className="mb-6 text-3xl font-bold tracking-tight md:text-3xl">
                        {service.title}
                    </h1>

                    {/* Service Description */}
                    {service.description && (
                        <div className="mb-8 rounded-lg bg-muted p-6 outline-1 outline-muted-foreground/20">
                            <p className="text-lg text-muted-foreground">
                                {service.description}
                            </p>
                        </div>
                    )}

                    {/* Service Image */}
                    {service.image && (
                        <div className="mb-8 overflow-hidden rounded-lg">
                            <img
                                src={`/storage/${service.image}`}
                                alt={service.title}
                                className="h-auto w-full object-cover"
                            />
                        </div>
                    )}

                    {/* Service Content */}
                    {service.content && (
                        <div
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: service.content }}
                        />
                    )}
                </div>
            </div>
        </article>
    );
}
