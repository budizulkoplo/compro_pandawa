<?php

namespace App\Http\Controllers\Admin\ManagementContent;

use App\Http\Controllers\Controller;
use App\Models\AboutUs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        $aboutUs = AboutUs::latest()->first();

        if (!$aboutUs) {
            $aboutUs = AboutUs::create([
                'description' => '',
                'vision' => '',
                'mission' => '',
                'meta_title' => 'Tentang Kami',
                'meta_description' => '',
                'meta_keywords' => '',
                'slug' => 'tentang-kami',
            ]);
        }

        // Parse profile_images JSON to array
        $profileImages = null;
        if ($aboutUs->profile_images) {
            $profileImages = is_string($aboutUs->profile_images)
                ? json_decode($aboutUs->profile_images, true)
                : $aboutUs->profile_images;
        }

        return Inertia::render('admin/about', [
            'aboutUs' => [
                'id' => $aboutUs->id,
                'description' => $aboutUs->description,
                'vision' => $aboutUs->vision,
                'mission' => $aboutUs->mission,
                'profile_images' => $profileImages, // Array of image paths
                'profile_video_url' => $aboutUs->profile_video_url,
                'meta_title' => $aboutUs->meta_title,
                'meta_description' => $aboutUs->meta_description,
                'meta_keywords' => $aboutUs->meta_keywords,
                'slug' => $aboutUs->slug,
            ],
        ]);
    }

    public function update(Request $request)
    {
        $aboutUs = AboutUs::latest()->first();

        if (!$aboutUs) {
            $aboutUs = new AboutUs();
        }

        $data = $request->only([
            'description',
            'vision',
            'mission',
            'meta_title',
            'meta_description',
            'meta_keywords',
            'slug',
        ]);

        if (empty($data['slug']) && !empty($data['meta_title'])) {
            $data['slug'] = \Str::slug($data['meta_title']);
        } elseif (!empty($data['slug'])) {
            $data['slug'] = \Str::slug($data['slug']);
        }

        // Handle multiple profile images
        $uploadedImages = [];
        $profileImagesInput = $request->input('profile_images');

        if ($request->hasFile('profile_images')) {
            // Handle multiple file uploads
            $files = $request->file('profile_images');
            if (!is_array($files)) {
                $files = [$files];
            }

            foreach ($files as $file) {
                $uploadedImages[] = $file->store('about-us', 'public');
            }
        }

        // Handle paths from media library (array of strings)
        if (is_array($profileImagesInput)) {
            foreach ($profileImagesInput as $item) {
                if (is_string($item) && !empty($item)) {
                    $uploadedImages[] = $item;
                }
            }
        } elseif (is_string($profileImagesInput) && !empty($profileImagesInput)) {
            // Single string path
            $uploadedImages[] = $profileImagesInput;
        }

        // Only update if we have images
        if (!empty($uploadedImages)) {
            $data['profile_images'] = json_encode($uploadedImages);
        } elseif ($profileImagesInput === null || $profileImagesInput === '') {
            // Explicitly clear if null or empty string
            $data['profile_images'] = null;
        }

        // Handle profile video URL
        $profileVideoInput = $request->input('profile_video_url');

        if ($request->hasFile('profile_video_url')) {
            // Upload video file
            $videoFile = $request->file('profile_video_url');

            // Delete old video if exists
            if ($aboutUs->profile_video_url && !str_starts_with($aboutUs->profile_video_url, 'http')) {
                Storage::disk('public')->delete($aboutUs->profile_video_url);
            }

            $data['profile_video_url'] = $videoFile->store('about-us/videos', 'public');
        } elseif (is_string($profileVideoInput) && !empty($profileVideoInput)) {
            // Path from media library OR external URL (YouTube, etc)
            $data['profile_video_url'] = $profileVideoInput;
        } elseif ($profileVideoInput === null || $profileVideoInput === '') {
            // Explicitly clear
            $data['profile_video_url'] = null;
        }

        $aboutUs->fill($data);
        $aboutUs->save();

        return redirect()->back()->with('success', 'Data berhasil diperbarui');
    }

    public function deleteMedia(Request $request)
    {
        $aboutUs = AboutUs::first();
        $type = $request->input('type'); // 'images' or 'video'
        $path = $request->input('path'); // Specific image path to delete

        if ($aboutUs) {
            if ($type === 'images' && $path) {
                // Delete specific image from array
                $currentImages = $aboutUs->profile_images
                    ? (is_string($aboutUs->profile_images) ? json_decode($aboutUs->profile_images, true) : $aboutUs->profile_images)
                    : [];

                // Remove the specific path
                $currentImages = array_filter($currentImages, function($img) use ($path) {
                    return $img !== $path;
                });

                // Delete physical file if not external URL
                if (!str_starts_with($path, 'http')) {
                    Storage::disk('public')->delete($path);
                }

                // Update database
                $aboutUs->profile_images = !empty($currentImages) ? json_encode(array_values($currentImages)) : null;
                $aboutUs->save();
            } elseif ($type === 'video' && $aboutUs->profile_video_url) {
                // Delete video file if not external URL
                if (!str_starts_with($aboutUs->profile_video_url, 'http')) {
                    Storage::disk('public')->delete($aboutUs->profile_video_url);
                }

                $aboutUs->profile_video_url = null;
                $aboutUs->save();
            }
        }

        return response()->json(['success' => true]);
    }
}
