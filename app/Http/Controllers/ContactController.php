<?php

namespace App\Http\Controllers;

use App\Mail\NewMessageNotification;
use App\Mail\Contact\ThankYouMail;
use App\Models\CompanySetting;
use App\Models\Message;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        // Company Settings
        $companySettings = CompanySetting::first() ?? new CompanySetting([
            'company_name' => 'Company Name',
            'company_description' => 'Company Description'
        ]);

        // Featured Services for navigation
        $featuredServices = Service::active()
            ->ordered()
            ->take(4)
            ->get(['id', 'title', 'slug', 'description', 'image']);

        return Inertia::render('contact/index', [
            'companySettings' => $companySettings,
            'featuredServices' => $featuredServices,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        // Simpan ke database
        $message = Message::create($request->only(['name', 'email', 'phone', 'subject', 'message']));

        // Kirim email thank you ke user
        Mail::to($request->email)->send(new ThankYouMail($message));

        // Kirim notifikasi ke admin
        Mail::to(config('app.email', 'admin@company.com'))->send(new NewMessageNotification($message));

        // Untuk Inertia, gunakan redirect()->back() dengan flash message
        return redirect()->back()->with('success', 'Pesan Anda berhasil dikirim. Terima kasih!');
    }
}
