import { NavFooter } from '@/components/organism/nav-footer';
import { NavMain } from '@/components/organism/nav-main';
import { NavUser } from '@/components/organism/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes/admin';
import { index as about } from '@/routes/admin/management-content/about';
import { index as gallery } from '@/routes/admin/management-content/gallery';
import { index as portfolio } from '@/routes/admin/management-content/portfolio';
import { index as services } from '@/routes/admin/management-content/services';
import { index as catalog } from '@/routes/admin/management-content/catalog';
import { index as message } from '@/routes/admin/message';
import { index as setting } from '@/routes/admin/settings';
import { index as media } from '@/routes/admin/media';
import { index as certificates } from '@/routes/admin/certificates';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Award, BookOpen, Briefcase, Building2, Cog, FactoryIcon, FolderCog, Images, LayoutGrid, PanelsTopLeft, SendIcon } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Manajemen Konten',
        href: '#',
        icon: FolderCog,
        items: [
            {
                title: 'Hero Section',
                href: '/admin/management-content/hero',
                icon: PanelsTopLeft,
            },
            {
                title: 'Tentang Kami',
                href: about(),
                icon: Building2,
            },
            {
                title: 'Layanan',
                href: services(),
                icon: Briefcase,
            },
            {
                title: 'Katalog',
                href: catalog(),
                icon: BookOpen,
            },
            {
                title: 'Galeri',
                href: gallery(),
                icon: Images,
            },
            {
                title: 'Portofolio',
                href: portfolio(),
                icon: FactoryIcon,
            },
        ],
    },
    {
        title: 'Pesan Kontak',
        href: message(),
        icon: SendIcon,
    },
    {
        title: 'Sertifikat',
        href: certificates(),
        icon: Award,
    },
    {
        title: 'Pengaturan',
        href: setting(),
        icon: Cog,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Media Library',
        href: media(),
        icon: Images,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
