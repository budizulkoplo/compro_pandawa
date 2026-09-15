// resources/js/components/molecules/data-table-header.tsx

import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/atoms/search-input'
import { Plus } from 'lucide-react'

interface DataTableHeaderProps {
    title: string
    description?: string
    searchValue: string
    onSearchChange: (value: string) => void
    onCreateClick: () => void
    createButtonText: string
    showCreateButton?: boolean
    children?: React.ReactNode
}

export function DataTableHeader({
    title,
    description,
    searchValue,
    onSearchChange,
    onCreateClick,
    createButtonText,
    showCreateButton = true,
    children
}: DataTableHeaderProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">{title}</h2>
                    {description && (
                        <p className="text-muted-foreground">{description}</p>
                    )}
                </div>
                {showCreateButton && (
                    <Button onClick={onCreateClick}>
                        <Plus className="mr-2 h-4 w-4" />
                        {createButtonText}
                    </Button>
                )}
            </div>

            <div className="flex items-center gap-4 w-full">
                <SearchInput
                    value={searchValue}
                    onChange={onSearchChange}
                    className="w-full"
                />
                {children}
            </div>
        </div>
    )
}
