// resources/js/components/molecules/social-media-fields.tsx

import { FormField } from '@/components/molecules/form-field'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { SectionTitle } from '@/components/atoms/section-title'

interface SocialMediaData {
    [key: string]: string  // <-- Tambahkan index signature ini
    facebook: string
    instagram: string
    twitter: string
    linkedin: string
    youtube: string
}

interface SocialMediaFieldsProps {
    socialMedia: SocialMediaData
    onChange: (field: keyof SocialMediaData, value: string) => void
}

export function SocialMediaFields({ socialMedia, onChange }: SocialMediaFieldsProps) {
    const platforms = [
        { key: 'facebook' as const, label: 'Facebook', placeholder: 'https://facebook.com/company' },
        { key: 'instagram' as const, label: 'Instagram', placeholder: 'https://instagram.com/company' },
        { key: 'twitter' as const, label: 'Twitter/X', placeholder: 'https://twitter.com/company' },
        { key: 'linkedin' as const, label: 'LinkedIn', placeholder: 'https://linkedin.com/company/company' },
        { key: 'youtube' as const, label: 'YouTube', placeholder: 'https://youtube.com/@company' }
    ]

    return (
        <Card>
            <CardHeader>
                <SectionTitle
                    title="Media Sosial"
                    description="Link ke profil media sosial perusahaan"
                />
            </CardHeader>
            <CardContent className="space-y-4">
                {platforms.map(platform => (
                    <FormField
                        inputType="url"
                        key={platform.key}
                        label={platform.label}
                        name={platform.key}
                        value={socialMedia[platform.key] || ''}
                        onChange={(value) => onChange(platform.key, value)}
                        placeholder={platform.placeholder}
                    />
                ))}
            </CardContent>
        </Card>
    )
}
