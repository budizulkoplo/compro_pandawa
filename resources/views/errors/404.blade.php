@extends('errors::layout')

@section('title', 'Halaman Tidak Ditemukan')

@section('content')
<div class="text-center">
    <!-- Error Code with Animation -->
    <div class="mb-8 animate-float">
        <div class="inline-block">
            <h1 class="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                404
            </h1>
            <div class="flex justify-center gap-2 mt-2">
                <div class="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                <div class="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
                <div class="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
            </div>
        </div>
    </div>

    <!-- Icon -->
    <div class="mb-6 flex justify-center">
        <div class="relative">
            <div class="absolute inset-0 bg-blue-400 rounded-full blur-2xl opacity-30 animate-pulse-slow"></div>
            <svg class="w-32 h-32 text-blue-600 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
        </div>
    </div>

    <!-- Message -->
    <h2 class="text-3xl md:text-4xl font-bold text-gray-900">
        Halaman Tidak Ditemukan
    </h2>
    <p class="text-lg text-gray-600 max-w-4xl mx-auto">
        Maaf, halaman yang Anda cari tidak dapat ditemukan atau mungkin telah dipindahkan.
    </p>
    <p class="text-gray-500 mb-8">
        Silakan periksa kembali URL atau kembali ke halaman utama kami.
    </p>

    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a href="{{ url('/') }}" class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Kembali ke Beranda
        </a>
        <button onclick="history.back()" class="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-3 rounded-xl border-2 border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Halaman Sebelumnya
        </button>
    </div>

    <!-- Quick Links -->
    <div class="mt-8 pt-4 border-t border-gray-200">
        <p class="text-sm text-gray-500 mb-2 font-semibold">Mungkin Anda mencari:</p>
        <div class="flex flex-wrap justify-center gap-3">
            <a href="{{ url('/about') }}" class="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                Tentang Kami
            </a>
            <span class="text-gray-300">•</span>
            <a href="{{ url('/services') }}" class="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                Layanan
            </a>
            <span class="text-gray-300">•</span>
            <a href="{{ url('/clients') }}" class="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                Klien
            </a>
            <span class="text-gray-300">•</span>
            <a href="{{ url('/gallery') }}" class="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                Galeri
            </a>
            <span class="text-gray-300">•</span>
            <a href="{{ url('/contact') }}" class="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                Kontak
            </a>
        </div>
    </div>
</div>
@endsection
