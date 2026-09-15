@extends('errors::layout')

@section('title', 'Layanan Tidak Tersedia')

@section('content')
<div class="text-center">
    <!-- Error Code -->
    <div class="mb-8 animate-float">
        <h1 class="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-400">
            503
        </h1>
    </div>

    <!-- Icon -->
    <div class="mb-6 flex justify-center">
        <div class="relative">
            <div class="absolute inset-0 bg-indigo-400 rounded-full blur-2xl opacity-30 animate-pulse-slow"></div>
            <svg class="w-32 h-32 text-indigo-600 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
        </div>
    </div>

    <!-- Message -->
    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Sedang Dalam Pemeliharaan
    </h2>
    <p class="text-lg text-gray-600 mb-2 max-w-2xl mx-auto">
        Kami sedang melakukan pemeliharaan sistem untuk meningkatkan layanan kami.
    </p>
    <p class="text-gray-500 mb-8">
        Mohon maaf atas ketidaknyamanannya. Kami akan kembali sebentar lagi.
    </p>

    <!-- Countdown/Status (Optional) -->
    <div class="mb-8">
        <div class="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-full px-6 py-3">
            <div class="w-3 h-3 bg-indigo-600 rounded-full animate-pulse"></div>
            <span class="text-sm font-medium text-indigo-900">
                Pemeliharaan sedang berlangsung...
            </span>
        </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button onclick="window.location.reload()" class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Cek Status
        </button>
    </div>

    <!-- Info Box -->
    <div class="mt-12 inline-block">
        <div class="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-6 text-left max-w-2xl">
            <h3 class="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Apa yang sedang kami lakukan?
            </h3>
            <ul class="space-y-2 text-sm text-indigo-800">
                <li class="flex items-start gap-2">
                    <svg class="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    Meningkatkan performa server
                </li>
                <li class="flex items-start gap-2">
                    <svg class="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    Memperbarui keamanan sistem
                </li>
                <li class="flex items-start gap-2">
                    <svg class="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    Menambahkan fitur-fitur baru
                </li>
            </ul>
        </div>
    </div>

    <!-- Contact Info -->
    <div class="mt-8">
        <p class="text-sm text-gray-600 mb-3">
            Untuk informasi lebih lanjut, hubungi:
        </p>
        <a href="mailto:{{ config('app.email') }}" class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
            {{ config('app.email') }}
        </a>
    </div>
</div>
@endsection
