// resources/js/types/gallery.ts

export interface GalleryCategory {
    id: number
    name: string
    description: string | null
    slug: string
    meta_title: string | null
    meta_description: string | null
    meta_keywords: string | null
    is_active: boolean
    sort_order: number
    gallery_items_count?: number
    active_items_count?: number
    active_items?: GalleryItem[]
    created_at: string
    updated_at: string
}

export interface GalleryItem {
    id: number
    gallery_category_id: number
    title: string
    description: string | null
    image_path: string
    alt_text: string | null
    is_active: boolean
    sort_order: number
    created_at: string
    updated_at: string
    category?: GalleryCategory
}
export interface PaginatedResponse<T> {
    data: T[]
    current_page: number
    first_page_url: string | null
    from: number | null
    last_page: number
    last_page_url: string | null
    links: Array<{
        url: string | null
        label: string
        active: boolean
    }>
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number | null
    total: number
}

export interface GalleryCategoryFormData {
    name: string
    description?: string
    meta_title?: string
    meta_description?: string
    meta_keywords?: string
    is_active: boolean
    sort_order?: number
}

export interface GalleryItemFormData {
    title: string
    description?: string
    image_path: string | null;
    alt_text?: string
    is_active: boolean
    sort_order?: number
}
