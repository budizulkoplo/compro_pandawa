<?php

namespace App\Console\Commands;

use App\Models\Client;
use App\Models\GalleryCategory;
use App\Models\Service;
use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate the sitemap for the website';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🚀 Generating sitemap...');

        $sitemap = Sitemap::create();

        // Homepage
        $sitemap->add($this->createUrl('/', Url::CHANGE_FREQUENCY_DAILY, 1.0, now()));
        $this->info('✓ Added homepage');

        // Static Pages
        $staticPages = [
            '/about' => [Url::CHANGE_FREQUENCY_MONTHLY, 0.8],
            '/services' => [Url::CHANGE_FREQUENCY_WEEKLY, 0.9],
            '/gallery' => [Url::CHANGE_FREQUENCY_WEEKLY, 0.8],
            '/clients' => [Url::CHANGE_FREQUENCY_WEEKLY, 0.8],
            '/contact' => [Url::CHANGE_FREQUENCY_MONTHLY, 0.7],
        ];

        foreach ($staticPages as $url => [$frequency, $priority]) {
            $sitemap->add($this->createUrl($url, $frequency, $priority, now()));
        }
        $this->info('✓ Added ' . count($staticPages) . ' static pages');

        // Services
        $this->info('📦 Adding services...');
        $services = Service::active()->ordered()->get();
        foreach ($services as $service) {
            $sitemap->add($this->createUrl(
                "/service/{$service->slug}",
                Url::CHANGE_FREQUENCY_WEEKLY,
                0.9,
                $service->updated_at ?? $service->created_at
            ));
        }
        $this->info("✓ Added {$services->count()} services");

        // Gallery Categories
        $this->info('🖼️  Adding gallery categories...');
        $galleryCategories = GalleryCategory::where('is_active', true)
            ->orderBy('sort_order')
            ->get();
        foreach ($galleryCategories as $category) {
            $sitemap->add($this->createUrl(
                "/gallery/{$category->slug}",
                Url::CHANGE_FREQUENCY_MONTHLY,
                0.7,
                $category->updated_at ?? $category->created_at
            ));
        }
        $this->info("✓ Added {$galleryCategories->count()} gallery categories");

        // Clients
        $this->info('👥 Adding clients...');
        $clients = Client::active()->ordered()->get();
        foreach ($clients as $client) {
            $sitemap->add($this->createUrl(
                "/clients/{$client->slug}",
                Url::CHANGE_FREQUENCY_MONTHLY,
                0.6,
                $client->updated_at ?? $client->created_at
            ));
        }
        $this->info("✓ Added {$clients->count()} clients");

        // Save Sitemap
        $sitemap->writeToFile(public_path('sitemap.xml'));

        $totalUrls = 1 + count($staticPages) + $services->count() + $galleryCategories->count() + $clients->count();

        $this->newLine();
        $this->info("✅ Sitemap generated successfully!");
        $this->info("📍 Location: public/sitemap.xml");
        $this->info("🔗 Total URLs: {$totalUrls}");
        $this->newLine();

        return Command::SUCCESS;
    }

    /**
     * Helper method to create URL with safe date handling
     */
    private function createUrl(string $path, string $frequency, float $priority, $lastModified = null): Url
    {
        $url = Url::create($path)
            ->setChangeFrequency($frequency)
            ->setPriority($priority);

        if ($lastModified) {
            $url->setLastModificationDate($lastModified);
        }

        return $url;
    }
}
