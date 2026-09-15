import { SocialMediaData } from '@/components/organism/settings-form';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
declare global {
    var globalImageDeleteCallback: ((url: string) => void) | null;
}

// Set callback untuk image deletion di RichTextEditor
export function setGlobalImageDeleteCallback(callback: (url: string) => void) {
    globalThis.globalImageDeleteCallback = callback;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseSocialMedia = (data: any): SocialMediaData => {
    if (typeof data === 'string') {
        try {
            const parsed = JSON.parse(data);
            return {
                facebook: parsed.facebook || '',
                instagram: parsed.instagram || '',
                twitter: parsed.twitter || '',
                linkedin: parsed.linkedin || '',
                youtube: parsed.youtube || '',
            };
        } catch (e) {
            console.error('Failed to parse social_media:', e);
            return {
                facebook: '',
                instagram: '',
                twitter: '',
                linkedin: '',
                youtube: '',
            };
        }
    }

    if (data && typeof data === 'object') {
        return {
            facebook: data.facebook || '',
            instagram: data.instagram || '',
            twitter: data.twitter || '',
            linkedin: data.linkedin || '',
            youtube: data.youtube || '',
        };
    }

    return {
        facebook: '',
        instagram: '',
        twitter: '',
        linkedin: '',
        youtube: '',
    };
};
