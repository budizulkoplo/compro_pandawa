import { AppContent } from '@/components/organism/app-content';
import { AppShell } from '@/components/organism/app-shell';
import { AppSidebar } from '@/components/organism/app-sidebar';
import { AppSidebarHeader } from '@/components/organism/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <Toaster position="bottom-right" theme='system' richColors closeButton />
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
