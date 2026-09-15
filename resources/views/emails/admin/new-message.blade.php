{{-- resources/views/emails/admin/new-message.blade.php --}}
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pesan Baru dari Website</title>
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
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
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

        .message-info {
            background-color: #f3f4f6;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 24px;
        }

        .info-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 12px;
            padding-bottom: 12px;
            border-bottom: 1px solid #e5e7eb;
        }

        .info-row:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }

        .info-label {
            font-weight: 600;
            color: #6b7280;
            min-width: 80px;
            font-size: 14px;
        }

        .info-value {
            font-weight: 500;
            color: #111827;
            flex: 1;
            text-align: right;
        }

        .message-subject {
            font-size: 20px;
            font-weight: 700;
            color: #111827;
            margin-bottom: 16px;
            padding-bottom: 16px;
            border-bottom: 2px solid #e5e7eb;
        }

        .message-content {
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            white-space: pre-wrap;
            line-height: 1.7;
        }

        .action-button {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            text-shadow: none;
            color: #ffffff;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            transition: all 0.2s ease;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .action-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .email-footer {
            background-color: #f9fafb;
            padding: 24px;
            text-align: center;
            font-size: 14px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
        }

        .timestamp {
            font-size: 12px;
            color: #9ca3af;
            font-style: italic;
        }

        .priority-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
        }

        .priority-high { background-color: #fee2e2; color: #dc2626; }
        .priority-medium { background-color: #fef3c7; color: #d97706; }
        .priority-low { background-color: #d1fae5; color: #059669; }

        @media (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 0;
            }

            .email-header, .email-content, .email-footer {
                padding: 20px 16px;
            }

            .info-row {
                flex-direction: column;
                align-items: flex-start;
            }

            .info-value {
                text-align: left;
                margin-top: 4px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <h1>📩 Pesan Baru</h1>
            <p>Ada pesan baru yang masuk dari website</p>
        </div>

        <!-- Content -->
        <div class="email-content">
            <!-- Message Info -->
            <div class="message-info">
                <div class="info-row">
                    <span class="info-label">Dari:</span>
                    <span class="info-value">{{ $customerMessage->name }}</span>
                </div>

                <div class="info-row">
                    <span class="info-label">Email:</span>
                    <span class="info-value">
                        <a href="mailto:{{ $customerMessage->email }}" style="color: #3b82f6; text-decoration: none;">
                            {{ $customerMessage->email }}
                        </a>
                    </span>
                </div>

                @if($customerMessage->phone)
                <div class="info-row">
                    <span class="info-label">Telepon:</span>
                    <span class="info-value">
                        <a href="tel:{{ $customerMessage->phone }}" style="color: #3b82f6; text-decoration: none;">
                            {{ $customerMessage->phone }}
                        </a>
                    </span>
                </div>
                @endif

                <div class="info-row">
                    <span class="info-label">Waktu:</span>
                    <span class="info-value">
                        {{ $customerMessage->created_at->format('d M Y, H:i') }} WIB
                    </span>
                </div>
            </div>

            <!-- Subject -->
            <div class="message-subject">
                {{ $customerMessage->subject }}
            </div>

            <!-- Message Content -->
            <div class="message-content">{{ $customerMessage->message }}</div>

            <!-- Action Button -->
            <div style="text-align: center; margin: 32px 0;">
                <a href="{{ $adminUrl }}" class="action-button">
                    📱 Buka di Admin Panel
                </a>
            </div>

            <!-- Quick Actions -->
            <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-top: 24px;">
                <h3 style="margin: 0 0 16px 0; color: #374151; font-size: 16px;">Aksi Cepat:</h3>
                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <a href="mailto:{{ $customerMessage->email }}?subject=Re: {{ $customerMessage->subject }}"
                       style="color: #3b82f6; text-decoration: none; font-size: 14px; font-weight: 500;">
                        ✉️ Balas via Email
                    </a>
                    @if($customerMessage->phone)
                    <a href="https://wa.me/{{ preg_replace('/[^0-9]/', '', $customerMessage->phone) }}"
                       style="color: #059669; text-decoration: none; font-size: 14px; font-weight: 500;">
                        💬 Chat WhatsApp
                    </a>
                    @endif
                    <a href="{{ route('admin.message.index') }}"
                       style="color: #6b7280; text-decoration: none; font-size: 14px; font-weight: 500;">
                        📋 Lihat Semua
                    </a>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="email-footer">
            <p style="margin: 0 0 8px 0;">
                Email ini dikirim otomatis dari sistem website.
            </p>
            <p style="margin: 0; font-size: 12px;">
                Silakan login ke admin panel untuk membalas pesan ini.
            </p>
            <div class="timestamp" style="margin-top: 16px;">
                Dikirim pada {{ now()->format('d M Y, H:i:s') }} WIB
            </div>
        </div>
    </div>
</body>
</html>
