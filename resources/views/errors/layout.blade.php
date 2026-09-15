<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title') - {{ config('app.name') }}</title>

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">

    @vite(['resources/css/app.css'])

    <style>
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }

        @keyframes pulse-slow {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .animate-float {
            animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
            animation: pulse-slow 2s ease-in-out infinite;
        }

        .gradient-bg {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%);
        }

        .pattern-bg {
            background-image:
                radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.1) 2%, transparent 0%),
                radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.1) 2%, transparent 0%);
            background-size: 100px 100px;
        }
    </style>
</head>
<body class="antialiased">
    <div class="min-h-screen gradient-bg pattern-bg flex items-center justify-center p-4">
        <div class="w-full max-w-4xl">
            <!-- Error Content -->
            <div class="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">

            <!-- logo -->
                <div class="flex justify-center py-8">
                    <a href="{{ url('/') }}" class="inline-block">
                        <div class="inline-flex items-center gap-3 hover:scale-105 transition-transform duration-300">
                            <img src="{{ asset('images/logo.png') }}" alt="Logo PT. Sinergy Garda Pratama" class="w-12 h-12 object-contain animate-float" />
                            <div class="text-left">
                                <div class="text-xl font-bold text-gray-900">PT. SINERGY GARDA</div>
                                <div class="text-sm text-blue-600 font-semibold">PRATAMA</div>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="p-4 md:p-6 lg:p-8">
                    @yield('content')
                </div>

                <!-- Footer -->
                <div class="bg-gray-50 border-t border-gray-200 px-2 py-6 text-center">
                    <p class="text-sm text-gray-600 mb-3">
                        Butuh bantuan? Hubungi kami
                    </p>
                    <div class="flex flex-wrap justify-center gap-4 text-sm">
                        <a href="tel:{{ config('app.phone') }}" class="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                            </svg>
                            {{ config('app.phone') }}
                        </a>
                        <span class="text-gray-400">•</span>
                        <a href="mailto:{{ config('app.email') }}" class="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                            </svg>
                            {{ config('app.email') }}
                        </a>
                    </div>
                    <p class="text-xs text-gray-500 mt-4">
                        © {{ date('Y') }} PT. Sinergy Garda Pratama. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
