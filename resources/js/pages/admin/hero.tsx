import { Head, router } from '@inertiajs/react'
import { FormEvent, useState } from 'react'
import AppLayout from '@/layouts/app-layout'
import HeadingSmall from '@/components/organism/heading-small'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { BreadcrumbItem } from '@/types'
import { ImagePlus, Pencil, Plus, Save, Trash2, X } from 'lucide-react'
import { toast } from 'sonner'

interface HeroItem {
    id: number
    title: string
    subtitle: string | null
    description: string | null
    image_path: string | null
    cta_label: string | null
    cta_url: string | null
    is_active: boolean
    sort_order: number
}

interface Props { heroes: HeroItem[] }

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Hero Section', href: '/admin/management-content/hero' }]

const emptyForm = {
    title: '', subtitle: '', description: '', cta_label: 'Lihat Layanan', cta_url: '/services',
    sort_order: 0, is_active: true, image: null as File | null, image_path: '',
}

export default function HeroPage({ heroes }: Props) {
    const [form, setForm] = useState(emptyForm)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [processing, setProcessing] = useState(false)

    const edit = (hero: HeroItem) => {
        setEditingId(hero.id)
        setForm({ title: hero.title, subtitle: hero.subtitle || '', description: hero.description || '', cta_label: hero.cta_label || '', cta_url: hero.cta_url || '', sort_order: hero.sort_order, is_active: hero.is_active, image: null, image_path: hero.image_path || '' })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const reset = () => { setEditingId(null); setForm(emptyForm) }

    const submit = (event: FormEvent) => {
        event.preventDefault()
        setProcessing(true)
        const data = new FormData()
        Object.entries(form).forEach(([key, value]) => {
            if (key === 'image') { if (value) data.append('image', value as File); return }
            data.append(key, typeof value === 'boolean' ? (value ? '1' : '0') : String(value))
        })
        if (editingId) data.append('_method', 'PUT')
        router.post(editingId ? `/admin/management-content/hero/${editingId}` : '/admin/management-content/hero', data, {
            forceFormData: true,
            onSuccess: () => { toast.success(editingId ? 'Hero section diperbarui' : 'Hero section ditambahkan'); reset() },
            onError: () => toast.error('Periksa kembali data hero section'),
            onFinish: () => setProcessing(false),
        })
    }

    const remove = (id: number) => {
        if (!window.confirm('Hapus hero section ini?')) return
        router.delete(`/admin/management-content/hero/${id}`, { onSuccess: () => toast.success('Hero section dihapus') })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Hero Section | Admin" />
            <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6">
                <HeadingSmall title="Hero Section" description="Atur daftar tampilan utama yang muncul di halaman beranda." />

                <Card>
                    <CardHeader><CardTitle>{editingId ? 'Edit Hero Section' : 'Tambah Hero Section'}</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="grid gap-5 md:grid-cols-2">
                            <div className="space-y-2 md:col-span-2"><Label htmlFor="title">Judul</Label><Input id="title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
                            <div className="space-y-2"><Label htmlFor="subtitle">Subjudul</Label><Input id="subtitle" value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} /></div>
                            <div className="space-y-2"><Label htmlFor="sort_order">Urutan</Label><Input id="sort_order" type="number" min="0" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: Number(e.target.value) })} /></div>
                            <div className="space-y-2 md:col-span-2"><Label htmlFor="description">Deskripsi</Label><Textarea id="description" rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
                            <div className="space-y-2"><Label htmlFor="cta_label">Label tombol</Label><Input id="cta_label" value={form.cta_label} onChange={e => setForm({ ...form, cta_label: e.target.value })} /></div>
                            <div className="space-y-2"><Label htmlFor="cta_url">URL tombol</Label><Input id="cta_url" value={form.cta_url} onChange={e => setForm({ ...form, cta_url: e.target.value })} /></div>
                            <div className="space-y-2"><Label htmlFor="image_path">URL gambar latar (opsional)</Label><Input id="image_path" value={form.image_path} onChange={e => setForm({ ...form, image_path: e.target.value })} /></div>
                            <div className="space-y-2"><Label htmlFor="image">Upload gambar latar</Label><Input id="image" type="file" accept="image/*" onChange={e => setForm({ ...form, image: e.target.files?.[0] || null })} /></div>
                            <label className="flex items-center gap-2 text-sm md:col-span-2"><input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} /> Tampilkan di halaman beranda</label>
                            <div className="flex gap-2 md:col-span-2"><Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" />{editingId ? 'Simpan Perubahan' : 'Tambah Hero'}</Button>{editingId && <Button type="button" variant="outline" onClick={reset}><X className="mr-2 h-4 w-4" />Batal</Button>}</div>
                        </form>
                    </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2">
                    {heroes.map(hero => <Card key={hero.id} className={hero.is_active ? 'border-cyan-500' : ''}>
                        {hero.image_path && <img src={hero.image_path.startsWith('http') ? hero.image_path : `/storage/${hero.image_path}`} alt="" className="h-36 w-full object-cover" />}
                        <CardContent className="space-y-3 pt-5"><div className="flex items-start justify-between gap-3"><div><CardTitle className="text-lg">{hero.title}</CardTitle><p className="text-sm text-muted-foreground">{hero.subtitle}</p></div><span className="text-xs font-medium">{hero.is_active ? 'Aktif' : 'Nonaktif'}</span></div><p className="line-clamp-3 text-sm text-muted-foreground">{hero.description}</p><div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => edit(hero)}><Pencil className="mr-2 h-4 w-4" />Edit</Button><Button variant="destructive" size="sm" onClick={() => remove(hero.id)}><Trash2 className="mr-2 h-4 w-4" />Hapus</Button></div></CardContent>
                    </Card>)}
                    {heroes.length === 0 && <Card className="md:col-span-2"><CardContent className="flex flex-col items-center gap-2 py-12 text-center text-muted-foreground"><ImagePlus className="h-10 w-10" /><p>Belum ada hero section. Tambahkan hero pertama di atas.</p><Plus className="h-4 w-4" /></CardContent></Card>}
                </div>
            </div>
        </AppLayout>
    )
}