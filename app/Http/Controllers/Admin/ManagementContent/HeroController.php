<?php

namespace App\Http\Controllers\Admin\ManagementContent;

use App\Http\Controllers\Controller;
use App\Models\Hero;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HeroController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/hero', ['heroes' => Hero::ordered()->get()]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        $data['image_path'] = $this->storeImage($request, $data['image_path'] ?? null);
        Hero::create($data);

        return back()->with('success', 'Hero section berhasil ditambahkan.');
    }

    public function update(Request $request, Hero $hero)
    {
        $data = $this->validated($request);
        if ($request->hasFile('image')) {
            if ($hero->image_path) Storage::disk('public')->delete($hero->image_path);
            $data['image_path'] = $this->storeImage($request);
        }
        $hero->update($data);

        return back()->with('success', 'Hero section berhasil diperbarui.');
    }

    public function destroy(Hero $hero)
    {
        if ($hero->image_path) Storage::disk('public')->delete($hero->image_path);
        $hero->delete();

        return back()->with('success', 'Hero section berhasil dihapus.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'cta_label' => ['nullable', 'string', 'max:100'],
            'cta_url' => ['nullable', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'image_path' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:4096'],
        ]);
    }

    private function storeImage(Request $request, ?string $fallback = null): ?string
    {
        return $request->hasFile('image')
            ? $request->file('image')->store('heroes', 'public')
            : $fallback;
    }
}