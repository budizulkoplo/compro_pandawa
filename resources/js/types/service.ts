// resources/js/types/service.ts

export interface Service {
    id: number
    title: string
    slug: string
    description: string
    content: string
    image?: string
    isActive: boolean
    sortOrder: number
    metaTitle?: string
    metaDescription?: string
    metaKeywords?: string
    created_at: string
    updated_at: string
}

export interface ServiceFormData {
    title: string
    description: string
    content: string
    image?: File | null
    isActive: boolean
    sortOrder: number
    metaTitle: string
    metaDescription: string
    metaKeywords: string
    slug: string
}
