// resources/js/components/atoms/action-button.tsx

import { Button } from '@/components/ui/button'
import { LucideIcon } from 'lucide-react'

interface ActionButtonProps {
    icon: LucideIcon
    onClick: () => void
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    disabled?: boolean
    className?: string
    title?: string
}

export function ActionButton({
    icon: Icon,
    onClick,
    variant = 'outline',
    size = 'sm',
    disabled = false,
    className = '',
    title
}: ActionButtonProps) {
    return (
        <Button
            variant={variant}
            size={size}
            onClick={onClick}
            disabled={disabled}
            className={className}
            title={title}
        >
            <Icon className="w-4 h-4" />
        </Button>
    )
}
