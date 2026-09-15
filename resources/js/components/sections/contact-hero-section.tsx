// resources/js/components/sections/contact-hero-section.tsx

interface ContactHeroSectionProps {
    title?: string;
    description?: string;
}

export function ContactHeroSection({
    title = "Hubungi Kami",
    description = "Kami siap membantu Anda. Silakan hubungi kami melalui form di bawah atau informasi kontak yang tersedia"
}: ContactHeroSectionProps) {
    return (
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-background py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                        {title}
                    </h1>
                    <p className="text-lg text-muted-foreground md:text-xl">
                        {description}
                    </p>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
                <div className="absolute -left-4 top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -right-4 bottom-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
            </div>
        </section>
    );
}
