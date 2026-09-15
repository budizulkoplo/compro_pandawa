<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terima Kasih - SIGAP</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            background-color: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
            color: white;
            padding: 32px 24px;
            text-align: center;
        }
        .header h1 {
            margin: 0 0 5px 0;
            font-size: 28px;
        }
        .header p {
            margin: 0;
            opacity: 0.9;
            font-size: 16px;
        }
        .success-icon {
            font-size: 48px;
            margin-bottom: 20px;
        }
        .content {
            padding: 20px 0;
        }
        .highlight-box {
            background-color: #f0fdf4;
            border-left: 4px solid #2196f3;
            padding: 20px;
            border-radius: 0 8px 8px 0;
            margin: 20px 0;
        }
        .info-summary {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e9ecef;
        }
        .info-row:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }
        .info-label {
            font-weight: bold;
            color: #555;
        }
        .info-value {
            color: #333;
        }
        .next-steps {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .next-steps h3 {
            color: #856404;
            margin-top: 0;
        }
        .next-steps ul {
            color: #856404;
            margin-bottom: 0;
        }
        .customerMessage-info {
            background-color: #e7f3ff;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
        }
        .customerMessage-info h3 {
            color: #0066cc;
            margin-top: 0;
        }
        .btn {
            display: inline-block;
            background-color: #007bff;
            color: #ffffff;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin: 10px 5px;
            transition: background-color 0.3s ease;
        }
        .btn:hover {
            background-color: #0056b3;
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

        .social-links {
            margin: 20px 0;
        }
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #667eea;
            text-decoration: none;
        }
        @media (max-width: 600px) {
            .info-row {
                flex-direction: column;
            }
            .info-label {
                margin-bottom: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Terima Kasih!</h1>
            <p>Pesan Anda telah berhasil diterima</p>
        </div>

        <div class="content">
            <p>Halo <strong>{{ $customerMessage->name }}</strong>,</p>

            <p>Terima kasih telah menghubungi kami.
            Pesan Anda telah berhasil diterima dan akan segera ditindaklanjuti oleh tim kami.</p>

            <div class="highlight-box">
                <strong>📋 Ringkasan Pesan Anda:</strong>
                <div class="info-summary">
                    <div class="info-row">
                        <span class="info-label">Nama:</span>
                        <span class="info-value">{{ $customerMessage->name }}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Email:</span>
                        <span class="info-value">{{ $customerMessage->email }}</span>
                    </div>
                    @if($customerMessage->phone)
                    <div class="info-row">
                        <span class="info-label">Telepon:</span>
                        <span class="info-value">{{ $customerMessage->phone }}</span>
                    </div>
                    @endif
                    @if($customerMessage->subject)
                    <div class="info-row">
                        <span class="info-label">Subjek:</span>
                        <span class="info-value">{{ $customerMessage->subject }}</span>
                    </div>
                    @endif
                    <div class="info-row">
                        <span class="info-label">Waktu Dikirim:</span>
                        <span class="info-value">{{ $customerMessage->created_at->format('d F Y, H:i') }} WIB</span>
                    </div>
                </div>
            </div>

            <div class="next-steps">
                <h3>🚀 Langkah Selanjutnya</h3>
                <ul>
                    <li><strong>Konfirmasi Otomatis:</strong> Email ini adalah konfirmasi bahwa pesan Anda telah diterima</li>
                    <li><strong>Review & Analisis:</strong> Tim kami akan menganalisis pesan Anda dalam 1x24 jam</li>
                </ul>
            </div>

            <div class="customerMessage-info">
                <h3>📞 Butuh Respons Lebih Cepat?</h3>
                <p>Jika pesan Anda bersifat urgent, Anda dapat menghubungi kami langsung:</p>
                <div style="margin: 15px 0;">
                    @if (config('app.email'))
                    <strong>📧 Email:</strong> {{ config('app.email') }}<br>
                    @endif
                    @if (config('app.whatsapp'))
                    <strong>📱 WhatsApp:</strong> {{ config('app.whatsapp') }}<br>
                    @endif
                    @if (config('app.operating_hours'))
                    <strong>⏰ Jam Operasional:</strong> {{ config('app.operating_hours') }}
                    @endif
                </div>
                <a href="{{ config('app.url') }}" class="btn">🌐 Kunjungi Website</a>
            </div>
        </div>

        <div class="email-footer">

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
