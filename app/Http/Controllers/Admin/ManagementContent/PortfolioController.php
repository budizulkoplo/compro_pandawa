<?php
// app/Http/Controllers/Admin/ManagementContent/PortfolioController.php
namespace App\Http\Controllers\Admin\ManagementContent;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index(Request $request)
    {
        $query = Client::query();

        // Search
        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('sector', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status !== '') {
            $query->where('is_active', $request->boolean('status'));
        }

        // Sort
        $sortBy = $request->get('sort_by', 'sort_order');
        $sortDirection = $request->get('sort_direction', 'asc');

        if ($sortBy === 'sort_order') {
            $query->orderBy('sort_order')->orderBy('name');
        } else {
            $query->orderBy($sortBy, $sortDirection);
        }

        $clients = $query->paginate(10)->withQueryString();

        return Inertia::render('admin/portofolio/index', [
            'clients' => $clients,
            'filters' => $request->only(['search', 'status', 'sort_by', 'sort_direction']),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/portofolio/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:clients,slug',
            'sector' => 'required|string|max:255',
            'description' => 'required|string',
            'logo_path' => 'nullable', // Bisa file atau string path
            'images' => 'nullable|array',
            'images.*' => 'nullable', // Bisa file atau string
            'website_url' => 'nullable|url',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:500',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        // Handle logo: bisa dari upload file baru atau path dari media library
        if ($request->hasFile('logo_path')) {
            $validated['logo_path'] = $request->file('logo_path')->store('portfolio/logos', 'public');
        } elseif (is_string($request->input('logo_path')) && !empty($request->input('logo_path'))) {
            $validated['logo_path'] = $request->input('logo_path');
        } else {
            $validated['logo_path'] = null;
        }

        // Handle images array: bisa dari upload file baru atau path dari media library
        if (!empty($validated['images'])) {
            $processedImages = [];
            foreach ($validated['images'] as $image) {
                if (is_string($image) && !empty($image)) {
                    // Path dari media library
                    $processedImages[] = $image;
                }
                // Note: File upload untuk images akan ditangani di frontend dengan upload terpisah
            }
            $validated['images'] = $processedImages;
        } else {
            $validated['images'] = [];
        }

        $client = Client::create($validated);

        return redirect()
            ->route('admin.management-content.portfolio.index')
            ->with('success', 'Klien berhasil ditambahkan');
    }

    public function show(Client $portfolio)
    {
        return Inertia::render('admin/portofolio/show', [
            'client' => $portfolio,
        ]);
    }

    public function edit(Client $portfolio)
    {
        return Inertia::render('admin/portofolio/edit', [
            'client' => $portfolio,
        ]);
    }

    public function update(Request $request, Client $portfolio)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:clients,slug,' . $portfolio->id,
            'sector' => 'required|string|max:255',
            'description' => 'required|string',
            'logo_path' => 'nullable', // Bisa file atau string path
            'images' => 'nullable|array',
            'images.*' => 'nullable', // Bisa file atau string
            'website_url' => 'nullable|url',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:500',
        ]);

        // Handle logo: bisa dari upload file baru atau path dari media library
        if ($request->hasFile('logo_path')) {
            // Delete old logo
            if ($portfolio->logo_path) {
                Storage::disk('public')->delete($portfolio->logo_path);
            }
            $validated['logo_path'] = $request->file('logo_path')->store('portfolio/logos', 'public');
        } elseif (is_string($request->input('logo_path')) && !empty($request->input('logo_path'))) {
            // Path dari media library
            // Jika path berbeda dari yang lama, hapus yang lama
            if ($portfolio->logo_path && $portfolio->logo_path !== $request->input('logo_path')) {
                Storage::disk('public')->delete($portfolio->logo_path);
            }
            $validated['logo_path'] = $request->input('logo_path');
        } elseif ($request->input('logo_path') === null) {
            // Explicitly set to null if requested
            if ($portfolio->logo_path) {
                Storage::disk('public')->delete($portfolio->logo_path);
            }
            $validated['logo_path'] = null;
        } else {
            // Keep existing logo
            unset($validated['logo_path']);
        }

        // Handle images array
        $oldImages = $portfolio->images ?? [];
        $newImages = [];

        if (!empty($validated['images'])) {
            foreach ($validated['images'] as $image) {
                if (is_string($image) && !empty($image)) {
                    $newImages[] = $image;
                }
            }
        }

        $validated['images'] = $newImages;

        // Delete images yang tidak ada di list baru
        $imagesToDelete = array_diff($oldImages, $newImages);
        foreach ($imagesToDelete as $imagePath) {
            if ($imagePath) {
                Storage::disk('public')->delete($imagePath);
            }
        }

        $portfolio->update($validated);

        return redirect()
            ->route('admin.management-content.portfolio.index')
            ->with('success', 'Klien berhasil diperbarui');
    }

    public function destroy(Client $portfolio)
    {
        // Delete associated files
        if ($portfolio->logo_path) {
            Storage::disk('public')->delete($portfolio->logo_path);
        }

        if ($portfolio->images) {
            foreach ($portfolio->images as $imagePath) {
                Storage::disk('public')->delete($imagePath);
            }
        }

        $portfolio->delete();

        return redirect()
            ->route('admin.management-content.portfolio.index')
            ->with('success', 'Klien berhasil dihapus');
    }

    public function updateOrder(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:clients,id',
            'items.*.sort_order' => 'required|integer',
        ]);

        foreach ($request->items as $item) {
            Client::where('id', $item['id'])->update(['sort_order' => $item['sort_order']]);
        }

        return response()->json(['success' => true]);
    }
}
