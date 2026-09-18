import { MainLayout } from '@/layouts/main-layout'
import { CompanySetting } from '@/types'
import { Catalog } from '@/types/catalog'
import { Head, Link, router } from '@inertiajs/react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowRight, PackageSearch, SlidersHorizontal } from 'lucide-react'

interface CatalogPageProps {
    companySettings: CompanySetting
    catalogs: Catalog[]
    services: { id: number; title: string; slug: string }[]
    featuredServices: {
        id: number
        title: string
        slug: string
        description: string
        image?: string
        isActive: boolean
        sortOrder: number
        created_at: string
        updated_at: string
    }[]
    selectedService?: string
}

export default function CatalogPage({ companySettings, catalogs, services, featuredServices, selectedService = '' }: CatalogPageProps) {
    const handleServiceChange = (value: string) => {
        router.get('/catalog', value === 'all' ? {} : { service: value }, {
            preserveScroll: true,
            preserveState: true,
        })
    }

    const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

    return (
        <MainLayout
            settings={companySettings}
            services={featuredServices}
            title="Katalog"
            description={`Katalog produk dari ${companySettings.company_name}`}
        >
            <Head title={`Katalog | ${companySettings.company_name}`} />

            <section className="relative overflow-hidden bg-[#063b58] px-4 pb-16 pt-32 text-white sm:pb-20 sm:pt-40">
                <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border-[32px] border-[#21b6fc]/20" />
                <div className="relative mx-auto max-w-7xl">
                    <div className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#8be3ff]"><PackageSearch className="h-5 w-5" /> Produk pilihan</div>
                    <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">Solusi yang tepat untuk kebutuhan Anda.</h1>
                    <p className="mt-5 max-w-2xl text-base leading-8 text-sky-100 sm:text-lg">Jelajahi produk berkualitas dari PT. Pandawa Meditech Pioneers dan temukan solusi yang mendukung layanan kesehatan Anda.</p>
                </div>
            </section>

            <section className="bg-slate-50 px-4 py-12 sm:py-16">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
                        <div>
                            <div className="flex items-center gap-2 text-[#126088]"><SlidersHorizontal className="h-4 w-4" /><h2 className="text-sm font-bold uppercase tracking-wider">Filter katalog</h2></div>
                            <p className="mt-1 text-sm text-slate-500">Temukan produk berdasarkan layanan yang Anda butuhkan.</p>
                        </div>
                        <Select value={selectedService || 'all'} onValueChange={handleServiceChange}>
                            <SelectTrigger className="w-full sm:w-72">
                                <SelectValue placeholder="Semua layanan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua layanan</SelectItem>
                                {services.map((service) => (
                                    <SelectItem key={service.id} value={service.slug}>{service.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {catalogs.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {catalogs.map((catalog) => (
                                <Link href={`/catalog/${catalog.slug}`} key={catalog.id} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#8be3ff] hover:shadow-xl">
                                    {catalog.image ? (
                                        <img src={`/storage/${catalog.image}`} alt={catalog.name} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
                                    ) : (
                                        <div className="flex aspect-[4/3] items-center justify-center bg-[#e8f8fd] text-sm text-[#126088]">Tidak ada gambar</div>
                                    )}
                                    <div className="flex flex-1 flex-col gap-3 p-6">
                                        {catalog.service && <span className="w-fit rounded-full bg-[#e8f8fd] px-3 py-1 text-xs font-semibold text-[#126088]">{catalog.service.title}</span>}
                                        <h2 className="text-xl font-bold text-[#00334e] group-hover:text-[#0c9bd8]">{catalog.name}</h2>
                                        <p className="line-clamp-3 text-sm leading-7 text-slate-600">{stripHtml(catalog.description)}</p>
                                        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                                            <p className="text-base font-bold text-[#126088]">
                                            {catalog.price !== null && catalog.price !== undefined && catalog.price !== ''
                                                ? `Rp ${Number(catalog.price).toLocaleString('id-ID')}`
                                                : 'Hubungi kami untuk informasi harga'}
                                            </p>
                                            <ArrowRight className="h-5 w-5 text-[#21b6fc] transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="py-16 text-center text-slate-500">Katalog sedang disiapkan.</div>
                    )}
                </div>
            </section>
        </MainLayout>
    )
}