@extends('errors::layout')

@section('title', 'Terlalu Banyak Permintaan')

@section('content')
<div class="text-center">
    <!-- Error Code -->
    <div class="mb-8 animate-float">
        <h1 class="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-400">
            429
        </h1>
    </div>

    <!-- Icon -->
    <div class="mb-6 flex justify-center">
        <div class="relative">
            <div class="absolute inset-0 bg-orange-400 rounded-full blur-2xl opacity-30 animate-pulse-slow"></div>
            <svg class="w-32 h-32 text-orange-600 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
        </div>
    </div>

    <!-- Message -->
    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Terlalu Banyak Permintaan
    </h2>
    <p class="text-lg text-gray-600 mb-2 max-w-2xl mx-auto">
        Anda telah mengirim terlalu banyak permintaan dalam waktu singkat.
    </p>
    <p class="text-gray-500 mb-8">
        Silakan tunggu beberapa saat sebelum mencoba lagi.
    </p>

    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button onclick="setTimeout(() => window.location.reload(), 3000)" class="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Tunggu & Coba Lagi
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
        <div class="bg-orange-50 border border-orange-200 rounded-xl p-4 text-left max-w-md">
            <div class="flex gap-3">
                <svg class="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                <div>
                    <h3 class="font-semibold text-orange-900 mb-1">Rate Limit Protection</h3>
                    <p class="text-sm text-orange-700">
                        Ini adalah fitur keamanan untuk mencegah penyalahgunaan server. Silakan tunggu beberapa menit sebelum mencoba lagi.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
