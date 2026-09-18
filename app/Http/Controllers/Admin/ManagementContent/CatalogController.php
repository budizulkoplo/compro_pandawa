<?php

namespace App\Http\Controllers\Admin\ManagementContent;

use App\Http\Controllers\Controller;
use App\Models\Catalog;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CatalogController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/catalog/index', [
            'catalogs' => Catalog::orderBy('sortOrder')->latest()->paginate(12),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/catalog/create', [
            'services' => Service::active()->ordered()->get(['id', 'title']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $this->validateCatalog($request);
        $validated['slug'] = $this->uniqueSlug($validated['slug'] ?: $validated['name']);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('catalogs', 'public');
        } else {
            unset($validated['image']);
        }

        Catalog::create($validated);

        return redirect()->route('admin.management-content.catalog.index')
            ->with('success', 'Katalog berhasil ditambahkan');
    }

    public function edit(Catalog $catalog)
    {
        return Inertia::render('admin/catalog/edit', [
            'catalog' => $catalog,
            'services' => Service::active()->ordered()->get(['id', 'title']),
        ]);
    }

    public function update(Request $request, Catalog $catalog)
    {
        $validated = $this->validateCatalog($request, $catalog);
        $validated['slug'] = $this->uniqueSlug(
            $validated['slug'] ?: $validated['name'],
            $catalog->id
        );

        if ($request->hasFile('image')) {
            if ($catalog->image) {
                Storage::disk('public')->delete($catalog->image);
            }
            $validated['image'] = $request->file('image')->store('catalogs', 'public');
        } else {
            unset($validated['image']);
        }

        $catalog->update($validated);

        return redirect()->route('admin.management-content.catalog.index')
            ->with('success', 'Katalog berhasil diperbarui');
    }

    public function destroy(Catalog $catalog)
    {
        if ($catalog->image) {
            Storage::disk('public')->delete($catalog->image);
        }

        $catalog->delete();

        return redirect()->route('admin.management-content.catalog.index')
            ->with('success', 'Katalog berhasil dihapus');
    }

    private function validateCatalog(Request $request, ?Catalog $catalog = null): array
    {
        return $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:catalogs,slug,' . ($catalog?->id ?? 'NULL'),
            'description' => 'required|string',
            'price' => 'nullable|numeric|min:0',
            'service_id' => 'nullable|integer|exists:services,id',
            'image' => 'nullable|image|max:5120',
            'isActive' => 'boolean',
            'sortOrder' => 'integer|min:0',
        ]);
    }

    private function uniqueSlug(string $value, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($value) ?: 'katalog';
        $slug = $baseSlug;
        $counter = 1;

        while (Catalog::where('slug', $slug)
            ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
            ->exists()) {
            $slug = $baseSlug . '-' . $counter++;
        }

        return $slug;
    }
}