// resources/js/components/molecules/image-upload-field.tsx

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    FolderOpen,
    Image as ImageIcon,
    Loader2,
    Upload,
    X,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { MediaPickerModal } from './media-picker-modal';

interface ImageUploadFieldProps {
    label: string;
    value: string | null;
    onChange: (path: string | null) => void; // Bisa null untuk clear
    required?: boolean;
    categoryId?: number;
    title?: string;
    context?: string;
    className?: string;
}

export function ImageUploadField({
    label,
    value,
    onChange,
    required = false,
    categoryId,
    title = '',
    context = 'gallery',
    className = '',
}: ImageUploadFieldProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string>(
        value ? `/storage/${value}` : '',
    );
    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('File harus berupa gambar');
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Ukuran file maksimal 5MB');
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('context', context);

            if (categoryId) {
                formData.append('category_id', categoryId.toString());
            }

            if (title) {
                formData.append('title', title);
            }

            const response = await fetch('/admin/media/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN':
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute('content') || '',
                },
            });

            const result = await response.json();

            if (result.success) {
                setPreview(result.url);
                onChange(result.path); // Pass path, not URL
                toast.success('Gambar berhasil diupload');
            } else {
                toast.error(result.error || 'Upload gagal');
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Terjadi kesalahan saat upload');
        } finally {
            setUploading(false);
            // Reset input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleRemove = () => {
        // Hanya clear preview dan value, tidak ada API request
        setPreview('');
        onChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    const handleMediaSelect = (paths: string | string[]) => {
        // If multiple selection, pick the first one
        const path = Array.isArray(paths) ? paths[0] : paths;
        if (!path) return;
        // Assume the URL is `/storage/${path}`
        const url = `/storage/${path}`;
        setPreview(url);
        onChange(path);
        toast.success('Gambar berhasil dipilih dari library');
    };

    return (
        <div className={`space-y-4 ${className}`}>
            <Label>
                {label} {required && <span className="text-red-500">*</span>}
            </Label>

            {preview ? (
                <div className="relative flex max-w-md items-center justify-center">
                    <img
                        src={preview}
                        alt="Preview"
                        className="h-48 w-full rounded-lg border object-cover shadow-sm"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                        <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={() => setShowMediaPicker(true)}
                            disabled={uploading}
                            title="Ganti gambar"
                        >
                            <Upload className="h-4 w-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={handleRemove}
                            disabled={uploading}
                            title="Hapus gambar"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    <div
                        className="cursor-pointer rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center transition-colors hover:border-muted-foreground/40"
                        onClick={openFileDialog}
                    >
                        <ImageIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                        <div className="space-y-2 wrap-anywhere">
                            <Button
                                size={'sm'}
                                type="button"
                                variant="outline"
                                disabled={uploading}
                                className='text-wrap w-full'
                            >
                                {uploading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload Gambar
                                    </>
                                )}
                            </Button>
                            <p className="text-sm text-muted-foreground">
                                PNG, JPG, GIF, WEBP maksimal 5MB
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Atau
                            </span>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => setShowMediaPicker(true)}
                    >
                        <FolderOpen className="mr-2 h-4 w-4" />
                        Pilih dari Media Library
                    </Button>
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={uploading}
                className="hidden"
            />

            <MediaPickerModal
                isOpen={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={handleMediaSelect}
                fileType="image"
                title="Pilih Gambar"
            />
        </div>
    );
}
