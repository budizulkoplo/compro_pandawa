// resources/js/components/organism/about-form.tsx

import { useState, useCallback } from 'react'
import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RichTextEditor } from '@/components/editor/rich-text-editor'
import { FileUpload } from '@/components/atoms/file-upload'
import { ContentTabs } from './content-tabs'
import { SEOFields } from '@/components/molecules/seo-fields'
import { toast } from 'sonner'
import { Save, Loader2 } from 'lucide-react'
import AboutUsController from '@/actions/App/Http/Controllers/Admin/ManagementContent/AboutController'

interface AboutUsData {
    id?: number
    description: string
    vision: string
    mission: string
    profile_images?: string[] | string // Support multiple images
    profile_video_url?: string
    meta_title: string
    meta_description: string
    meta_keywords: string
    slug: string
}

interface AboutFormProps {
    aboutUs: AboutUsData
}

export function AboutForm({ aboutUs }: AboutFormProps) {
    const { data, setData, post, processing, errors } = useForm({
        description: aboutUs.description || '',
        vision: aboutUs.vision || '',
        mission: aboutUs.mission || '',
        profile_images: null as File[] | string[] | null, // Multiple images
        profile_video_url: null as File | string | null, // Single video
        meta_title: aboutUs.meta_title || '',
        meta_description: aboutUs.meta_description || '',
        meta_keywords: aboutUs.meta_keywords || '',
        slug: aboutUs.slug || 'tentang-kami',
    })

    const [previews, setPreviews] = useState({
        images: aboutUs.profile_images || null,
        video: aboutUs.profile_video_url || null,
    })

    // Handler untuk delete gambar dari rich text editor
    const handleEditorImageDelete = useCallback((url: string) => {
        // Handle editor image deletion
        fetch('/admin/media/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify({ url }),
        }).catch(console.error)
    }, [])

    const handleProfileImagesChange = (filesOrPaths: File[] | string[] | File | string | null) => {
        if (filesOrPaths === null) {
            // Reset/Delete
            setData('profile_images', null)
            setPreviews(prev => ({ ...prev, images: null }))
        } else if (Array.isArray(filesOrPaths)) {
            // Multiple files or paths
            setData('profile_images', filesOrPaths as File[] | string[])
            setPreviews(prev => ({ ...prev, images: filesOrPaths as string[] }))
        }
    }

    const handleProfileVideoChange = (filesOrPaths: File[] | string[] | File | string | null) => {
        // Handle both single file/path and arrays (but we only use the first one for video)
        let fileOrPath: File | string | null = null

        if (filesOrPaths === null) {
            fileOrPath = null
        } else if (Array.isArray(filesOrPaths)) {
            fileOrPath = filesOrPaths[0] as File | string
        } else {
            fileOrPath = filesOrPaths
        }

        if (fileOrPath instanceof File) {
            setData('profile_video_url', fileOrPath)
            const url = URL.createObjectURL(fileOrPath)
            setPreviews(prev => ({ ...prev, video: url }))
        } else if (typeof fileOrPath === 'string') {
            setData('profile_video_url', fileOrPath)
            setPreviews(prev => ({ ...prev, video: fileOrPath }))
        } else {
            setData('profile_video_url', null)
            setPreviews(prev => ({ ...prev, video: null }))
        }
    }



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        post(AboutUsController.update.url(), {
            onSuccess: () => {
                toast.success('Data berhasil disimpan')
            },
            onError: () => {
                toast.error('Terjadi kesalahan saat menyimpan data')
            },
            forceFormData: true, // Pastikan menggunakan FormData untuk file upload
        })
    }

    const handleSEOSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Buat form data baru tanpa file untuk SEO update
        const formData = new FormData()
        formData.append('description', data.description)
        formData.append('vision', data.vision)
        formData.append('mission', data.mission)
        formData.append('meta_title', data.meta_title)
        formData.append('meta_description', data.meta_description)
        formData.append('meta_keywords', data.meta_keywords)
        formData.append('slug', data.slug)

        post(AboutUsController.update.url(), {
            onSuccess: () => {
                toast.success('Pengaturan SEO berhasil disimpan')
            },
            onError: () => {
                toast.error('Terjadi kesalahan saat menyimpan SEO')
            },
        })
    }

    const contentForm = (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label className="font-semibold">Deskripsi Perusahaan</Label>
                <RichTextEditor
                    content={data.description}
                    onChange={(content) => setData('description', content)}
                    onImageDelete={handleEditorImageDelete}
                />
                {errors.description && (
                    <p className="text-red-500 dark:text-red-400 text-sm">{errors.description}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label className="font-semibold">Visi</Label>
                <RichTextEditor
                    content={data.vision}
                    onChange={(content) => setData('vision', content)}
                    onImageDelete={handleEditorImageDelete}
                />
                {errors.vision && (
                    <p className="text-red-500 dark:text-red-400 text-sm">{errors.vision}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label className="font-semibold">Misi</Label>
                <RichTextEditor
                    content={data.mission}
                    onChange={(content) => setData('mission', content)}
                    onImageDelete={handleEditorImageDelete}
                />
                {errors.mission && (
                    <p className="text-red-500 dark:text-red-400 text-sm">{errors.mission}</p>
                )}
            </div>

            <div className="grid grid-cols-1 gap-6">
                <FileUpload
                    label="Foto Profil Perusahaan (Multiple)"
                    accept="image/*"
                    value={previews.images}
                    onChange={handleProfileImagesChange}
                    type="image"
                    error={errors.profile_images}
                    multiple={true}
                />

                <FileUpload
                    label="Video Profil Perusahaan"
                    accept="video/*"
                    value={previews.video}
                    onChange={handleProfileVideoChange}
                    type="video"
                    error={errors.profile_video_url}
                />
            </div>

            <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                    {processing ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Menyimpan...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            Simpan Perubahan
                        </>
                    )}
                </Button>
            </div>
        </form>
    )

    const seoForm = (
        <form onSubmit={handleSEOSubmit} className="space-y-4">
            <SEOFields
                metaTitle={data.meta_title}
                metaDescription={data.meta_description}
                metaKeywords={data.meta_keywords}
                slug={data.slug}
                onMetaTitleChange={(value) => setData('meta_title', value)}
                onMetaDescriptionChange={(value) => setData('meta_description', value)}
                onMetaKeywordsChange={(value) => setData('meta_keywords', value)}
                onSlugChange={(value) => setData('slug', value)}
            />

            {/* Error messages untuk SEO fields */}
            {errors.meta_title && (
                <p className="text-red-500 text-sm">{errors.meta_title}</p>
            )}
            {errors.meta_description && (
                <p className="text-red-500 text-sm">{errors.meta_description}</p>
            )}
            {errors.meta_keywords && (
                <p className="text-red-500 text-sm">{errors.meta_keywords}</p>
            )}
            {errors.slug && (
                <p className="text-red-500 text-sm">{errors.slug}</p>
            )}

            <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                    {processing ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Menyimpan...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            Simpan SEO
                        </>
                    )}
                </Button>
            </div>
        </form>
    )

    return (
        <ContentTabs seoContent={seoForm}>
            {contentForm}
        </ContentTabs>
    )
}
