<?php

namespace App\Http\Controllers;

use App\Models\AboutUs;
use App\Models\Certificate;
use App\Models\Client;
use App\Models\CompanySetting;
use App\Models\GalleryItem;
use App\Models\Hero;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        // Company Settings
        $companySettings = CompanySetting::first() ?? new CompanySetting([
            'company_name' => 'Company Name',
            'company_description' => 'Company Description'
        ]);

        // Featured Services (4 first active services)
        $featuredServices = Service::active()
            ->ordered()
            ->take(4)
            ->get(['id', 'title', 'slug', 'description', 'image']);

        // Client Logos
        $clientLogos = Client::active()
            ->ordered()
            ->take(12)
            ->get(['id', 'name', 'logo_path', 'sector']);

        // client count
        $clientCount = Client::active()
            ->count();

        // Mini Gallery (latest 6 items from "Kegiatan" category or any active category)
        $miniGallery = GalleryItem::active()
            ->ordered()
            ->with('category:id,name')
            ->take(6)
            ->get(['id', 'title', 'image_path', 'alt_text', 'gallery_category_id']);

        // About Snippet
        $aboutSnippet = AboutUs::first(['description', 'vision', 'mission']);

        // Certificates
        $certificates = Certificate::active()
            ->ordered()
            ->get(['id', 'title', 'image_path', 'issuer']);

        $hero = Hero::active()->ordered()->first();

        if (!$hero) {
            $hero = [
                'title' => $companySettings->company_name ?: 'PT. PANDAWA MEDITECH PIONEERS',
                'subtitle' => $companySettings->tagline ?: 'Healthcare Supplies, Trusted Solutions',
                'description' => $companySettings->short_description_below_tagline ?: 'Solusi Kebutuhan Alat Kesehatan & Perlengkapan Pendukung PT. Pandawa Meditech Pioneers menyediakan berbagai produk kesehatan dan perlengkapan penunjang dengan mengutamakan kualitas, keandalan, dan pelayanan terbaik untuk memenuhi kebutuhan pelanggan.',
                'image_path' => null,
                'cta_label' => 'Lihat Layanan',
                'cta_url' => '/services',
            ];
        }

        return Inertia::render('home', [
            'companySettings' => $companySettings,
            'featuredServices' => $featuredServices,
            'clientCount'=> $clientCount,
            'clientLogos' => $clientLogos,
            'miniGallery' => $miniGallery,
            'aboutSnippet' => $aboutSnippet,
            'certificates' => $certificates,
            'hero' => $hero,
        ]);
    }
}
