{{-- resources/views/emails/admin-reply.blade.php --}}
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Balasan dari {{ config('app.name') }}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #2563eb; margin-bottom: 20px;">Terima kasih telah menghubungi kami</h2>

            <p>Halo <strong>{{ $message->name }}</strong>,</p>

            <p>Terima kasih atas pesan yang Anda kirimkan. Berikut adalah balasan dari tim kami:</p>

            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0;">
                <h4 style="margin-top: 0; color: #374151;">Pesan Asli Anda:</h4>
                <p style="margin-bottom: 0;"><strong>Subjek:</strong> {{ $message->subject }}</p>
                <p style="margin-bottom: 0;"><strong>Pesan:</strong> {{ $message->message }}</p>
            </div>

            <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0;">
                <h4 style="margin-top: 0; color: #065f46;">Balasan dari Tim Kami:</h4>
                <div>{!! nl2br(e($reply)) !!}</div>
            </div>

            <p>Jika Anda memiliki pertanyaan lebih lanjut, jangan ragu untuk menghubungi kami kembali.</p>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 14px; margin: 0;">
                    Salam hormat,<br>
                    Tim {{ config('app.name') }}
                </p>
            </div>
        </div>
    </div>
</body>
</html>
