import InputError from '@/components/organism/input-error';
import { InputPassword } from '@/components/organism/input-password';
import TextLink from '@/components/organism/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { Lock, LogIn, Mail, ShieldCheck } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    return (
        <AuthLayout
            title="Selamat Datang Kembali"
            description="Masuk untuk melanjutkan ke dashboard Anda"
        >
            <Head title="Masuk" />

            <div className="rounded-2xl border border-border/60 bg-card/50 p-6 shadow-sm backdrop-blur-sm sm:p-8">
                {/* Status Alert */}
                {status && (
                    <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-sm text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/50 dark:text-emerald-200">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                        <p className="font-medium">{status}</p>
                    </div>
                )}

                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="flex flex-col gap-5"
                >
                    {({ processing, errors }) => (
                        <>
                            {/* Email Field */}
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="email"
                                    className="text-sm font-medium text-foreground/80"
                                >
                                    Alamat Email
                                </Label>
                                <div className="group relative">
                                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="nama@perusahaan.com"
                                        className="h-11 pl-10 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/20"
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            {/* Password Field */}
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label
                                        htmlFor="password"
                                        className="text-sm font-medium text-foreground/80"
                                    >
                                        Kata Sandi
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
                                            tabIndex={5}
                                        >
                                            Lupa kata sandi?
                                        </TextLink>
                                    )}
                                </div>
                                <div className="group relative">
                                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                                    <InputPassword
                                        id="password"
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="h-11 pl-10 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/20"
                                    />
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                                />
                                <Label
                                    htmlFor="remember"
                                    className="cursor-pointer select-none text-sm font-normal text-muted-foreground"
                                >
                                    Ingat saya di perangkat ini
                                </Label>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="mt-1 h-11 w-full font-medium transition-all duration-200 active:scale-[0.98]"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing ? (
                                    <>
                                        <Spinner className="mr-2 h-4 w-4" />
                                        Memproses...
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="mr-2 h-4 w-4" />
                                        Masuk
                                    </>
                                )}
                            </Button>
                        </>
                    )}
                </Form>

                {/* Footer */}
                <div className="mt-6 border-t border-border/60 pt-5 text-center">
                    <p className="text-xs leading-relaxed text-muted-foreground">
                        Dengan masuk, Anda menyetujui{' '}
                        <TextLink
                            href="#"
                            className="font-medium text-primary hover:underline"
                        >
                            Syarat & Ketentuan
                        </TextLink>{' '}
                        dan{' '}
                        <TextLink
                            href="#"
                            className="font-medium text-primary hover:underline"
                        >
                            Kebijakan Privasi
                        </TextLink>
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
}