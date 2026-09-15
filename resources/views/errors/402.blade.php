@extends('errors::layout')

@section('title', 'Pembayaran Diperlukan')

@section('content')
<div class="text-center">
    <!-- Error Code -->
    <div class="mb-8 animate-float">
        <h1 class="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-400">
            402
        </h1>
    </div>

    <!-- Icon -->
    <div class="mb-6 flex justify-center">
        <div class="relative">
            <div class="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-30 animate-pulse-slow"></div>
            <svg class="w-32 h-32 text-yellow-600 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
            </svg>
        </div>
    </div>

    <!-- Message -->
    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Pembayaran Diperlukan
    </h2>
    <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Akses ke konten ini memerlukan pembayaran atau langganan aktif.
    </p>

    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a href="{{ url('/contact') }}" class="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Hubungi Kami
        </a>
        <a href="{{ url('/') }}" class="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-3 rounded-xl border-2 border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Kembali ke Beranda
        </a>
    </div>
</div>
@endsection
