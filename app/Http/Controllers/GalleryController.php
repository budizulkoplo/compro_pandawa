<?php

namespace App\Http\Controllers;

use App\Models\GalleryCategory;
use App\Models\CompanySetting;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
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

        // Gallery Categories with preview items
        $categories = GalleryCategory::with(['activeItems' => function ($query) {
            $query->take(4);
        }])
            ->where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->withCount('activeItems')
            ->get();

        return Inertia::render('gallery/index', [
            'companySettings' => $companySettings,
            'categories' => $categories,
            'featuredServices' => $featuredServices,
        ]);
    }

    public function category(string $slug): Response
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

        // Gallery Category with all active items
        $category = GalleryCategory::with(['activeItems' => function ($query) {
            $query->orderBy('sort_order', 'asc');
        }])
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('gallery/category', [
            'companySettings' => $companySettings,
            'category' => $category,
            'featuredServices' => $featuredServices,
        ]);
    }
}
