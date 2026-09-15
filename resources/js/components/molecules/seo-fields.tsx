// resources/js/components/molecules/seo-fields.tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export interface SEOFieldsProps {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    slug?: string;
    onMetaTitleChange: (value: string) => void;
    onMetaDescriptionChange: (value: string) => void;
    onMetaKeywordsChange: (value: string) => void;
    onSlugChange: (value: string) => void;
}

export function SEOFields({
    metaTitle,
    metaDescription,
    metaKeywords,
    slug,
    onMetaTitleChange,
    onMetaDescriptionChange,
    onMetaKeywordsChange,
    onSlugChange,
}: SEOFieldsProps) {
    return (
        <div className="w-full space-y-4">
            <div className="space-y-2">
                <Label htmlFor="meta_title">Meta Title</Label>
                <Input
                    id="meta_title"
                    value={metaTitle}
                    onChange={(e) => onMetaTitleChange(e.target.value)}
                    placeholder="Masukkan meta title..."
                    maxLength={60}
                />
                <p className="text-xs text-gray-500">
                    {metaTitle.length}/60 karakter
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="meta_description">Meta Description</Label>
                <Textarea
                    id="meta_description"
                    value={metaDescription}
                    onChange={(e) => onMetaDescriptionChange(e.target.value)}
                    placeholder="Masukkan meta description..."
                    maxLength={160}
                    rows={3}
                />
                <p className="text-xs text-gray-500">
                    {metaDescription.length}/160 karakter
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="meta_keywords">Meta Keywords</Label>
                <Input
                    id="meta_keywords"
                    value={metaKeywords}
                    onChange={(e) => onMetaKeywordsChange(e.target.value)}
                    placeholder="keyword1, keyword2, keyword3..."
                />
                <p className="text-xs text-gray-500">Pisahkan dengan koma</p>
            </div>

            {slug !== undefined && (
                <div className="space-y-2">
                    <Label htmlFor="slug">Slug URL</Label>
                    <Input
                        id="slug"
                        value={slug}
                        onChange={(e) => onSlugChange(e.target.value)}
                        placeholder="tentang-kami"
                        readOnly
                        className="cursor-not-allowed bg-muted"
                    />
                    <p className="text-xs text-gray-500">
                        Slug dibuat otomatis dari judul
                    </p>
                </div>
            )}
        </div>
    );
}
