import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
    items?: NavItem[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    siteSettings?: CompanySetting;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface CompanySetting {
    id: number;
    company_name: string;
    company_address: string;
    company_phone: string;
    company_email: string;
    company_website: string | null;
    company_description: string;
    logo_path: string | null;
    favicon_path: string | null;
    social_media: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
        linkedin?: string;
        youtube?: string;
    } | null;
    google_maps_embed: string | null;
    whatsapp_number: string | null;
    whatsapp_default_message: string | null;
    whatsapp_enabled: boolean;
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    tagline: string;
    short_description_below_tagline: string;
    office_hours?: string | null;
    founding_year?: number | null;
}

export interface Service {
    id: number;
    title: string;
    slug: string;
    description: string;
    content: string;
    image: string | null;
    isActive: boolean;
    sortOrder: number;
    metaTitle: string | null;
    metaDescription: string | null;
    metaKeywords: string | null;
}

export interface Client {
    id: number;
    name: string;
    slug: string;
    sector: string;
    description: string;
    logo_path: string | null;
    images: string[] | null;
    website_url: string | null;
    is_active: boolean;
    sort_order: number;
    meta_title?: string | null;
    meta_description?: string | null;
    meta_keywords?: string | null;
}

export interface GalleryItem {
    id: number;
    gallery_category_id: number;
    title: string;
    description: string | null;
    image_path: string;
    alt_text: string | null;
    is_active: boolean;
    sort_order: number;
}

export interface Certificate {
    id: number;
    title: string;
    issuer: string | null;
    issued_at: string | null;
    expired_at: string | null;
    image_path: string | null;
    description: string | null;
    is_active: boolean;
    sort_order: number;
}

export interface AboutUs {
    id: number;
    description: string;
    vision: string;
    mission: string;
    profile_images: string[] | string | null; // Can be JSON string or array
    profile_video_url: string | null;
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    slug: string;
}

export interface HomePageProps {
    companySettings: CompanySetting;
    featuredServices: Service[];
    clientCount: number;
    clientLogos: Client[];
    miniGallery: GalleryItem[];
    aboutSnippet: AboutUs | null;
    certificates: Certificate[];
    hero: Hero | null;
}

export interface Hero {
    id?: number;
    title: string;
    subtitle: string;
    description: string;
    image_path?: string | null;
    cta_label?: string | null;
    cta_url?: string | null;
    is_active?: boolean;
    sort_order?: number;
}
