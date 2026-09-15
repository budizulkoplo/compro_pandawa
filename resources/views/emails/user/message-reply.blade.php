{{-- resources/views/emails/user/message-reply.blade.php --}}
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Balasan untuk Pesan Anda</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #374151;
            background-color: #f9fafb;
            margin: 0;
            padding: 0;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .email-header {
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
            color: white;
            padding: 32px 24px;
            text-align: center;
        }

        .email-header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
        }

        .email-header p {
            margin: 8px 0 0 0;
            opacity: 0.9;
            font-size: 16px;
        }

        .email-content {
            padding: 32px 24px;
        }

        .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #111827;
            margin-bottom: 20px;
        }

        .reply-content {
            background-color: #f0fdf4;
            border-left: 4px solid #059669;
            border-radius: 0 8px 8px 0;
            padding: 24px;
            margin: 24px 0;
        }

        .reply-content h3 {
            margin: 0 0 16px 0;
            color: #047857;
            font-size: 16px;
            font-weight: 600;
        }

        .original-message {
            background-color: #f9fafb;
            border-radius: 8px;
            padding: 20px;
            margin: 24px 0;
            border: 1px solid #e5e7eb;
        }

        .original-message h4 {
            margin: 0 0 12px 0;
            color: #6b7280;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .original-subject {
            font-weight: 600;
            color: #111827;
            margin-bottom: 8px;
        }

        .original-content {
            color: #6b7280;
            font-style: italic;
            white-space: pre-wrap;
        }

        .contact-info {
            background-color: #eff6ff;
            border-radius: 8px;
            padding: 20px;
            margin: 24px 0;
            border: 1px solid #dbeafe;
        }

        .contact-info h3 {
            margin: 0 0 16px 0;
            color: #1e40af;
            font-size: 16px;
        }

        .email-footer {
            background-color: #f9fafb;
            padding: 24px;
            text-align: center;
            font-size: 14px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
        }

        .footer-links {
            margin: 16px 0;
        }

        .footer-links a {
            color: #3b82f6;
            text-decoration: none;
            margin: 0 12px;
            font-weight: 500;
        }

        @media (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 0;
            }

            .email-header, .email-content, .email-footer {
                padding: 20px 16px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <p>Tim kami telah menanggapi pesan Anda</p>
        </div>

        <!-- Content -->
        <div class="email-content">
            <div class="greeting">
                Halo {{ $customerMessage->name }},
            </div>

            <p>
                Terima kasih telah menghubungi kami. Berikut adalah balasan untuk pesan yang Anda kirimkan:
            </p>

            <!-- Reply Content -->
            <div class="reply-content">
                <h3>📝 Balasan dari Tim Kami:</h3>
                <div>{!! $replyContent !!}</div>
            </div>

            <!-- Original Message -->
            <div class="original-message">
                <h4>Pesan Asli Anda:</h4>
                <div class="original-subject">{{ $customerMessage->subject }}</div>
                <div class="original-content">{{ $customerMessage->message }}</div>
                <div style="font-size: 12px; color: #9ca3af; margin-top: 12px;">
                    Dikirim pada: {{ $customerMessage->created_at->format('d M Y, H:i') }} WIB
                </div>
            </div>

            <!-- Contact Info -->
            <div class="contact-info">
                <h3>📞 Butuh Bantuan Lebih Lanjut?</h3>
                <p style="margin: 0;">
                    Jika Anda memiliki pertanyaan tambahan, jangan ragu untuk menghubungi kami:
                </p>
                <ul style="margin: 12px 0; padding-left: 20px;">
                    <li>Email: {{ config('mail.from.address') }}</li>
                    @if(config('app.phone'))
                    <li>Telepon: {{ config('app.phone') }}</li>
                    @endif
                    @if(config('app.whatsapp'))
                    <li>WhatsApp: {{ config('app.whatsapp') }}</li>
                    @endif
                </ul>
            </div>

            <p style="margin-top: 32px; color: #6b7280;">
                Terima kasih atas kepercayaan Anda kepada layanan kami.
            </p>

            <p style="margin: 16px 0 0 0; font-weight: 600;">
                Salam hormat,<br>
                <span style="color: #059669;">Tim {{ config('app.name') }}</span>
            </p>
        </div>

        <!-- Footer -->
        <div class="email-footer">
            <p style="margin: 0 0 8px 0;">
                Email ini dikirim otomatis sebagai balasan atas pesan Anda.
            </p>

            <div class="footer-links">
                @if(config('app.url'))
                <a href="{{ config('app.url') }}">🏠 Website</a>
                @endif
                @if(config('app.contact_url'))
                <a href="{{ config('app.contact_url') }}">📞 Kontak</a>
                @endif
                @if(config('app.social.facebook'))
                <a href="{{ config('app.social.facebook') }}">📘 Facebook</a>
                @endif
                @if(config('app.social.instagram'))
                <a href="{{ config('app.social.instagram') }}">📷 Instagram</a>
                @endif
            </div>

            <p style="margin: 16px 0 0 0; font-size: 12px; color: #9ca3af;">
                © {{ date('Y') }} {{ config('app.name') }}. Semua hak dilindungi.
            </p>
        </div>
    </div>
</body>
</html>
