// resources/js/components/organisms/header-navbar.tsx

import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AppLogo } from "@/components/atoms/app-logo";
import { CompanySetting, Service } from "@/types";
import { cn } from "@/lib/utils";

interface HeaderNavbarProps {
    settings: CompanySetting;
    services?: Service[];
}

export function HeaderNavbar({ settings, services = [] }: HeaderNavbarProps) {
    const page = usePage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const whatsappLink = settings.whatsapp_enabled && settings.whatsapp_number
        ? `https://wa.me/${settings.whatsapp_number.replace(/\D/g, "")}?text=${encodeURIComponent(
              settings.whatsapp_default_message || "Halo, saya tertarik dengan layanan Anda."
          )}`
        : "/contact";

    return (
        <header
            className={cn(
                "sticky top-0 left-0 z-50 w-full px-4 py-3 transition-all duration-300 sm:px-6",
                isScrolled
                    ? "border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl"
                    : "border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl"
            )}
        >
            <div className="mx-auto w-full max-w-7xl">
                <nav className="flex min-h-14 items-center justify-between gap-6">
                    {/* Logo */}
                    <Link href="/" className="flex min-w-0 items-center gap-3 transition-opacity hover:opacity-80">
                        <AppLogo
                            logoPath={settings.favicon_path || settings.logo_path}
                            companyName={settings.company_name}
                            size="lg"
                            className="h-14 w-14 shrink-0 sm:h-16 sm:w-16"
                        />
                        <div className="min-w-0">
                            <h1 className="truncate text-base font-extrabold leading-tight tracking-tight text-[#00334e] sm:text-lg">
                                {settings.company_name}
                            </h1>
                            <p className="truncate text-[11px] font-medium text-[#126088] sm:text-xs">{settings.tagline}</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <NavigationMenu className="hidden rounded-xl border border-slate-200/70 bg-white/70 p-1 shadow-sm lg:flex">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="/" className={cn(navigationMenuTriggerStyle(), "h-10 rounded-lg px-4 py-2")}>
                                    <span className={page.url === '/' ? 'text-accent hover:text-accent-foreground' : ''}>Beranda</span>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink href="/about" className={cn(navigationMenuTriggerStyle(), "h-10 rounded-lg px-4 py-2")}>
                                    <span className={page.url.startsWith('/about') ? 'text-accent' : ''}>Tentang Kami</span>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="h-10 rounded-lg px-4 py-2">
                                    <span className={page.url.startsWith('/services') ? 'text-accent' : ''}>Layanan</span>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="w-[600px] p-4">
                                        <h2 className="text-lg font-semibold text-[#00334e] mb-4 px-2">
                                            Layanan Kami
                                        </h2>
                                        <div className="grid grid-cols-2 gap-3">
                                            {services.slice(0, 6).map((service) => (
                                                <NavigationMenuLink
                                                    key={service.id}
                                                    href={`/services/${service.slug}`}
                                                    className="block p-3 rounded-md hover:bg-[#F3FCFF] transition-colors border border-transparent hover:border-[#21b6fc]"
                                                >
                                                    <p className="font-semibold text-[#00334e] mb-1">
                                                        {service.title}
                                                    </p>
                                                    <p className="text-sm text-[#126088]/70 line-clamp-2">
                                                        {service.description}
                                                    </p>
                                                </NavigationMenuLink>
                                            ))}
                                        </div>
                                        <div className="mt-4 pt-4 border-t">
                                            <NavigationMenuLink
                                                href="/services"
                                                className="text-[#21b6fc] hover:text-[#1b3848] font-semibold text-sm flex items-center gap-2"
                                            >
                                                Lihat Semua Layanan →
                                            </NavigationMenuLink>
                                        </div>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink href="/gallery" className={cn(navigationMenuTriggerStyle(), "h-10 rounded-lg px-4 py-2")}>
                                    <span className={page.url.startsWith('/gallery') ? 'text-accent' : ''}>Galeri</span>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink href="/catalog" className={cn(navigationMenuTriggerStyle(), "h-10 rounded-lg px-4 py-2")}>
                                    <span className={page.url.startsWith('/catalog') ? 'text-accent' : ''}>Katalog</span>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink href="/clients" className={cn(navigationMenuTriggerStyle(), "h-10 rounded-lg px-4 py-2")}>
                                    <span className={page.url.startsWith('/clients') ? 'text-accent' : ''}>Klien</span>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink href="/contact" className={cn(navigationMenuTriggerStyle(), "h-10 rounded-lg px-4 py-2")}>
                                    <span className={page.url.startsWith('/contact') ? 'text-accent' : ''}>Kontak</span>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* CTA Button - Desktop */}
                    <div className="hidden">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        asChild
                                        className="bg-gradient-to-r from-[#21b6fc] to-[#1e94d2] hover:from-[#1e94d2] hover:to-[#21b6fc]"
                                    >
                                        <a href={whatsappLink} target={settings.whatsapp_enabled ? "_blank" : undefined}>
                                            <svg
                                                className="w-5 h-5 mr-2"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                            </svg>
                                            Hubungi Kami
                                        </a>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Chat via WhatsApp</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="lg:hidden">
                            <Button variant="outline" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px] mx-auto">
                            <SheetHeader>
                                <SheetTitle>
                                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                                        <AppLogo
                                            logoPath={settings.favicon_path || settings.logo_path}
                                            companyName={settings.company_name}
                                            size="sm"
                                        />
                                        <span className="text-base font-semibold">{settings.company_name}</span>
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>

                            <div className="flex flex-col gap-4 mt-8 p-4">
                                <Link
                                    href="/"
                                    className="text-lg font-medium hover:text-[#21b6fc] transition-colors py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Beranda
                                </Link>

                                <Link
                                    href="/about"
                                    className="text-lg font-medium hover:text-[#21b6fc] transition-colors py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Tentang Kami
                                </Link>

                                <Accordion type="single" collapsible>
                                    <AccordionItem value="services" className="border-none">
                                        <AccordionTrigger className="text-lg font-medium hover:text-[#21b6fc] py-2">
                                            Layanan
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="flex flex-col gap-2 pl-4">
                                                {services.slice(0, 6).map((service) => (
                                                    <Link
                                                        key={service.id}
                                                        href={`/services/${service.slug}`}
                                                        className="py-2 text-[#126088] hover:text-[#21b6fc] transition-colors"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {service.title}
                                                    </Link>
                                                ))}
                                                <Link
                                                    href="/services"
                                                    className="py-2 text-[#21b6fc] font-semibold"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    Lihat Semua →
                                                </Link>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>

                                <Link
                                    href="/gallery"
                                    className="text-lg font-medium hover:text-[#21b6fc] transition-colors py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Galeri
                                </Link>

                                <Link
                                    href="/catalog"
                                    className="text-lg font-medium hover:text-[#21b6fc] transition-colors py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Katalog
                                </Link>

                                <Link
                                    href="/clients"
                                    className="text-lg font-medium hover:text-[#21b6fc] transition-colors py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Klien
                                </Link>

                                <Link
                                    href="/contact"
                                    className="text-lg font-medium hover:text-[#21b6fc] transition-colors py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Kontak
                                </Link>

                                <Button
                                    asChild
                                    className="hidden"
                                >
                                    <a href={whatsappLink} target={settings.whatsapp_enabled ? "_blank" : undefined}>
                                        <svg
                                            className="w-5 h-5 mr-2"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                        Hubungi Kami
                                    </a>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </nav>
            </div>
        </header>
    );
}
