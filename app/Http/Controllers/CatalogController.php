<?php

namespace App\Http\Controllers;

use App\Models\Catalog;
use App\Models\CompanySetting;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    public function index(Request $request): Response
    {
        $companySettings = CompanySetting::first() ?? new CompanySetting([
            'company_name' => 'Company Name',
            'company_description' => 'Company Description',
        ]);

        $serviceSlug = $request->string('service')->toString();

        $catalogs = Catalog::with('service')
            ->where('isActive', true)
            ->when($serviceSlug, fn ($query) => $query->whereHas(
                'service',
                fn ($serviceQuery) => $serviceQuery->where('slug', $serviceSlug)->where('isActive', true)
            ))
            ->orderBy('sortOrder')
            ->latest()
            ->get();

        $services = Service::active()->ordered()->get(['id', 'title', 'slug']);
        $featuredServices = Service::active()
            ->ordered()
            ->take(6)
            ->get(['id', 'title', 'slug', 'description', 'image']);

        return Inertia::render('catalog/index', [
            'companySettings' => $companySettings,
            'catalogs' => $catalogs,
            'services' => $services,
            'featuredServices' => $featuredServices,
            'selectedService' => $serviceSlug,
        ]);
    }

    public function show(string $slug): Response
    {
        $companySettings = CompanySetting::first() ?? new CompanySetting([
            'company_name' => 'Company Name',
            'company_description' => 'Company Description',
        ]);

        $catalog = Catalog::with('service:id,title,slug')
            ->where('slug', $slug)
            ->where('isActive', true)
            ->firstOrFail();

        $featuredServices = Service::active()
            ->ordered()
            ->take(6)
            ->get(['id', 'title', 'slug', 'description', 'image']);

        return Inertia::render('catalog/show', [
            'companySettings' => $companySettings,
            'catalog' => $catalog,
            'featuredServices' => $featuredServices,
        ]);
    }
}