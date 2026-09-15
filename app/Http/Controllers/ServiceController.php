<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\CompanySetting;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        // Company Settings
        $companySettings = CompanySetting::first() ?? new CompanySetting([
            'company_name' => 'Company Name',
            'company_description' => 'Company Description'
        ]);

        // All Active Services
        $services = Service::active()->ordered()->get();

        // Featured Services for navigation
        $featuredServices = Service::active()
            ->ordered()
            ->take(4)
            ->get(['id', 'title', 'slug', 'description', 'image']);

        return Inertia::render('services/index', [
            'companySettings' => $companySettings,
            'services' => $services,
            'featuredServices' => $featuredServices,
        ]);
    }

    public function show(string $slug): Response
    {
        // Company Settings
        $companySettings = CompanySetting::first() ?? new CompanySetting([
            'company_name' => 'Company Name',
            'company_description' => 'Company Description'
        ]);

        // Service Detail
        $service = Service::where('slug', $slug)
            ->where('isActive', true)
            ->firstOrFail();

        // Featured Services for navigation
        $featuredServices = Service::active()
            ->ordered()
            ->take(4)
            ->get(['id', 'title', 'slug', 'description', 'image']);

        return Inertia::render('services/show', [
            'companySettings' => $companySettings,
            'service' => $service,
            'featuredServices' => $featuredServices,
        ]);
    }
}
