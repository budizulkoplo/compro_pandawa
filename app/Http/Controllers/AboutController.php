<?php

namespace App\Http\Controllers;

use App\Models\AboutUs;
use App\Models\Certificate;
use App\Models\CompanySetting;
use App\Models\Service;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {
        $about = AboutUs::first();
        $certificates = Certificate::active()->ordered()->get();
        $companySettings = CompanySetting::getSettings();
        $featuredServices = Service::active()
            ->ordered()
            ->take(4)
            ->get(['id', 'title', 'slug', 'description', 'image']);

        return Inertia::render('about', [
            'companySettings' => $companySettings,
            'featuredServices' => $featuredServices,
            'about' => $about,
            'certificates' => $certificates,
        ]);
    }
}
