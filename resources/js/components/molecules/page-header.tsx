// resources/js/components/molecules/page-header.tsx

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Link } from '@inertiajs/react'

interface PageHeaderProps {
  title: string
  description?: string
  createUrl?: string
  createText?: string
  actions?: React.ReactNode
}

export function PageHeader({
  title,
  description,
  createUrl,
  createText = 'Tambah',
  actions
}: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-2">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {actions}
        {createUrl && (
          <Link href={createUrl}>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              {createText}
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
