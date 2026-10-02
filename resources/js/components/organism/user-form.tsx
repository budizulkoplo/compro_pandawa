import InputError from '@/components/organism/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { type FormEvent } from 'react';

interface ManagedUser {
    id: number;
    name: string;
    email: string;
}

interface UserFormProps {
    user?: ManagedUser;
    onBack: () => void;
}

interface UserFormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export function UserForm({ user, onBack }: UserFormProps) {
    const isEditing = Boolean(user);
    const { data, setData, post, put, processing, errors } = useForm<UserFormData>({
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: '',
        password_confirmation: '',
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = { onSuccess: onBack };

        if (isEditing && user) {
            put(`/admin/users/${user.id}`, options);
        } else {
            post('/admin/users', options);
        }
    };

    return (
        <Card className="mx-auto max-w-2xl">
            <CardHeader>
                <CardTitle>{isEditing ? 'Edit Pengguna' : 'Tambah Pengguna'}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="space-y-5">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nama</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(event) => setData('name', event.target.value)}
                            required
                            autoFocus
                            autoComplete="name"
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(event) => setData('email', event.target.value)}
                            required
                            autoComplete="email"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">
                            Password {isEditing && <span className="font-normal text-muted-foreground">(kosongkan jika tidak diubah)</span>}
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(event) => setData('password', event.target.value)}
                            required={!isEditing}
                            autoComplete={isEditing ? 'new-password' : 'new-password'}
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(event) => setData('password_confirmation', event.target.value)}
                            required={!isEditing && data.password.length > 0}
                            autoComplete="new-password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={onBack} disabled={processing}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
