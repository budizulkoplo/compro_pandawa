@extends('errors::layout')

@section('title', 'Halaman Kedaluwarsa')

@section('content')
<div class="text-center">
    <!-- Error Code -->
    <div class="mb-8 animate-float">
        <h1 class="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-400">
            419
        </h1>
    </div>

    <!-- Icon -->
    <div class="mb-6 flex justify-center">
        <div class="relative">
            <div class="absolute inset-0 bg-purple-400 rounded-full blur-2xl opacity-30 animate-pulse-slow"></div>
            <svg class="w-32 h-32 text-purple-600 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
        </div>
    </div>

    <!-- Message -->
    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Sesi Telah Berakhir
    </h2>
    <p class="text-lg text-gray-600 mb-2 max-w-2xl mx-auto">
        Sesi Anda telah berakhir karena tidak ada aktivitas untuk waktu yang lama.
    </p>
    <p class="text-gray-500 mb-8">
        Silakan refresh halaman untuk melanjutkan.
    </p>

    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button onclick="window.location.reload()" class="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Refresh Halaman
        </button>
        <a href="{{ url('/') }}" class="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-3 rounded-xl border-2 border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Kembali ke Beranda
        </a>
    </div>

    <!-- Info Box -->
    <div class="mt-8 inline-block">
        <div class="bg-purple-50 border border-purple-200 rounded-xl p-4 text-left max-w-md">
            <div class="flex gap-3">
                <svg class="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div>
                    <h3 class="font-semibold text-purple-900 mb-1">Mengapa ini terjadi?</h3>
                    <p class="text-sm text-purple-700">
                        Ini adalah fitur keamanan untuk melindungi data Anda. Sesi akan berakhir setelah periode tidak aktif atau saat token CSRF kedaluwarsa.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
