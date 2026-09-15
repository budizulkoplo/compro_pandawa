import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface FormFieldProps {
    label: string
    name: string
    value: string
    onChange: (value: string) => void
    type?: 'input' | 'textarea' | 'number'
    inputType?: string
    placeholder?: string
    required?: boolean
    className?: string
    error?: string
    maxLength?: number
    readonly?: boolean
}

export function FormField({
    label,
    name,
    value,
    onChange,
    type = 'input',
    placeholder,
    required = false,
    className = '',
    inputType,
    error,
    maxLength,
    readonly = false
}: FormFieldProps) {
    return (
        <div className={`space-y-2 ${className}`}>
            <Label htmlFor={name}>
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
            </Label>
            {type === 'textarea' ? (
                <Textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="min-h-[100px]"
                    maxLength={maxLength}
                />
            ) : type === 'number' ? (
                <Input
                    id={name}
                    name={name}
                    type="number"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    min="0"
                />
            ) : (
                <Input
                    id={name}
                    name={name}
                    type={inputType || 'text'}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    readOnly={readonly}
                />
            )}
            {maxLength && (
                <p className="text-xs text-muted-foreground">
                    {value.length}/{maxLength} karakter
                </p>
            )}
            {error && (
                <p className="text-sm text-destructive">{error}</p>
            )}
        </div>
    )
}
