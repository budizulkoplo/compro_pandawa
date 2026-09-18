// resources/js/pages/contact/index.tsx

import { Head, Link } from "@inertiajs/react";
import { MainLayout } from "@/layouts/main-layout";
import { ContactForm } from "@/components/organisms/contact-form";
import { CompanySetting, Service } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Facebook,
    Instagram,
    Youtube,
    MessageSquare,
    Send,
    Twitter,
    Linkedin
} from "lucide-react";
import { parseSocialMedia } from "@/lib/utils";
import { SectionTitle } from "@/components/atoms/section-title-guest";

interface ContactPageProps {
    companySettings: CompanySetting;
    featuredServices: Service[];
}

// Contact Info Card Component
function ContactInfoCard({
    icon: Icon,
    title,
    content,
    href,
    isExternal = false
}: {
    icon: React.ElementType;
    title: string;
    content: string | null;
    href?: string;
    isExternal?: boolean;
}) {
    if (!content) return null;

    const CardWrapper = ({ children }: { children: React.ReactNode }) => {
        if (href) {
            if (isExternal) {
                return (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                    >
                        {children}
                    </a>
                );
            } else {
                return (
                    <Link href={href} className="block group">
                        {children}
                    </Link>
                );
            }
        }
        return <div>{children}</div>;
    };

    return (
        <CardWrapper>
            <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:border-primary">
                <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors">
                                <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed break-words">
                                {content}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </CardWrapper>
    );
}

// Social Media Links Component
function SocialMediaLinks({ settings }: { settings: CompanySetting }) {

    const socialMedia = parseSocialMedia(settings.social_media);

    const socialLinks = [
        { icon: Facebook, url: socialMedia.facebook || settings.social_media?.facebook, name: 'Facebook' },
        { icon: Instagram, url: socialMedia.instagram || settings.social_media?.instagram, name: 'Instagram' },
        { icon: Youtube, url: socialMedia.youtube || settings.social_media?.youtube, name: 'YouTube' },
        { icon: Twitter, url: socialMedia.twitter || settings.social_media?.twitter, name: 'Twitter' },
        { icon: Linkedin, url: socialMedia.linkedin || settings.social_media?.linkedin, name: 'LinkedIn' }
    ].filter(link => link.url);

    if (socialLinks.length === 0) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <span>Media Sosial</span>
                </CardTitle>
                <CardDescription>
                    Ikuti kami di media sosial untuk informasi terbaru
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-3">
                    {socialLinks.map(({ icon: Icon, url, name }) => (
                        <a
                            key={name}
                            href={url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                        >
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center space-x-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                            >
                                <Icon className="w-4 h-4" />
                                <span>{name}</span>
                            </Button>
                        </a>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

// Google Maps Component
function GoogleMapsSection({ mapsEmbed }: { mapsEmbed: string }) {
    // Extract iframe src from the full HTML if needed
    const getIframeSrc = (embed: string) => {
        // If it's already a direct URL, return as is
        if (embed.startsWith('https://www.google.com/maps/embed') ||
            embed.startsWith('https://maps.google.com/')) {
            return embed;
        }

        // If it's HTML with iframe, extract src using regex
        const srcMatch = embed.match(/src=["']([^"']*)["']/i);
        if (srcMatch && srcMatch[1]) {
            return srcMatch[1];
        }

        // Fallback: if still contains iframe tags, try to extract any google maps URL
        const googleMapsMatch = embed.match(/https:\/\/(?:www\.)?google\.com\/maps\/embed[^"'\s>]*/i);
        if (googleMapsMatch) {
            return googleMapsMatch[0];
        }

        return `https://www.google.com/maps?q=${encodeURIComponent(embed)}&output=embed`;
    };

    const iframeSrc = getIframeSrc(mapsEmbed);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Lokasi Kami</span>
                </CardTitle>
                <CardDescription>
                    Temukan lokasi kami di peta
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <iframe
                        src={iframeSrc}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Lokasi Perusahaan"
                        className="w-full h-full"
                    />
                </div>
                <div className="mt-4 flex justify-center">
                    <a
                            href={iframeSrc.replace('&output=embed', '')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                    >
                        <MapPin className="w-4 h-4" />
                        <span>Buka di Google Maps</span>
                    </a>
                </div>
            </CardContent>
        </Card>
    );
}

export default function ContactIndex({
    companySettings,
    featuredServices
}: ContactPageProps) {
    const mapsEmbed = companySettings.google_maps_embed || companySettings.company_address;

    return (
        <MainLayout settings={companySettings} services={featuredServices}>
            <Head>
                <title>{`Hubungi Kami - ${companySettings.company_name}`}</title>
                <meta
                    name="description"
                    content={`Hubungi ${companySettings.company_name}. ${companySettings.company_address || ''}`}
                />
            </Head>

            <div className="min-h-screen bg-background elative bg-gradient-to-br from-[#F3FCFF] via-[#E6F7FB] to-[#C1E8F7] py-16 sm:py-20 lg:py-24 px-4 overflow-hidden w-full">
                <div className="container mx-auto max-w-7xl">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <SectionTitle subtitle="Kami siap membantu Anda. Hubungi kami melalui berbagai cara berikut atau sampaikan pesan untuk pelayanan yang lebih baik.">
                            Hubungi Kami
                        </SectionTitle>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Contact Information Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground mb-6">
                                    Informasi Kontak
                                </h2>
                                <div className="space-y-4">
                                    <ContactInfoCard
                                        icon={MapPin}
                                        title="Alamat"
                                        content={companySettings.company_address}
                                    />

                                    <ContactInfoCard
                                        icon={Phone}
                                        title="Telepon"
                                        content={companySettings.company_phone}
                                        href={companySettings.company_phone ? `tel:${companySettings.company_phone}` : undefined}
                                        isExternal={true}
                                    />

                                    <ContactInfoCard
                                        icon={Mail}
                                        title="Email"
                                        content={companySettings.company_email}
                                        href={companySettings.company_email ? `mailto:${companySettings.company_email}` : undefined}
                                        isExternal={true}
                                    />

                                    <ContactInfoCard
                                        icon={Clock}
                                        title="Jam Operasional"
                                        content={companySettings.office_hours || "Senin - Jumat: 08:00 - 17:00"}
                                    />
                                </div>
                            </div>

                            {/* Social Media */}
                            <SocialMediaLinks settings={companySettings} />

                            {/* Quick Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informasi Penting</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Status:</span>
                                        <Badge variant="secondary">
                                            Siap Melayani
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Respon:</span>
                                        <Badge variant="secondary">
                                            1x24 Jam
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Konsultasi:</span>
                                        <Badge variant="secondary">
                                            Gratis
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Google Maps */}
                            {mapsEmbed && (
                                <GoogleMapsSection mapsEmbed={mapsEmbed} />
                            )}

                            {/* Contact Form */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Send className="w-5 h-5 text-primary" />
                                        <span>Kirim Pesan</span>
                                    </CardTitle>
                                    <CardDescription>
                                        Sampaikan pesan Anda dan kami akan segera menghubungi Anda kembali
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ContactForm />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* WhatsApp Floating Button */}
        </MainLayout>
    );
}
