// resources/js/components/sections/contact-info-section.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { CompanySetting } from "@/types";

interface ContactInfoSectionProps {
    settings: CompanySetting;
}

export function ContactInfoSection({ settings }: ContactInfoSectionProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Informasi Kontak</h2>

            <div className="grid gap-4 md:grid-cols-3">
                {/* Address */}
                {settings.company_address && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <MapPin className="h-5 w-5 text-primary" />
                                Alamat
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                {settings.company_address}
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Phone */}
                {settings.company_phone && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Phone className="h-5 w-5 text-primary" />
                                Telepon
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <a
                                href={`tel:${settings.company_phone}`}
                                className="text-sm text-primary hover:underline"
                            >
                                {settings.company_phone}
                            </a>
                        </CardContent>
                    </Card>
                )}

                {/* Email */}
                {settings.company_email && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Mail className="h-5 w-5 text-primary" />
                                Email
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <a
                                href={`mailto:${settings.company_email}`}
                                className="text-sm text-primary hover:underline"
                            >
                                {settings.company_email}
                            </a>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Google Maps */}
            {settings.google_maps_embed && (
                <Card>
                    <CardHeader>
                        <CardTitle>Lokasi Kami</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div
                            className="aspect-video w-full overflow-hidden rounded-lg"
                            dangerouslySetInnerHTML={{ __html: settings.google_maps_embed }}
                        />
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
