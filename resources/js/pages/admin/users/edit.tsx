import { UserForm } from '@/components/organism/user-form';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
}

export default function EditUser({ user }: { user: User }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Pengguna', href: '/admin/users' },
        { title: user.name, href: `/admin/users/${user.id}/edit` },
        { title: 'Edit', href: `/admin/users/${user.id}/edit` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${user.name} | Admin`} />
            <div className="w-full px-4 py-6">
                <UserForm user={user} onBack={() => router.get('/admin/users')} />
            </div>
        </AppLayout>
    );
}
