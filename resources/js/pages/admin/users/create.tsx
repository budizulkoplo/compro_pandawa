import { UserForm } from '@/components/organism/user-form';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Pengguna', href: '/admin/users' },
    { title: 'Tambah Pengguna', href: '/admin/users/create' },
];

export default function CreateUser() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Pengguna | Admin" />
            <div className="w-full px-4 py-6">
                <UserForm onBack={() => router.get('/admin/users')} />
            </div>
        </AppLayout>
    );
}
