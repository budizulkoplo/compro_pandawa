<?php

namespace App\Http\Controllers\Admin\ManagementContent;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ServicesController extends Controller
{
    public function index()
    {
        $services = Service::orderBy('sortOrder')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('admin/service/index', [
            'services' => $services
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/service/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'required|string',
            'image' => 'nullable', // Bisa file atau string path
            'isActive' => 'boolean',
            'sortOrder' => 'integer|min:0',
            'metaTitle' => 'nullable|string|max:60',
            'metaDescription' => 'nullable|string|max:160',
            'metaKeywords' => 'nullable|string',
            'slug' => 'nullable|string|unique:services,slug',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        // Handle image: bisa dari upload file baru atau path dari media library
        if ($request->hasFile('image')) {
            // Upload file baru
            $validated['image'] = $request->file('image')->store('services', 'public');
        } elseif (is_string($request->input('image')) && !empty($request->input('image'))) {
            // Path dari media library
            $validated['image'] = $request->input('image');
        } else {
            // Tidak ada image
            unset($validated['image']);
        }

        Service::create($validated);

        return redirect()->route('admin.management-content.services.index')
            ->with('success', 'Layanan berhasil ditambahkan');
    }

    public function show(Service $service)
    {
        return Inertia::render('admin/service/show', [
            'service' => $service
        ]);
    }

    public function edit(Service $service)
    {
        return Inertia::render('admin/service/edit', [
            'service' => $service
        ]);
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'required|string',
            'image' => 'nullable', // Bisa file atau string path
            'isActive' => 'boolean',
            'sortOrder' => 'integer|min:0',
            'metaTitle' => 'nullable|string|max:60',
            'metaDescription' => 'nullable|string|max:160',
            'metaKeywords' => 'nullable|string',
            'slug' => 'nullable|string|unique:services,slug,' . $service->id,
        ]);

        // If title changed, update slug accordingly
        if ($validated['title'] !== $service->title) {
            $validated['slug'] = Str::slug($validated['title']);
        } elseif (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        Log::info('Updating service', $request->all());

        // Handle image: bisa dari upload file baru atau path dari media library
        if ($request->hasFile('image')) {
            // Delete old image
            if ($service->image) {
                Storage::disk('public')->delete($service->image);
            }
            // Upload file baru
            $validated['image'] = $request->file('image')->store('services', 'public');
        } elseif (is_string($request->input('image')) && !empty($request->input('image'))) {
            // Path dari media library
            // Jika path berbeda dari yang lama, hapus yang lama
            if ($service->image && $service->image !== $request->input('image')) {
                Storage::disk('public')->delete($service->image);
            }
            $validated['image'] = $request->input('image');
        } else {
            // Keep old image if no new file
            unset($validated['image']);
        }

        $service->update($validated);

        return redirect()->route('admin.management-content.services.index')
            ->with('success', 'Layanan berhasil diperbarui');
    }

    public function destroy(Service $service)
    {
        // Delete image if exists
        if ($service->image) {
            Storage::disk('public')->delete($service->image);
        }

        $service->delete();

        return redirect()->route('admin.management-content.services.index')
            ->with('success', 'Layanan berhasil dihapus');
    }
}
