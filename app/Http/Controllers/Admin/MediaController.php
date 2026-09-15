<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;

class MediaController extends Controller
{
    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB max
        ]);

        try {
            $file = $request->file('file');
            $type = $this->getFileType($file->getMimeType());

            // Generate unique filename
            $filename = Str::random(32) . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('media', $filename, 'public');

            // Save to database
            $media = Media::create([
                'filename' => $filename,
                'original_name' => $file->getClientOriginalName(),
                'mime_type' => $file->getMimeType(),
                'disk' => 'public',
                'path' => $path,
                'size' => $file->getSize(),
                'type' => $type,
            ]);

            return response()->json([
                'success' => true,
                'url' => $path,
                'media' => [
                    'id' => $media->id,
                    'filename' => $media->filename,
                    'original_name' => $media->original_name,
                    'size' => $media->formatted_size,
                    'type' => $media->type,
                    'url' => $media->url,
                ],
                'message' => 'File berhasil diupload'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Gagal mengupload file: ' . $e->getMessage()
            ], 500);
        }
    }

    public function delete(Request $request): JsonResponse
    {
        $request->validate([
            'path' => 'required|string',
        ]);

        try {
            $path = $request->input('path');
            $media = Media::where('path', $path)->first();

            if ($media) {
                // Delete file from storage
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }

                // Delete record from database
                $media->delete();
            }

            return response()->json([
                'success' => true,
                'message' => 'File berhasil dihapus'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Gagal menghapus file: ' . $e->getMessage()
            ], 500);
        }
    }

    private function getFileType(string $mimeType): string
    {
        if (str_starts_with($mimeType, 'image/')) {
            return 'image';
        }

        if (str_starts_with($mimeType, 'video/')) {
            return 'video';
        }

        return 'file';
    }
}
