// resources/js/components/organisms/content-tabs.tsx

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ContentTabsProps {
    children: React.ReactNode
    seoContent: React.ReactNode
}

export function ContentTabs({ children, seoContent }: ContentTabsProps) {
    return (
        <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Konten</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Tentang Kami</CardTitle>
                        <CardDescription>
                            Kelola informasi tentang perusahaan Anda
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {children}
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="seo" className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Pengaturan SEO</CardTitle>
                        <CardDescription>
                            Optimalkan halaman untuk mesin pencari
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='!max-w-4xl'>
                        {seoContent}
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
