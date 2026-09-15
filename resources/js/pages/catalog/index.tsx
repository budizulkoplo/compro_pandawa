import { MainLayout } from '@/layouts/main-layout'
import { CompanySetting } from '@/types'
import { Catalog } from '@/types/catalog'
import { Head, Link } from '@inertiajs/react'

interface CatalogPageProps {
    companySettings: CompanySetting
    catalogs: Catalog[]
}

export default function CatalogPage({ companySettings, catalogs }: CatalogPageProps) {
    return (
        <MainLayout
            settings={companySettings}
            title="Katalog"
            description={`Katalog produk dari ${companySettings.company_name}`}
        >
            <Head title={`Katalog | ${companySettings.company_name}`} />

            <section className="bg-[#f3fcff] px-4 pb-12 pt-32 sm:pb-16 sm:pt-40">
                <div className="mx-auto max-w-7xl">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#21b6fc]">Produk Kami</p>
                    <h1 className="text-4xl font-bold text-[#00334e] sm:text-5xl">Katalog</h1>
                    <p className="mt-4 max-w-2xl text-[#126088]">Temukan produk dan solusi yang kami sediakan untuk kebutuhan Anda.</p>
                </div>
            </section>

            <section className="px-4 py-12 sm:py-16">
                <div className="mx-auto max-w-7xl">
                    {catalogs.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {catalogs.map((catalog) => (
                                <Link href={`/catalog/${catalog.slug}`} key={catalog.id} className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
                                    {catalog.image ? (
                                        <img src={`/storage/${catalog.image}`} alt={catalog.name} className="aspect-[4/3] w-full object-cover" />
                                    ) : (
                                        <div className="flex aspect-[4/3] items-center justify-center bg-[#e8f8fd] text-sm text-[#126088]">Tidak ada gambar</div>
                                    )}
                                    <div className="space-y-3 p-5">
                                        <h2 className="text-xl font-semibold text-[#00334e] group-hover:text-[#21b6fc]">{catalog.name}</h2>
                                        <p className="line-clamp-4 text-sm leading-relaxed text-slate-600">{catalog.description}</p>
                                        <p className="pt-2 text-lg font-bold text-[#126088]">
                                            {catalog.price !== null && catalog.price !== undefined && catalog.price !== ''
                                                ? `Rp ${Number(catalog.price).toLocaleString('id-ID')}`
                                                : 'Hubungi kami untuk informasi harga'}
                                        </p>
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