// resources/js/components/organisms/settings-form.tsx

import { SectionTitle } from '@/components/atoms/section-title';
import { FormField } from '@/components/molecules/form-field';
import { SEOFields } from '@/components/molecules/seo-fields';
import { SocialMediaFields } from '@/components/molecules/social-media-fields';
import { WhatsAppFields } from '@/components/molecules/whatsapp-fields';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import settingsRoute from '@/routes/admin/settings';
import { router } from '@inertiajs/react';
import { Loader2, Save } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { FileUpload } from '../atoms/file-upload';
import { parseSocialMedia } from '@/lib/utils';

export interface SocialMediaData {
    [key: string]: string;
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    youtube: string;
}

interface CompanySettings {
    id?: number;
    company_name: string;
    company_address: string;
    company_phone: string;
    company_email: string;
    company_website: string;
    company_description: string;
    tagline: string;
    short_description_below_tagline: string;
    logo_path: string | File | null;
    favicon_path: string | File | null;
    social_media: SocialMediaData;
    google_maps_embed: string;
    whatsapp_number: string;
    whatsapp_default_message: string;
    whatsapp_enabled: boolean;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    founding_year: number | null;
}

interface SettingsFormProps {
    settings: CompanySettings;
}

export function SettingsForm({ settings }: SettingsFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<CompanySettings>({
        company_name: settings.company_name || '',
        company_address: settings.company_address || '',
        company_phone: settings.company_phone || '',
        company_email: settings.company_email || '',
        company_website: settings.company_website || '',
        company_description: settings.company_description || '',
        tagline: settings.tagline || '',
        short_description_below_tagline:
            settings.short_description_below_tagline || '',
        logo_path: settings.logo_path || null,
        favicon_path: settings.favicon_path || null,
        social_media: parseSocialMedia(settings.social_media),
        google_maps_embed: settings.google_maps_embed || '',
        whatsapp_number: settings.whatsapp_number || '',
        whatsapp_default_message: settings.whatsapp_default_message || '',
        whatsapp_enabled: !!settings.whatsapp_enabled,
        meta_title: settings.meta_title || '',
        meta_description: settings.meta_description || '',
        meta_keywords: settings.meta_keywords || '',
        founding_year: settings.founding_year || null,
    });

    const handleInputChange = <K extends keyof CompanySettings>(
        field: K,
        value: CompanySettings[K],
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSocialMediaChange = (
        platform: keyof SocialMediaData,
        value: string,
    ) => {
        setFormData((prev) => ({
            ...prev,
            social_media: {
                ...prev.social_media,
                [platform]: value,
            },
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = new FormData();
            Object.entries({
                company_name: formData.company_name,
                company_address: formData.company_address,
                company_phone: formData.company_phone,
                company_email: formData.company_email,
                company_website: formData.company_website,
                company_description: formData.company_description,
                tagline: formData.tagline,
                short_description_below_tagline: formData.short_description_below_tagline,
                logo_path: formData.logo_path,
                favicon_path: formData.favicon_path,
                google_maps_embed: formData.google_maps_embed,
                whatsapp_number: formData.whatsapp_number,
                whatsapp_default_message: formData.whatsapp_default_message,
                whatsapp_enabled: formData.whatsapp_enabled ? '1' : '0',
                meta_title: formData.meta_title,
                meta_description: formData.meta_description,
                meta_keywords: formData.meta_keywords,
                founding_year: formData.founding_year,
            }).forEach(([key, value]) => {
                if (value instanceof File) {
                    data.append(key, value);
                } else if (value !== null && value !== undefined) {
                    data.append(key, String(value));
                }
            });
            data.append('social_media', JSON.stringify(formData.social_media));

            router.post(
                settingsRoute.update.url(),
                data,
                {
                    onSuccess: () => {
                        toast.success('Pengaturan berhasil disimpan');
                    },
                    onError: (errors) => {
                        console.error('Validation errors:', errors);
                        toast.error('Terjadi kesalahan saat menyimpan');
                    },
                    onFinish: () => {
                        setIsSubmitting(false);
                    },
                },
            );
        } catch (error) {
            console.error('Submit error:', error);
            toast.error('Terjadi kesalahan saat menyimpan');
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Information */}
            <Card>
                <CardHeader>
                    <SectionTitle
                        title="Informasi Perusahaan"
                        description="Data dasar perusahaan yang akan ditampilkan di website"
                    />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField
                            label="Nama Perusahaan"
                            name="company_name"
                            value={formData.company_name}
                            onChange={(value) =>
                                handleInputChange('company_name', value)
                            }
                            required
                        />
                        <FormField
                            label="Email Perusahaan"
                            name="company_email"
                            inputType="email"
                            value={formData.company_email}
                            onChange={(value) =>
                                handleInputChange('company_email', value)
                            }
                            required
                        />
                    </div>
                    <FormField
                        label="Alamat"
                        name="company_address"
                        value={formData.company_address}
                        onChange={(value) =>
                            handleInputChange('company_address', value)
                        }
                        type="textarea"
                    />

                    <FormField
                        label="Deskripsi Perusahaan"
                        name="company_description"
                        value={formData.company_description}
                        onChange={(value) =>
                            handleInputChange('company_description', value)
                        }
                        type="textarea"
                    />

                    <FormField
                        label="Tagline"
                        name="tagline"
                        value={formData.tagline}
                        onChange={(value) =>
                            handleInputChange('tagline', value)
                        }
                        placeholder="Tagline untuk hero section"
                    />

                    <FormField
                        label="Deskripsi Singkat (di bawah tagline)"
                        name="short_description_below_tagline"
                        value={formData.short_description_below_tagline}
                        onChange={(value) =>
                            handleInputChange(
                                'short_description_below_tagline',
                                value,
                            )
                        }
                        type="textarea"
                        placeholder="Deskripsi singkat yang akan ditampilkan di bawah tagline"
                    />
                </CardContent>
            </Card>

            {/* Logo & Favicon */}
            <Card>
                <CardHeader>
                    <SectionTitle
                        title="Logo & Favicon"
                        description="Upload logo dan favicon untuk website"
                    />
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <FileUpload
                            label="Logo Perusahaan"
                            accept="image/*"
                            value={formData.logo_path}
                            onChange={(file) =>
                                handleInputChange(
                                    'logo_path',
                                    file instanceof File || typeof file === 'string' ? file : null,
                                )
                            }
                            type="image"
                            className=""
                        />
                        <FileUpload
                            label="Favicon"
                            accept="image/x-icon,image/png"
                            value={formData.favicon_path}
                            onChange={(file) =>
                                handleInputChange(
                                    'favicon_path',
                                    file instanceof File || typeof file === 'string' ? file : null,
                                )
                            }
                            type="image"
                            className=""
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Social Media */}
            <SocialMediaFields
                socialMedia={formData.social_media}
                onChange={handleSocialMediaChange}
            />

            {/* Google Maps */}
            <Card>
                <CardHeader>
                    <SectionTitle
                        title="Google Maps"
                        description="Embed kode Google Maps untuk menampilkan lokasi"
                    />
                </CardHeader>
                <CardContent>
                    <FormField
                        label="Google Maps Embed Code"
                        name="google_maps_embed"
                        value={formData.google_maps_embed}
                        onChange={(value) =>
                            handleInputChange('google_maps_embed', value)
                        }
                        type="textarea"
                        placeholder='<iframe src="https://www.google.com/maps/embed?pb=..."></iframe>'
                    />
                </CardContent>
            </Card>

            {/* WhatsApp */}
            <WhatsAppFields
                whatsappNumber={formData.whatsapp_number}
                whatsappDefaultMessage={formData.whatsapp_default_message}
                whatsappEnabled={formData.whatsapp_enabled}
                onNumberChange={(value) =>
                    handleInputChange('whatsapp_number', value)
                }
                onMessageChange={(value) =>
                    handleInputChange('whatsapp_default_message', value)
                }
                onEnabledChange={(value) =>
                    handleInputChange('whatsapp_enabled', value)
                }
            />

            {/* SEO */}
            <SEOFields
                metaTitle={formData.meta_title}
                metaDescription={formData.meta_description}
                metaKeywords={formData.meta_keywords}
                onMetaTitleChange={(value) =>
                    handleInputChange('meta_title', value)
                }
                onMetaDescriptionChange={(value) =>
                    handleInputChange('meta_description', value)
                }
                onMetaKeywordsChange={(value) =>
                    handleInputChange('meta_keywords', value)
                }
                onSlugChange={() => {}} // Not used for settings
            />

            {/* Submit Button */}
            <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting} size="lg">
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Menyimpan...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            Simpan Pengaturan
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}
