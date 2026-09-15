import { Building2, Mail, MapPin, Phone } from 'lucide-react'
import { CompanySetting } from '@/types'
import { SectionTitle } from '@/components/atoms/section-title-guest'

interface CompanyProfileSectionProps {
    settings: CompanySetting
}

export function CompanyProfileSection({ settings }: CompanyProfileSectionProps) {
    const facts = [
        { icon: MapPin, label: 'Alamat', value: settings.company_address },
        { icon: Phone, label: 'Telepon', value: settings.company_phone },
        { icon: Mail, label: 'Email', value: settings.company_email },
    ].filter((fact) => fact.value)

    return (
        <section className="bg-[#f3fcff] px-4 py-16 sm:py-20">
            <div className="container mx-auto max-w-7xl">
                <SectionTitle subtitle={settings.tagline || 'Healthcare Supplies, Trusted Solutions'}>
                    Profil Perusahaan
                </SectionTitle>
                <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
                    <div className="rounded-2xl border border-[#c7e7f2] bg-white p-6 shadow-sm sm:p-8">
                        <div className="mb-5 flex items-center gap-3 text-[#075078]"><Building2 className="h-6 w-6" /><h3 className="text-xl font-bold">{settings.company_name}</h3></div>
                        <p className="leading-8 text-[#126088]">{settings.company_description || 'Penyedia solusi kebutuhan alat kesehatan dan perlengkapan pendukung dengan mengutamakan kualitas, keandalan, dan pelayanan terbaik.'}</p>
                    </div>
                    {facts.length > 0 && <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">{facts.map(({ icon: Icon, label, value }) => <div key={label} className="rounded-xl border border-[#c7e7f2] bg-white p-5"><div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#075078]"><Icon className="h-4 w-4" />{label}</div><p className="text-sm leading-6 text-[#126088]">{value}</p></div>)}</div>}
                </div>
            </div>
        </section>
    )
}