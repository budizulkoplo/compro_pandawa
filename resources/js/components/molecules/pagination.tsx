// resources/js/components/molecules/pagination.tsx

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
    currentPage: number
    lastPage: number
    total: number
    perPage: number
    onPageChange: (page: number) => void
}

export function Pagination({
    currentPage,
    lastPage,
    total,
    perPage,
    onPageChange
}: PaginationProps) {
    if (lastPage <= 1) return null

    const startItem = (currentPage - 1) * perPage + 1
    const endItem = Math.min(currentPage * perPage, total)

    const getVisiblePages = () => {
        const delta = 2
        const range = []
        const rangeWithDots = []

        for (let i = Math.max(2, currentPage - delta);
             i <= Math.min(lastPage - 1, currentPage + delta);
             i++) {
            range.push(i)
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...')
        } else {
            rangeWithDots.push(1)
        }

        rangeWithDots.push(...range)

        if (currentPage + delta < lastPage - 1) {
            rangeWithDots.push('...', lastPage)
        } else {
            rangeWithDots.push(lastPage)
        }

        return rangeWithDots
    }

    return (
        <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
                Menampilkan {startItem} - {endItem} dari {total} hasil
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                    Sebelumnya
                </Button>

                {getVisiblePages().map((page, index) => (
                    page === '...' ? (
                        <span key={index} className="px-2 text-muted-foreground">
                            ...
                        </span>
                    ) : (
                        <Button
                            key={index}
                            variant={currentPage === page ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => onPageChange(page as number)}
                        >
                            {page}
                        </Button>
                    )
                ))}

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= lastPage}
                >
                    Selanjutnya
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
