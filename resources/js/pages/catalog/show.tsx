import { Head, Link } from '@inertiajs/react'
import { MainLayout } from '@/layouts/main-layout'
import { CompanySetting } from '@/types'
import { Catalog } from '@/types/catalog'
import { ArrowLeft } from 'lucide-react'

interface CatalogShowPageProps {
    companySettings: CompanySetting
    catalog: Catalog
}

export default function CatalogShowPage({ companySettings, catalog }: CatalogShowPageProps) {
    return (
        <MainLayout
            settings={companySettings}
            title={catalog.name}
            description={catalog.description}
        >
            <Head title={`${catalog.name} | ${companySettings.company_name}`} />

            <section className="bg-[#f3fcff] px-4 pb-12 pt-32 sm:pb-16 sm:pt-40">
                <div className="mx-auto max-w-5xl">
                    <Link href="/catalog" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#126088] transition-colors hover:text-[#21b6fc]">
                        <ArrowLeft className="h-4 w-4" />
                        Kembali ke Katalog
                    </Link>
                    <div className="grid gap-10 md:grid-cols-2 md:items-start">
                        {catalog.image ? (
                            <img src={`/storage/${catalog.image}`} alt={catalog.name} className="aspect-[4/3] w-full rounded-xl object-cover shadow-md" />
                        ) : (
                            <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-[#e8f8fd] text-[#126088]">Tidak ada gambar</div>
                        )}
                        <div>
                            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#21b6fc]">Detail Katalog</p>
                            <h1 className="text-3xl font-bold text-[#00334e] sm:text-4xl">{catalog.name}</h1>
                            <p className="mt-5 text-lg leading-relaxed text-slate-600">{catalog.description}</p>
                            <p className="mt-6 text-2xl font-bold text-[#126088]">
                                {catalog.price !== null && catalog.price !== undefined && catalog.price !== ''
                                    ? `Rp ${Number(catalog.price).toLocaleString('id-ID')}`
                                    : 'Hubungi kami untuk informasi harga'}
                            </p>
                            <Link href="/contact" className="mt-8 inline-flex rounded-md bg-[#21b6fc] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#1e94d2]">
                                Tanyakan Produk Ini
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}