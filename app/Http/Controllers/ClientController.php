<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\CompanySetting;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index(Request $request): Response
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

        // Get all active clients
        $clients = Client::active()->ordered()->get();

        return Inertia::render('clients/index', [
            'companySettings' => $companySettings,
            'clients' => $clients,
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

        // Featured Services for navigation
        $featuredServices = Service::active()
            ->ordered()
            ->take(4)
            ->get(['id', 'title', 'slug', 'description', 'image']);

        // Get client detail
        $client = Client::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('clients/show', [
            'companySettings' => $companySettings,
            'client' => $client,
            'featuredServices' => $featuredServices,
        ]);
    }
}
