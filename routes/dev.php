<?php

use Illuminate\Support\Facades\Route;

Route::get('/test-email', [\App\Http\Controllers\TestEmailController::class, 'viewTestEmail'])->name('test-email');
