<?php

namespace App\Http\Controllers;

use App\Models\Catalog;
use App\Models\CompanySetting;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    public function index(): Response
    {
        $companySettings = CompanySetting::first() ?? new CompanySetting([
            'company_name' => 'Company Name',
            'company_description' => 'Company Description',
        ]);

        $catalogs = Catalog::where('isActive', true)
            ->orderBy('sortOrder')
            ->latest()
            ->get();

        return Inertia::render('catalog/index', [
            'companySettings' => $companySettings,
            'catalogs' => $catalogs,
        ]);
    }

    public function show(string $slug): Response
    {
        $companySettings = CompanySetting::first() ?? new CompanySetting([
            'company_name' => 'Company Name',
            'company_description' => 'Company Description',
        ]);

        $catalog = Catalog::where('slug', $slug)
            ->where('isActive', true)
            ->firstOrFail();

        return Inertia::render('catalog/show', [
            'companySettings' => $companySettings,
            'catalog' => $catalog,
        ]);
    }
}