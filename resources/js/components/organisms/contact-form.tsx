// resources/js/components/organisms/contact-form.tsx

import { useForm } from "@inertiajs/react";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckCircle2, Loader2, Send } from "lucide-react";

export function ContactForm() {
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    useEffect(() => {
        if (recentlySuccessful) {
            setShowSuccessDialog(true);
            const timer = setTimeout(() => {
                reset();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [recentlySuccessful, reset]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/contact", {
            preserveScroll: true,
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Nama Lengkap <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Masukkan nama lengkap Anda"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            disabled={processing}
                            className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive">{errors.name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">
                            Email <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="nama@email.com"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            disabled={processing}
                            className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                            <p className="text-sm text-destructive">{errors.email}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <Label htmlFor="phone">Nomor Telepon</Label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="+62 8xx-xxxx-xxxx"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                            disabled={processing}
                            className={errors.phone ? "border-destructive" : ""}
                        />
                        {errors.phone && (
                            <p className="text-sm text-destructive">{errors.phone}</p>
                        )}
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                        <Label htmlFor="subject">
                            Subjek <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="subject"
                            type="text"
                            placeholder="Subjek pesan Anda"
                            value={data.subject}
                            onChange={(e) => setData("subject", e.target.value)}
                            disabled={processing}
                            className={errors.subject ? "border-destructive" : ""}
                        />
                        {errors.subject && (
                            <p className="text-sm text-destructive">{errors.subject}</p>
                        )}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                        <Label htmlFor="message">
                            Pesan <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                            id="message"
                            placeholder="Tulis pesan Anda di sini..."
                            rows={6}
                            value={data.message}
                            onChange={(e) => setData("message", e.target.value)}
                            disabled={processing}
                            className={errors.message ? "border-destructive" : ""}
                        />
                        {errors.message && (
                            <p className="text-sm text-destructive">{errors.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full"
                        size="lg"
                    >
                        {processing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Mengirim...
                            </>
                        ) : (
                            <>
                                <Send className="mr-2 h-4 w-4" />
                                Kirim Pesan
                            </>
                        )}
                    </Button>
                </form>

            {/* Success Dialog */}
            <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900">
                            <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <AlertDialogTitle className="text-center">
                            Pesan Berhasil Dikirim!
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            Terima kasih telah menghubungi kami. Kami akan segera merespons pesan Anda melalui email atau telepon.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setShowSuccessDialog(false)}>
                            Tutup
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
