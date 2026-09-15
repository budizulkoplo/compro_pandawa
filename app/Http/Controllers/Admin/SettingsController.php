<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanySetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        $settings = CompanySetting::getSettings();
        return Inertia::render('admin/settings', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $settings = CompanySetting::firstOrNew();

        $data = $request->all();

        foreach (['logo_path', 'favicon_path'] as $field) {
            if ($request->hasFile($field)) {
                if ($settings->{$field} && !str_starts_with($settings->{$field}, 'http')) {
                    Storage::disk('public')->delete($settings->{$field});
                }

                $data[$field] = $request->file($field)->store('settings', 'public');
            }
        }

        // Normalize social_media: accept array or JSON string, ensure single JSON encoding in DB
        if (isset($data['social_media'])) {
            // If it's already an array (frontend sends object), encode once
            if (is_array($data['social_media'])) {
                $data['social_media'] = json_encode($data['social_media']);
            } elseif (is_string($data['social_media'])) {
                // If it's a string, attempt to decode to detect double-encoding
                $decoded = json_decode($data['social_media'], true);

                if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                    // String was valid JSON -> normalize to a single encoded JSON string
                    $data['social_media'] = json_encode($decoded);
                } else {
                    // Try a second decode in case of double-encoded value
                    $decodedOnce = json_decode($decoded, true);
                    if (json_last_error() === JSON_ERROR_NONE && is_array($decodedOnce)) {
                        $data['social_media'] = json_encode($decodedOnce);
                    }
                    // Otherwise leave as-is (best-effort)
                }
            }
        }

        $settings->fill($data);
        $settings->save();

        return redirect()->back()->with('success', 'Pengaturan berhasil disimpan');
    }

    public function deleteMedia(Request $request)
    {
        $path = $request->input('path');
        $field = $request->input('field');

        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }

        $settings = CompanySetting::firstOrNew();
        $settings->update([$field => null]);

        return response()->json(['success' => true]);
    }
}
