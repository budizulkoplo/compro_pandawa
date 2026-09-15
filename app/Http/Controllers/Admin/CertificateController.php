<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CertificateController extends Controller
{
    public function index(Request $request)
    {
        $query = Certificate::query();

        // Search
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('issuer', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status !== '') {
            $query->where('is_active', $request->status === 'active');
        }

        // Sort
        $sortBy = $request->get('sort_by', 'sort_order');
        $sortOrder = $request->get('sort_order', 'asc');

        if ($sortBy === 'sort_order') {
            $query->orderBy('sort_order', $sortOrder)->orderBy('created_at', 'desc');
        } else {
            $query->orderBy($sortBy, $sortOrder);
        }

        $certificates = $query->paginate(10)->withQueryString();

        return Inertia::render('admin/certificates/index', [
            'certificates' => $certificates,
            'filters' => $request->only(['search', 'status', 'sort_by', 'sort_order']),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/certificates/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'issuer' => 'nullable|string|max:255',
            'issued_at' => 'nullable|date',
            'expired_at' => 'nullable|date|after_or_equal:issued_at',
            'image_path' => 'nullable|string',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        Certificate::create($validated);

        return redirect()->route('admin.certificates.index')
            ->with('success', 'Sertifikat berhasil ditambahkan.');
    }

    public function show(Certificate $certificate)
    {
        return Inertia::render('admin/certificates/show', [
            'certificate' => $certificate,
        ]);
    }

    public function edit(Certificate $certificate)
    {
        return Inertia::render('admin/certificates/edit', [
            'certificate' => $certificate,
        ]);
    }

    public function update(Request $request, Certificate $certificate)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'issuer' => 'nullable|string|max:255',
            'issued_at' => 'nullable|date',
            'expired_at' => 'nullable|date|after_or_equal:issued_at',
            'image_path' => 'nullable|string',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        // Delete old image if new image uploaded
        if ($request->image_path !== $certificate->image_path && $certificate->image_path) {
            Storage::delete($certificate->image_path);
        }

        $certificate->update($validated);

        return redirect()->route('admin.certificates.index')
            ->with('success', 'Sertifikat berhasil diperbarui.');
    }

    public function destroy(Certificate $certificate)
    {
        // Delete image file
        if ($certificate->image_path) {
            Storage::delete($certificate->image_path);
        }

        $certificate->delete();

        return redirect()->route('admin.certificates.index')
            ->with('success', 'Sertifikat berhasil dihapus.');
    }
}
