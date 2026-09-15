// resources/js/components/molecules/media-filter-bar.tsx
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/atoms/search-input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { X, Filter } from 'lucide-react'

interface MediaFilterBarProps {
    search: string
    onSearchChange: (value: string) => void
    sortBy: string
    onSortByChange: (value: string) => void
    fileType: string
    onFileTypeChange: (value: string) => void
    selectedCount: number
    onClearFilters: () => void
}

export function MediaFilterBar({
    search,
    onSearchChange,
    sortBy,
    onSortByChange,
    fileType,
    onFileTypeChange,
    selectedCount,
    onClearFilters
}: MediaFilterBarProps) {
    const hasActiveFilters = search || sortBy !== 'newest' || fileType !== 'all'

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <SearchInput
                        value={search}
                        onChange={onSearchChange}
                        placeholder="Cari file..."
                        className="w-full"
                    />
                </div>

                <div className="flex gap-2">
                    <Select value={fileType} onValueChange={onFileTypeChange}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Tipe</SelectItem>
                            <SelectItem value="image">Gambar</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="document">Dokumen</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={onSortByChange}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Terbaru</SelectItem>
                            <SelectItem value="oldest">Terlama</SelectItem>
                            <SelectItem value="name">Nama A-Z</SelectItem>
                            <SelectItem value="name_desc">Nama Z-A</SelectItem>
                            <SelectItem value="size">Ukuran Kecil</SelectItem>
                            <SelectItem value="size_desc">Ukuran Besar</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {hasActiveFilters && (
                        <>
                            <Badge variant="secondary" className="gap-1">
                                <Filter className="w-3 h-3" />
                                Filter aktif
                            </Badge>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onClearFilters}
                                className="h-6 px-2"
                            >
                                <X className="w-3 h-3 mr-1" />
                                Bersihkan
                            </Button>
                        </>
                    )}
                </div>

                {selectedCount > 0 && (
                    <Badge variant="default">
                        {selectedCount} file dipilih
                    </Badge>
                )}
            </div>
        </div>
    )
}
