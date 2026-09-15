// resources/js/components/molecules/whatsapp-fields.tsx

import { FormField } from '@/components/molecules/form-field'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { SectionTitle } from '@/components/atoms/section-title'

interface WhatsAppFieldsProps {
    whatsappNumber: string
    whatsappDefaultMessage: string
    whatsappEnabled: boolean
    onNumberChange: (value: string) => void
    onMessageChange: (value: string) => void
    onEnabledChange: (value: boolean) => void
}

export function WhatsAppFields({
    whatsappNumber,
    whatsappDefaultMessage,
    whatsappEnabled,
    onNumberChange,
    onMessageChange,
    onEnabledChange
}: WhatsAppFieldsProps) {
    return (
        <Card>
            <CardHeader>
                <SectionTitle
                    title="Integrasi WhatsApp"
                    description="Tombol WhatsApp akan muncul di setiap halaman website"
                />
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Switch
                        id="whatsapp_enabled"
                        checked={whatsappEnabled}
                        onCheckedChange={onEnabledChange}
                    />
                    <Label htmlFor="whatsapp_enabled">Aktifkan WhatsApp</Label>
                </div>

                {whatsappEnabled && (
                    <>
                        <FormField
                            label="Nomor WhatsApp"
                            name="whatsapp_number"
                            value={whatsappNumber}
                            onChange={onNumberChange}
                            placeholder="628123456789 (tanpa tanda +)"
                            required
                            inputType='tel'
                        />

                        <FormField
                            label="Pesan Default"
                            name="whatsapp_default_message"
                            value={whatsappDefaultMessage}
                            onChange={onMessageChange}
                            type="textarea"
                            placeholder="Halo, saya ingin bertanya tentang layanan perusahaan..."
                        />
                    </>
                )}
            </CardContent>
        </Card>
    )
}
