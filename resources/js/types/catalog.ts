export interface Catalog {
    id: number
    name: string
    slug: string
    description: string
    price?: string | number | null
    image?: string | null
    isActive: boolean
    sortOrder: number
    created_at: string
    updated_at: string
}

export interface CatalogFormData {
    name: string
    slug: string
    description: string
    price: string
    image: File | null
    isActive: boolean
    sortOrder: number
}