// resources/js/components/molecules/message-filters.tsx

import { SearchInput } from '@/components/atoms/search-input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RotateCcw } from 'lucide-react'

interface MessageFiltersProps {
    filters: {
        search?: string
        status?: string
    }
    onSearchChange: (search: string) => void
    onStatusChange: (status: string) => void
    onReset: () => void
}

export function MessageFilters({
    filters,
    onSearchChange,
    onStatusChange,
    onReset
}: MessageFiltersProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <SearchInput
                    value={filters.search || ''}
                    onChange={onSearchChange}
                    placeholder="Cari berdasarkan nama, email, subjek..."
                    className="sm:max-w-xs"
                />

                <Select
                    value={filters.status || 'all'}
                    onValueChange={onStatusChange}
                >
                    <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Filter status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Semua Status</SelectItem>
                        <SelectItem value="unread">Belum Dibaca</SelectItem>
                        <SelectItem value="read">Sudah Dibaca</SelectItem>
                        <SelectItem value="replied">Sudah Dibalas</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button
                variant="outline"
                onClick={onReset}
                className="w-full sm:w-auto"
            >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Filter
            </Button>
        </div>
    )
}
