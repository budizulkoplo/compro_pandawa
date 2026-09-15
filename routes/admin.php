<?php


use App\Http\Controllers\Admin\ManagementContent\AboutController;
use App\Http\Controllers\Admin\ManagementContent\ServicesController;
use App\Http\Controllers\Admin\ManagementContent\CatalogController;
use App\Http\Controllers\Admin\MediaUploadController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\ManagementContent\HeroController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->group(function () {
    Route::prefix('admin')->group(function () {

        Route::get('/', [\App\Http\Controllers\Admin\DashboardController::class,'index'])->name('admin');

        Route::get('register', [RegisteredUserController::class, 'create'])
            ->name('register');

        Route::post('register', [RegisteredUserController::class, 'store'])
            ->name('register.store');

        Route::get('dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('admin.dashboard');

        Route::prefix('management-content')->group(function () {
            Route::get('hero', [HeroController::class, 'index'])->name('admin.management-content.hero.index');
            Route::post('hero', [HeroController::class, 'store'])->name('admin.management-content.hero.store');
            Route::put('hero/{hero}', [HeroController::class, 'update'])->name('admin.management-content.hero.update');
            Route::delete('hero/{hero}', [HeroController::class, 'destroy'])->name('admin.management-content.hero.destroy');

            Route::get('about', [AboutController::class, 'index'])->name('admin.management-content.about.index');
            Route::post('about', [AboutController::class, 'update'])->name('admin.management-content.about.update');

            Route::get('services', [ServicesController::class, 'index'])->name('admin.management-content.services.index');
            Route::get('services/create', [ServicesController::class, 'create'])->name('admin.management-content.services.create');
            Route::post('services', [ServicesController::class, 'store'])->name('admin.management-content.services.store');
            Route::get('services/{service}', [ServicesController::class, 'show'])->name('admin.management-content.services.show');
            Route::get('services/{service}/edit', [ServicesController::class, 'edit'])->name('admin.management-content.services.edit');
            Route::post('services/{service}', [ServicesController::class, 'update'])->name('admin.management-content.services.update.post');
            Route::put('services/{service}', [ServicesController::class, 'update'])->name('admin.management-content.services.update');
            Route::delete('services/{service}', [ServicesController::class, 'destroy'])->name('admin.management-content.services.destroy');

            Route::get('catalog', [CatalogController::class, 'index'])->name('admin.management-content.catalog.index');
            Route::get('catalog/create', [CatalogController::class, 'create'])->name('admin.management-content.catalog.create');
            Route::post('catalog', [CatalogController::class, 'store'])->name('admin.management-content.catalog.store');
            Route::get('catalog/{catalog}/edit', [CatalogController::class, 'edit'])->name('admin.management-content.catalog.edit');
            Route::post('catalog/{catalog}', [CatalogController::class, 'update'])->name('admin.management-content.catalog.update.post');
            Route::put('catalog/{catalog}', [CatalogController::class, 'update'])->name('admin.management-content.catalog.update');
            Route::delete('catalog/{catalog}', [CatalogController::class, 'destroy'])->name('admin.management-content.catalog.destroy');

            Route::prefix('gallery')->group(function () {
                Route::get('/', [\App\Http\Controllers\Admin\ManagementContent\GalleryController::class, 'index'])->name('admin.management-content.gallery.index');

                // Category routes
                Route::get('/category/create', [\App\Http\Controllers\Admin\ManagementContent\GalleryController::class, 'createCategory'])->name('admin.management-content.gallery.category.create');
                Route::post('/category', [\App\Http\Controllers\Admin\ManagementContent\GalleryController::class, 'storeCategory'])->name('admin.management-content.gallery.category.store');
                Route::get('/category/{category}/edit', [\App\Http\Controllers\Admin\ManagementContent\GalleryController::class, 'editCategory'])->name('admin.management-content.gallery.category.edit');
                Route::put('/category/{category}', [\App\Http\Controllers\Admin\ManagementContent\GalleryController::class, 'updateCategory'])->name('admin.management-content.gallery.category.update');
                Route::delete('/category/{category}', [\App\Http\Controllers\Admin\ManagementContent\GalleryController::class, 'destroyCategory'])->name('admin.management-content.gallery.category.destroy');

                // Item routes
                Route::get('/category/{category}/items', [\App\Http\Controllers\Admin\ManagementContent\GalleryController::class, 'showItems'])->name('admin.management-content.gallery.items.index');
                Route::get('/category/{category}/items/create', [\App\Http\Controllers\Admin\ManagementContent\GalleryController::class, 'createItem'])->name('admin.management-content.gallery.items.create');
                Route::post('/category/{category}/items', [\App\Http\Controllers\Admin\ManagementContent\GalleryController::class, 'storeItem'])->name('admin.management-content.gallery.items.store');
                Route::get('/category/{category}/items/{item}/edit', [\App\Http\Controllers\Admin\ManagementContent\GalleryController::class, 'editItem'])->name('admin.management-content.gallery.items.edit');
                Route::put('/category/{category}/items/{item}', [\App\Http\Controllers\Admin\ManagementContent\GalleryController::class, 'updateItem'])->name('admin.management-content.gallery.items.update');
                Route::delete('/category/{category}/items/{item}', [\App\Http\Controllers\Admin\ManagementContent\GalleryController::class, 'destroyItem'])->name('admin.management-content.gallery.items.destroy');
            });

            // Portfolio routes
            Route::get('portfolio', [\App\Http\Controllers\Admin\ManagementContent\PortfolioController::class, 'index'])->name('admin.management-content.portfolio.index');
            Route::get('portfolio/create', [\App\Http\Controllers\Admin\ManagementContent\PortfolioController::class, 'create'])->name('admin.management-content.portfolio.create');
            Route::post('portfolio', [\App\Http\Controllers\Admin\ManagementContent\PortfolioController::class, 'store'])->name('admin.management-content.portfolio.store');
            Route::get('portfolio/{portfolio}', [\App\Http\Controllers\Admin\ManagementContent\PortfolioController::class, 'show'])->name('admin.management-content.portfolio.show');
            Route::get('portfolio/{portfolio}/edit', [\App\Http\Controllers\Admin\ManagementContent\PortfolioController::class, 'edit'])->name('admin.management-content.portfolio.edit');
            Route::post('portfolio/{portfolio}', [\App\Http\Controllers\Admin\ManagementContent\PortfolioController::class, 'update'])->name('admin.management-content.portfolio.update.post');
            Route::put('portfolio/{portfolio}', [\App\Http\Controllers\Admin\ManagementContent\PortfolioController::class, 'update'])->name('admin.management-content.portfolio.update');
            Route::delete('portfolio/{portfolio}', [\App\Http\Controllers\Admin\ManagementContent\PortfolioController::class, 'destroy'])->name('admin.management-content.portfolio.destroy');
            Route::post('portfolio/update-order', [\App\Http\Controllers\Admin\ManagementContent\PortfolioController::class, 'updateOrder'])->name('admin.management-content.portfolio.update-order');
        });

        // message routes
        Route::prefix('message')->group(function () {
            Route::get('/', [\App\Http\Controllers\Admin\MessageController::class, 'index'])->name('admin.message.index');
            Route::get('/{message}', [\App\Http\Controllers\Admin\MessageController::class, 'show'])->name('admin.message.show');
            Route::post('/{message}/reply', [\App\Http\Controllers\Admin\MessageController::class, 'reply'])->name('admin.message.reply');
            Route::post('/{message}/mark-read', [\App\Http\Controllers\Admin\MessageController::class, 'markAsRead'])->name('admin.message.mark-read');
            Route::delete('/{message}', [\App\Http\Controllers\Admin\MessageController::class, 'destroy'])->name('admin.message.destroy');
        });

        Route::get('/settings', [SettingsController::class, 'index'])->name('admin.settings.index');
        Route::post('/settings', [SettingsController::class, 'update'])->name('admin.settings.update');
        Route::post('/settings/delete-media', [SettingsController::class, 'deleteMedia'])->name('admin.settings.delete-media');

        Route::resource('certificates', \App\Http\Controllers\Admin\CertificateController::class, [
            'as' => 'admin'
        ]);

        Route::prefix('media')->group(function () {
            Route::get('/', [MediaUploadController::class, 'index'])->name('admin.media.index');
            Route::get('/data', [MediaUploadController::class, 'data'])->name('admin.media.data');
            Route::post('/upload', [MediaUploadController::class, 'upload'])->name('admin.media.upload');
            Route::delete('/delete', [MediaUploadController::class, 'delete'])->name('admin.media.delete');
        });
    });
});
