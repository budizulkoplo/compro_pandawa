// resources/js/components/atoms/video-player.tsx

import { Play } from "lucide-react";
import { useState } from "react";

interface VideoPlayerProps {
    videoUrl: string;
    thumbnailUrl?: string;
    className?: string;
}

export function VideoPlayer({ videoUrl, thumbnailUrl, className = "" }: VideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    // Determine video type and extract ID
    const getVideoEmbedUrl = (url: string) => {
        // Already an embed URL
        if (url.includes('/embed/')) {
            return url;
        }

        // YouTube
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);
            const videoId = match && match[2].length === 11 ? match[2] : null;
            return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
        }

        // Vimeo
        if (url.includes('vimeo.com')) {
            const regExp = /vimeo\.com\/(\d+)/;
            const match = url.match(regExp);
            const videoId = match ? match[1] : null;
            return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
        }

        // Regular video file or other embed
        return url;
    };

    const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
    const isVimeo = videoUrl.includes('vimeo.com');
    const isEmbeddable = isYouTube || isVimeo || videoUrl.includes('/embed/');

    const embedUrl = getVideoEmbedUrl(videoUrl);
    const autoplayUrl = embedUrl + (embedUrl.includes('?') ? '&' : '?') + 'autoplay=1';

    // Get thumbnail
    const getThumbnail = () => {
        if (thumbnailUrl) return thumbnailUrl;

        if (isYouTube) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = videoUrl.match(regExp);
            const videoId = match && match[2].length === 11 ? match[2] : null;
            return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '/images/default-video-thumb.jpg';
        }

        return '/images/default-video-thumb.jpg';
    };

    if (isPlaying) {
        return (
            <div className={`relative w-full aspect-video ${className}`}>
                {isEmbeddable ? (
                    <iframe
                        src={autoplayUrl}
                        title="Video Player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full rounded-lg"
                    />
                ) : (
                    <video
                        src={videoUrl}
                        controls
                        autoPlay
                        className="absolute inset-0 w-full h-full rounded-lg"
                    />
                )}
            </div>
        );
    }

    return (
        <div className={`relative w-full aspect-video cursor-pointer group ${className}`} onClick={() => setIsPlaying(true)}>
            <img
                src={getThumbnail()}
                alt="Video thumbnail"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                onError={(e) => {
                    e.currentTarget.src = '/images/default-video-thumb.jpg';
                }}
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors rounded-lg flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 text-[#1e94d2] ml-1" fill="currentColor" />
                </div>
            </div>
        </div>
    );
}
