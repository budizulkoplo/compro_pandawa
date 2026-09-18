import { Head, Link } from '@inertiajs/react'
import { MainLayout } from '@/layouts/main-layout'
import { CompanySetting } from '@/types'
import { Catalog } from '@/types/catalog'
import { ArrowLeft, ArrowRight, CheckCircle2, Tag } from 'lucide-react'

interface CatalogShowPageProps {
    companySettings: CompanySetting
    catalog: Catalog
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
}

export default function CatalogShowPage({ companySettings, catalog, featuredServices }: CatalogShowPageProps) {
    return (
        <MainLayout
            settings={companySettings}
            services={featuredServices}
            title={catalog.name}
            description={catalog.description}
        >
            <Head title={`${catalog.name} | ${companySettings.company_name}`} />

            <section className="bg-slate-50 px-4 pb-16 pt-16 sm:pb-24 sm:pt-20">
                <div className="mx-auto max-w-5xl">
                    <Link href="/catalog" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#126088] transition-colors hover:text-[#21b6fc]">
                        <ArrowLeft className="h-4 w-4" />
                        Kembali ke Katalog
                    </Link>
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
                        <div>
                        {catalog.image ? (
                            <img src={`/storage/${catalog.image}`} alt={catalog.name} className="block h-auto max-h-[min(70vh,720px)] w-full object-contain bg-slate-100" />
                        ) : (
                            <div className="flex min-h-64 items-center justify-center bg-[#e8f8fd] text-[#126088]">Tidak ada gambar</div>
                        )}
                        </div>
                        <div className="flex flex-col p-7 sm:p-10">
                            {catalog.service && <Link href={`/catalog?service=${catalog.service.slug}`} className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#e8f8fd] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#126088]"><Tag className="h-3.5 w-3.5" />{catalog.service.title}</Link>}
                            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#0c9bd8]">Detail produk</p>
                            <h1 className="text-3xl font-bold tracking-tight text-[#00334e] sm:text-4xl">{catalog.name}</h1>
                            <div className="prose prose-slate mt-5 max-w-none text-base leading-7 prose-headings:text-[#00334e] prose-a:text-[#0c9bd8] prose-strong:text-[#00334e]" dangerouslySetInnerHTML={{ __html: catalog.description }} />
                            <div className="mt-8 border-t border-slate-100 pt-6">
                                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Harga</p>
                                <p className="text-2xl font-bold text-[#126088]">
                                {catalog.price !== null && catalog.price !== undefined && catalog.price !== ''
                                    ? `Rp ${Number(catalog.price).toLocaleString('id-ID')}`
                                    : 'Hubungi kami untuk informasi harga'}
                                </p>
                            </div>
                            <div className="mt-8 flex flex-wrap items-center gap-3">
                                <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-[#21b6fc] px-5 py-3 font-bold text-white transition-colors hover:bg-[#0c9bd8]">Tanyakan Produk Ini <ArrowRight className="h-4 w-4" /></Link>
                                <span className="inline-flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Konsultasi produk</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}