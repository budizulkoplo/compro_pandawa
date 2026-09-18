
import { ArrowRight, Building2, ChevronDown, MapPin, MessageCircle, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompanySetting, Hero } from "@/types";
import { getImageUrl } from "@/utils/image-helper";

interface HeroSectionProps {
    settings: CompanySetting;
    clientCount: number;
    tagline?: string;
    shortDescription?: string;
    hero?: Hero | null;
}

export function HeroSection({ settings, clientCount, tagline, shortDescription, hero }: HeroSectionProps) {
    const whatsappLink = settings.whatsapp_enabled && settings.whatsapp_number
        ? `https://wa.me/${settings.whatsapp_number.replace(/\D/g, "")}?text=${encodeURIComponent(
              settings.whatsapp_default_message || "Halo, saya tertarik dengan layanan Anda."
          )}`
        : "/contact";

    // Calculate years of experience from founding year
    const currentYear = new Date().getFullYear();
    const yearsOfExperience = settings.founding_year
        ? Math.max(currentYear - settings.founding_year, 1)
        : 5;

    const title = hero?.title || settings.company_name;
    const heroTagline = hero?.subtitle || tagline || settings.tagline;
    const heroDescription = hero?.description || shortDescription || settings.short_description_below_tagline;

    return (
        <>
            <section className="relative overflow-hidden bg-[#edf8fb]">
                <div className="mx-auto grid min-h-[520px] max-w-7xl lg:grid-cols-[0.92fr_1.08fr]">
                    <div className="relative z-10 flex items-center px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
                        <div className="max-w-xl">
                            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#008ca8]">Distributor alat kesehatan</p>
                            <h1 className="max-w-lg text-4xl font-bold leading-[1.08] tracking-tight text-[#073b5c] sm:text-5xl">
                                {title}
                            </h1>
                            {heroTagline && <p className="mt-5 text-lg font-semibold leading-relaxed text-[#147c96]">{heroTagline}</p>}
                            {heroDescription && <p className="mt-4 max-w-lg text-sm leading-7 text-[#37657a]">{heroDescription}</p>}
                            <div className="mt-7 flex flex-wrap gap-3">
                                <Button asChild className="rounded-full bg-[#008da4] px-6 py-5 text-sm font-semibold shadow-lg shadow-[#008da4]/20 hover:bg-[#006f85]">
                                    <a href={hero?.cta_url || '/services'}>{hero?.cta_label || 'Jelajahi Produk'} <ArrowRight className="ml-2 h-4 w-4" /></a>
                                </Button>
                                <Button asChild variant="outline" className="rounded-full border-[#008da4] bg-white/70 px-6 py-5 text-sm font-semibold text-[#007a91] hover:border-[#008da4] hover:bg-[#008da4] hover:text-white">
                                    <a href={whatsappLink} target={settings.whatsapp_enabled ? "_blank" : undefined} rel="noopener noreferrer"><MessageCircle className="mr-2 h-4 w-4" /> Hubungi Kami</a>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="relative min-h-[300px] overflow-hidden lg:min-h-0">
                        {hero?.image_path ? (
                            <img src={getImageUrl(hero.image_path)} alt={title} className="absolute inset-0 h-full w-full object-cover" />
                        ) : (
                            <div className="absolute inset-0 bg-[linear-gradient(135deg,#d4f1f5,#7ec8d7)]" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#edf8fb] via-transparent to-transparent lg:w-1/4" />
                    </div>
                </div>
            </section>
            <section className="border-b border-[#dbeef2] bg-white">
                <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-[#dbeef2] sm:grid-cols-4">
                    {[
                        { icon: Building2, label: 'Tahun Berdiri', value: settings.founding_year || currentYear - yearsOfExperience },
                        { icon: MapPin, label: 'Lokasi Operasional', value: 'Jawa Tengah & DIY' },
                        { icon: PackageCheck, label: 'Jumlah Klien', value: `${clientCount}+` },
                        { icon: ChevronDown, label: 'Pengalaman', value: `${yearsOfExperience}+ tahun` },
                    ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-center gap-3 px-5 py-5 sm:px-8">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e3f5f6] text-[#008da4]"><Icon className="h-5 w-5" /></span>
                            <div><p className="text-[10px] uppercase tracking-wide text-[#6e98a5]">{label}</p><p className="mt-1 text-sm font-bold text-[#073b5c]">{value}</p></div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
