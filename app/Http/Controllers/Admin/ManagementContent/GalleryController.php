<?php
// app/Http/Controllers/Admin/ManagementContent/GalleryController.php

namespace App\Http\Controllers\Admin\ManagementContent;

use App\Http\Controllers\Controller;
use App\Models\GalleryCategory;
use App\Models\GalleryItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search');
        $perPage = $request->get('per_page', 10);

        $categories = GalleryCategory::withCount('galleryItems')
            ->with([
                'galleryItems' => function ($query) {
                    $query->orderBy('sort_order');
                }
            ])
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
            ->orderBy('sort_order')
            ->paginate($perPage);

        return Inertia::render('admin/gallery/index', [
            'categories' => $categories,
            'filters' => [
                'search' => $search,
                'per_page' => $perPage,
            ],
        ]);
    }

    public function createCategory()
    {
        return Inertia::render('admin/gallery/create-category');
    }

    public function storeCategory(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'slug' => 'nullable|string|unique:gallery_categories,slug',
            'meta_title' => 'nullable|string|max:60',
            'meta_description' => 'nullable|string|max:160',
            'meta_keywords' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        GalleryCategory::create($validated);

        return redirect()->route('admin.management-content.gallery.index')
            ->with('success', 'Kategori galeri berhasil dibuat');
    }

    public function editCategory(GalleryCategory $category)
    {
        return Inertia::render('admin/gallery/edit-category', [
            'category' => $category,
        ]);
    }

    public function updateCategory(Request $request, GalleryCategory $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'slug' => 'nullable|string|unique:gallery_categories,slug,' . $category->id,
            'meta_title' => 'nullable|string|max:60',
            'meta_description' => 'nullable|string|max:160',
            'meta_keywords' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        $category->update($validated);

        return redirect()->route('admin.management-content.gallery.index')
            ->with('success', 'Kategori galeri berhasil diperbarui');
    }

    public function destroyCategory(GalleryCategory $category)
    {
        // Hapus semua gambar terkait
        foreach ($category->galleryItems as $item) {
            if ($item->image_path && Storage::disk('public')->exists($item->image_path)) {
                Storage::disk('public')->delete($item->image_path);
            }
        }

        $category->delete();

        return redirect()->route('admin.management-content.gallery.index')
            ->with('success', 'Kategori galeri berhasil dihapus');
    }

    public function showItems(GalleryCategory $category, Request $request)
    {
        $search = $request->get('search');
        $perPage = $request->get('per_page', 12);

        $items = $category->galleryItems()
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
            ->orderBy('sort_order')
            ->paginate($perPage);

        return Inertia::render('admin/gallery/items', [
            'category' => $category,
            'items' => $items,
            'filters' => [
                'search' => $search,
                'per_page' => $perPage,
            ],
        ]);
    }

    public function createItem(GalleryCategory $category)
    {
        return Inertia::render('admin/gallery/create-item', [
            'category' => $category,
        ]);
    }

    public function storeItem(Request $request, GalleryCategory $category)
    {
        Log::info('Storing gallery item', $request->all());

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_path' => 'required|string', // Selalu berupa string path (dari upload atau media library)
            'alt_text' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        $validated['gallery_category_id'] = $category->id;

        GalleryItem::create($validated);

        return redirect()->route('admin.management-content.gallery.items.index', $category)
            ->with('success', 'Item galeri berhasil dibuat');
    }

    public function editItem(GalleryCategory $category, GalleryItem $item)
    {
        return Inertia::render('admin/gallery/edit-item', [
            'category' => $category,
            'item' => $item,
        ]);
    }

    public function updateItem(Request $request, GalleryCategory $category, GalleryItem $item)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_path' => 'required|string',
            'alt_text' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        $item->update($validated);

        return redirect()->route('admin.management-content.gallery.items.index', $category)
            ->with('success', 'Item galeri berhasil diperbarui');
    }

    public function destroyItem(GalleryCategory $category, GalleryItem $item)
    {
        if ($item->image_path && Storage::disk('public')->exists($item->image_path)) {
            Storage::disk('public')->delete($item->image_path);
        }

        $item->delete();

        return redirect()->route('admin.management-content.gallery.items.index', $category)
            ->with('success', 'Item galeri berhasil dihapus');
    }
}
