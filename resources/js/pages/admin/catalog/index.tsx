import { Head, Link, router } from '@inertiajs/react'
import { useState } from 'react'
import AppLayout from '@/layouts/app-layout'
import HeadingSmall from '@/components/organism/heading-small'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Catalog } from '@/types/catalog'
import { BreadcrumbItem } from '@/types'
import { Edit, Plus, Search, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { index as catalogIndex, create as catalogCreate } from '@/routes/admin/management-content/catalog'

interface Props {
    catalogs: { data: Catalog[]; current_page: number; last_page: number; total: number }
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manajemen Konten', href: '#' },
    { title: 'Katalog', href: catalogIndex().url },
]

export default function CatalogIndex({ catalogs }: Props) {
    const [searchTerm, setSearchTerm] = useState('')
    const [deleteCatalog, setDeleteCatalog] = useState<Catalog | null>(null)
    const filteredCatalogs = catalogs.data.filter((catalog) => `${catalog.name} ${catalog.description}`.toLowerCase().includes(searchTerm.toLowerCase()))

    const confirmDelete = () => {
        if (!deleteCatalog) return
        router.delete(`/admin/management-content/catalog/${deleteCatalog.id}`, {
            onSuccess: () => { toast.success('Katalog berhasil dihapus'); setDeleteCatalog(null) },
            onError: () => toast.error('Gagal menghapus katalog'),
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Katalog | Admin" />
            <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <HeadingSmall title="Katalog" description="Kelola daftar produk atau item katalog website" />
                    <Link href={catalogCreate()}><Button><Plus className="mr-2 h-4 w-4" />Tambah Katalog</Button></Link>
                </div>
                <div className="relative max-w-sm"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-10" placeholder="Cari katalog..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} /></div>
                {filteredCatalogs.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredCatalogs.map((catalog) => <Card key={catalog.id} className="overflow-hidden">
                        {catalog.image ? <img src={`/storage/${catalog.image}`} alt={catalog.name} className="aspect-video w-full object-cover" /> : <div className="aspect-video w-full bg-muted" />}
                        <CardHeader><div className="flex items-start justify-between gap-2"><CardTitle className="text-lg">{catalog.name}</CardTitle><span className={`rounded-full px-2 py-1 text-xs ${catalog.isActive ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>{catalog.isActive ? 'Aktif' : 'Nonaktif'}</span></div></CardHeader>
                        <CardContent className="space-y-4"><p className="line-clamp-3 text-sm text-muted-foreground">{catalog.description}</p><div className="flex items-center justify-between"><span className="text-sm font-medium">{catalog.price !== null && catalog.price !== undefined && catalog.price !== '' ? `Rp ${Number(catalog.price).toLocaleString('id-ID')}` : 'Harga belum diatur'}</span><div className="flex gap-1"><Link href={`/admin/management-content/catalog/${catalog.id}/edit`}><Button variant="ghost" size="icon" title="Edit katalog"><Edit className="h-4 w-4" /></Button></Link><Button variant="ghost" size="icon" title="Hapus katalog" onClick={() => setDeleteCatalog(catalog)}><Trash2 className="h-4 w-4 text-destructive" /></Button></div></div></CardContent>
                    </Card>)}
                </div> : <div className="py-12 text-center text-muted-foreground">{searchTerm ? 'Katalog tidak ditemukan' : 'Belum ada katalog'}</div>}
                {catalogs.last_page > 1 && <div className="flex justify-center gap-2"><Button variant="outline" disabled={catalogs.current_page === 1} onClick={() => router.get(catalogIndex().url, { page: catalogs.current_page - 1 })}>Sebelumnya</Button><span className="flex items-center px-3 text-sm">Halaman {catalogs.current_page} dari {catalogs.last_page}</span><Button variant="outline" disabled={catalogs.current_page === catalogs.last_page} onClick={() => router.get(catalogIndex().url, { page: catalogs.current_page + 1 })}>Berikutnya</Button></div>}
            </div>
            <AlertDialog open={!!deleteCatalog} onOpenChange={(open) => !open && setDeleteCatalog(null)}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Hapus katalog?</AlertDialogTitle><AlertDialogDescription>Katalog &quot;{deleteCatalog?.name}&quot; akan dihapus dan tidak dapat dikembalikan.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">Hapus</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
        </AppLayout>
    )
}