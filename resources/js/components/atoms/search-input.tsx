import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'

interface SearchInputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}

export function SearchInput({
    value,
    onChange,
    placeholder = 'Cari...',
    className = ''
}: SearchInputProps) {
    const [searchValue, setSearchValue] = useState(value)

    // Sync value from parent when filters.search changes
    useEffect(() => {
        setSearchValue(value)
    }, [value])

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchValue !== value) {
                onChange(searchValue)
            }
        }, 300)

        return () => clearTimeout(timeout)
    }, [searchValue, value, onChange])

    return (
        <div className={`relative ${className}`}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                value={searchValue ?? ''}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={placeholder}
                className="pl-10"
            />
        </div>
    )
}
