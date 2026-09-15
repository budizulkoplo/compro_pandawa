// resources/js/components/molecules/empty-state.tsx

interface EmptyStateProps {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
    action?: React.ReactNode
    className?: string
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    action,
    className = ''
}: EmptyStateProps) {
    return (
        <div className={`text-center py-12 ${className}`}>
            <Icon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">{title}</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
            {action && action}
        </div>
    )
}
