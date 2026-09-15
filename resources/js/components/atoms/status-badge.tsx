import { Badge } from '@/components/ui/badge'
import { Ban, SquareCheckBig } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface StatusBadgeProps {
    isActive: boolean
    className?: string
}

export function StatusBadge({ isActive, className = '' }: StatusBadgeProps) {
    return (
        <Tooltip>
            <TooltipTrigger>
                <Badge
                    variant={isActive ? 'default' : 'secondary'}
                    className={className}
                >
                    {isActive ? <SquareCheckBig className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                </Badge>
            </TooltipTrigger>
            <TooltipContent>
                {isActive ? 'Aktif' : 'Tidak Aktif'}
            </TooltipContent>
        </Tooltip>
    )
}
