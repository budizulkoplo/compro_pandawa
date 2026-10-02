import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Plus, Search, Trash2, Users } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import type { BreadcrumbItem, SharedData } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedUsers {
    data: User[];
    current_page: number;
    last_page: number;
    total: number;
    links: PaginationLink[];
}

interface Props {
    users: PaginatedUsers;
    filters: { search?: string };
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Pengguna', href: '/admin/users' }];

export default function UsersIndex({ users, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const page = usePage<SharedData>();
    const currentUserId = page.props.auth.user.id;

    const submitSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.get('/admin/users', { search: search || undefined }, { preserveState: true, replace: true });
    };

    const removeUser = (user: User) => {
        if (user.id === currentUserId) {
            return;
        }

        if (window.confirm(`Hapus pengguna ${user.name}?`)) {
            router.delete(`/admin/users/${user.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengguna | Admin" />
            <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-semibold">Pengguna</h1>
                        <p className="text-sm text-muted-foreground">Kelola akun yang dapat mengakses panel admin.</p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/users/create">
                            <Plus />
                            Tambah Pengguna
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Daftar Pengguna ({users.total})
                        </CardTitle>
                        <form onSubmit={submitSearch} className="flex w-full gap-2 sm:max-w-sm">
                            <Input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Cari nama atau email..."
                                aria-label="Cari pengguna"
                            />
                            <Button type="submit" variant="outline" size="icon" aria-label="Cari">
                                <Search />
                            </Button>
                        </form>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Dibuat</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                                            Belum ada pengguna yang sesuai.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users.data.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">
                                                {user.name}
                                                {user.id === currentUserId && (
                                                    <span className="ml-2 text-xs text-muted-foreground">(Anda)</span>
                                                )}
                                            </TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{new Date(user.created_at).toLocaleDateString('id-ID')}</TableCell>
                                            <TableCell>
                                                <div className="flex justify-end gap-2">
                                                    <Button asChild variant="outline" size="icon" aria-label={`Edit ${user.name}`}>
                                                        <Link href={`/admin/users/${user.id}/edit`}>
                                                            <Pencil />
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="icon"
                                                        aria-label={`Hapus ${user.name}`}
                                                        disabled={user.id === currentUserId}
                                                        onClick={() => removeUser(user)}
                                                    >
                                                        <Trash2 />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>

                        {users.last_page > 1 && (
                            <div className="mt-4 flex flex-wrap justify-end gap-2">
                                {users.links.map((link, index) => {
                                    const label = link.label.replace('&laquo;', '«').replace('&raquo;', '»');

                                    return link.url ? (
                                        <Button key={`${link.label}-${index}`} variant={link.active ? 'default' : 'outline'} size="sm" asChild>
                                            <Link href={link.url} preserveScroll>{label}</Link>
                                        </Button>
                                    ) : (
                                        <Button key={`${link.label}-${index}`} variant="outline" size="sm" disabled>
                                            {label}
                                        </Button>
                                    );
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
