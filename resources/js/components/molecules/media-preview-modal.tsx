// resources/js/components/molecules/media-preview-modal.tsx

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Download, ExternalLink, X } from 'lucide-react';
import { useState } from 'react';

interface MediaPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    mediaUrl: string | null;
    mediaType: 'image' | 'video';
    title: string;
}

export function MediaPreviewModal({
    isOpen,
    onClose,
    mediaUrl,
    mediaType,
    title,
}: MediaPreviewModalProps) {
    const [isLoading, setIsLoading] = useState(true);

    // Parse mediaUrl jika berupa array JSON
    let parsedUrl: string | null = null;
    let isExternalUrl = false;

    if (mediaUrl) {
        try {
            if (typeof mediaUrl === 'string' && mediaUrl.trim().startsWith('[')) {
                const arr = JSON.parse(mediaUrl);
                parsedUrl = Array.isArray(arr) ? arr[0] : null;
            } else {
                parsedUrl = mediaUrl;
            }

            // Check if URL is external (http/https)
            if (parsedUrl && (parsedUrl.startsWith('http://') || parsedUrl.startsWith('https://'))) {
                isExternalUrl = true;
            }
        } catch {
            parsedUrl = null;
        }
    }

    if (!parsedUrl) return null;

    // Build full URL
    const fullUrl = isExternalUrl ? parsedUrl : `/storage/${parsedUrl}`;

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = fullUrl;
        link.download = `${title.toLowerCase().replace(/\s+/g, '-')}.${mediaType === 'image' ? 'jpg' : 'mp4'}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleOpenInNewTab = () => {
        window.open(fullUrl, '_blank');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] max-w-4xl border">
                <DialogHeader className="border-b p-4">
                    <div className="flex items-center justify-between">
                        <DialogTitle>
                            Preview: {title}
                        </DialogTitle>
                    </div>
                </DialogHeader>

                <div
                    className="flex-1 flex items-center justify-center overflow-auto"
                    style={{ minHeight: 400, maxHeight: '70vh' }}
                >
                    {mediaType === 'image' ? (
                        <img
                            src={fullUrl}
                            alt={title}
                            className="max-h-full max-w-full object-contain"
                            onLoad={() => setIsLoading(false)}
                            onError={() => setIsLoading(false)}
                        />
                    ) : (
                        <video
                            src={fullUrl}
                            controls
                            className="max-h-full max-w-full rounded object-contain"
                            onLoadedData={() => setIsLoading(false)}
                            onError={() => setIsLoading(false)}
                            style={{ backgroundColor: 'transparent' }}
                        >
                            <source src={fullUrl} />
                            Browser Anda tidak mendukung video.
                        </video>
                    )}
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="h-8 w-8 animate-spin rounded-full border-b-2"></div>
                        </div>
                    )}
                </div>
                <DialogDescription className="flex items-center justify-end space-x-2 border-t p-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleOpenInNewTab}
                        disabled={isLoading}
                    >
                        <ExternalLink className="mr-2" />
                        Buka di Tab Baru
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownload}
                        disabled={isLoading}
                    >
                        <Download className="mr-2" />
                        Unduh
                    </Button>
                    <Button variant="destructive" size="sm" onClick={onClose}>
                        <X className="mr-2" />
                        Tutup
                    </Button>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}
