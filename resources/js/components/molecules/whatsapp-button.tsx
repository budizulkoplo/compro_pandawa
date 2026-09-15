// resources/js/components/molecules/whatsapp-button.tsx

import { CompanySetting } from "@/types";

interface WhatsAppButtonProps {
    settings: CompanySetting;
}

export function WhatsAppButton({ settings }: WhatsAppButtonProps) {
    if (!settings.whatsapp_enabled || !settings.whatsapp_number) {
        return null;
    }

    const handleClick = () => {
        const phoneNumber = settings.whatsapp_number?.replace(/[^0-9]/g, "") || "";
        const message = encodeURIComponent(
            settings.whatsapp_default_message || "Halo, saya ingin bertanya..."
        );
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, "_blank");
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 sm:bottom-6 sm:right-6"
            title="Chat via WhatsApp"
            aria-label="Chat via WhatsApp"
        >
            <img src="/assets/whatsapp-ico.svg" alt="" className="h-7 w-7" />
        </button>
    );
}
