<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Inertia\Inertia;

class MediaUploadController extends Controller
{

    public function data(Request $request)
    {
        $search = $request->get('search', '');
        $sortBy = $request->get('sort_by', 'newest');
        $fileType = $request->get('file_type', 'all');
        $perPage = $request->get('per_page', 24);

        // Get all files from public storage
        $publicPath = public_path('storage');
        $files = collect();

        if (File::exists($publicPath)) {
            $allFiles = File::allFiles($publicPath);

            foreach ($allFiles as $file) {
                // Skip directories and non-media files
                if ($file->isFile() && $this->isMediaFile($file->getExtension())) {
                    $relativePath = str_replace(public_path('storage/'), '', $file->getPathname());

                    $files->push([
                        'id' => crc32($relativePath), // Generate unique ID from path
                        'filename' => $file->getFilename(),
                        'path' => $relativePath,
                        'size' => $file->getSize(),
                        'type' => $this->getFileType($file->getExtension()),
                        'extension' => $file->getExtension(),
                        'created_at' => date('Y-m-d H:i:s', $file->getMTime()),
                    ]);
                }
            }
        }

        // Apply filters
        if ($search) {
            $files = $files->filter(function ($file) use ($search) {
                return Str::contains(strtolower($file['filename']), strtolower($search));
            });
        }

        if ($fileType !== 'all') {
            $files = $files->filter(function ($file) use ($fileType) {
                return $file['type'] === $fileType;
            });
        }

        // Apply sorting
        switch ($sortBy) {
            case 'oldest':
                $files = $files->sortBy('created_at');
                break;
            case 'name':
                $files = $files->sortBy('filename');
                break;
            case 'name_desc':
                $files = $files->sortByDesc('filename');
                break;
            case 'size':
                $files = $files->sortBy('size');
                break;
            case 'size_desc':
                $files = $files->sortByDesc('size');
                break;
            case 'newest':
            default:
                $files = $files->sortByDesc('created_at');
                break;
        }

        // Paginate results
        $currentPage = $request->get('page', 1);
        $total = $files->count();
        $items = $files->forPage($currentPage, $perPage)->values();

        $pagination = [
            'data' => $items,
            'current_page' => (int) $currentPage,
            'last_page' => (int) ceil($total / $perPage),
            'total' => $total,
            'per_page' => (int) $perPage,
        ];

        return response()->json([
            'files' => $pagination,
            'filters' => [
                'search' => $search,
                'sort_by' => $sortBy,
                'file_type' => $fileType,
                'page' => (int) $currentPage,
            ],
        ]);

    }

    public function index(Request $request)
    {
        $search = $request->get('search', '');
        $sortBy = $request->get('sort_by', 'newest');
        $fileType = $request->get('file_type', 'all');
        $perPage = $request->get('per_page', 24);

        // Get all files from public storage
        $publicPath = public_path('storage');
        $files = collect();

        if (File::exists($publicPath)) {
            $allFiles = File::allFiles($publicPath);

            foreach ($allFiles as $file) {
                // Skip directories and non-media files
                if ($file->isFile() && $this->isMediaFile($file->getExtension())) {
                    $relativePath = str_replace(public_path('storage/'), '', $file->getPathname());

                    $files->push([
                        'id' => crc32($relativePath), // Generate unique ID from path
                        'filename' => $file->getFilename(),
                        'path' => $relativePath,
                        'size' => $file->getSize(),
                        'type' => $this->getFileType($file->getExtension()),
                        'extension' => $file->getExtension(),
                        'created_at' => date('Y-m-d H:i:s', $file->getMTime()),
                    ]);
                }
            }
        }

        // Apply filters
        if ($search) {
            $files = $files->filter(function ($file) use ($search) {
                return Str::contains(strtolower($file['filename']), strtolower($search));
            });
        }

        if ($fileType !== 'all') {
            $files = $files->filter(function ($file) use ($fileType) {
                return $file['type'] === $fileType;
            });
        }

        // Apply sorting
        switch ($sortBy) {
            case 'oldest':
                $files = $files->sortBy('created_at');
                break;
            case 'name':
                $files = $files->sortBy('filename');
                break;
            case 'name_desc':
                $files = $files->sortByDesc('filename');
                break;
            case 'size':
                $files = $files->sortBy('size');
                break;
            case 'size_desc':
                $files = $files->sortByDesc('size');
                break;
            case 'newest':
            default:
                $files = $files->sortByDesc('created_at');
                break;
        }

        // Paginate results
        $currentPage = $request->get('page', 1);
        $total = $files->count();
        $items = $files->forPage($currentPage, $perPage)->values();

        $pagination = [
            'data' => $items,
            'current_page' => (int) $currentPage,
            'last_page' => (int) ceil($total / $perPage),
            'total' => $total,
            'per_page' => (int) $perPage,
        ];

        return Inertia::render('admin/media', [
            'files' => $pagination,
            'filters' => [
                'search' => $search,
                'sort_by' => $sortBy,
                'file_type' => $fileType,
                'page' => (int) $currentPage,
            ],
        ]);
    }

    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpeg,png,jpg,gif,webp,svg|max:5120', // 5MB max
        ]);

        try {
            $file = $request->file('file');
            $originalName = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();

            // Generate unique filename
            $filename = time() . '_' . Str::random(10) . '.' . $extension;

            // Store file in public disk
            // Tentukan folder tujuan berdasarkan context (jika ada)
            $context = $request->get('context', null);
            $folder = 'media';
            if ($context && is_string($context)) {
                // Bersihkan context agar aman untuk nama folder
                $context = Str::slug($context);
                $folder .= '/' . $context;
            }

            $path = $file->storeAs($folder, $filename, 'public');

            if ($path) {
                return response()->json([
                    'success' => true,
                    'url' => Storage::url($path),
                    'path' => $path,
                    'filename' => $originalName,
                ]);
            }

            return response()->json([
                'success' => false,
                'error' => 'Gagal menyimpan file',
            ], 500);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Terjadi kesalahan: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function delete(Request $request)
    {
        // Support both single path and multiple IDs
        if ($request->has('path')) {
            // Single file deletion by path
            $request->validate([
                'path' => 'required|string',
            ]);

            try {
                $path = $request->path;
                $fullPath = public_path('storage/' . $path);

                if (File::exists($fullPath)) {
                    File::delete($fullPath);
                    return response()->json([
                        'success' => true,
                        'message' => 'File berhasil dihapus',
                    ]);
                }

                return response()->json([
                    'success' => false,
                    'error' => 'File tidak ditemukan',
                ], 404);

            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'error' => 'Terjadi kesalahan: ' . $e->getMessage(),
                ], 500);
            }
        }

        // Multiple files deletion by IDs
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer',
        ]);

        try {
            $deleted = 0;
            $publicPath = public_path('storage');

            if (File::exists($publicPath)) {
                $allFiles = File::allFiles($publicPath);

                foreach ($allFiles as $file) {
                    if ($file->isFile()) {
                        $relativePath = str_replace(public_path('storage/'), '', $file->getPathname());
                        $fileId = crc32($relativePath);

                        if (in_array($fileId, $request->ids)) {
                            if (File::delete($file->getPathname())) {
                                $deleted++;
                            }
                        }
                    }
                }
            }

            return response()->json([
                'success' => true,
                'message' => "{$deleted} file berhasil dihapus",
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Terjadi kesalahan: ' . $e->getMessage(),
            ], 500);
        }
    }

    private function isMediaFile($extension)
    {
        $mediaExtensions = [
            'jpg',
            'jpeg',
            'png',
            'gif',
            'webp',
            'svg',
            'mp4',
            'avi',
            'mov',
            'wmv',
            'flv',
            'pdf',
            'doc',
            'docx',
            'xls',
            'xlsx',
            'ppt',
            'pptx'
        ];

        return in_array(strtolower($extension), $mediaExtensions);
    }

    private function getFileType($extension)
    {
        $imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
        $videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv'];
        $documentExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];

        $ext = strtolower($extension);

        if (in_array($ext, $imageExtensions)) {
            return 'image';
        } elseif (in_array($ext, $videoExtensions)) {
            return 'video';
        } elseif (in_array($ext, $documentExtensions)) {
            return 'document';
        }

        return 'other';
    }
}
