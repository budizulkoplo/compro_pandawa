import { usePage } from '@inertiajs/react';
import { getImageUrl } from '@/utils/image-helper';
import { type SharedData } from '@/types';
import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    const page = usePage<SharedData>();
    const name = String(page.props.name ?? '');
    const logoPath = page.props.siteSettings?.logo_path;
    return (
        <>
            <div className="flex aspect-square size-10 items-center justify-center rounded-md border border-slate-200 bg-white p-1.5 text-sidebar-primary-foreground shadow-sm">
                {logoPath ? (
                    <img src={getImageUrl(logoPath)} alt={`${name} Logo`} className="size-full object-contain" />
                ) : (
                    <AppLogoIcon className="size-6" />
                )}
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    {name}
                </span>
            </div>
        </>
    );
}
