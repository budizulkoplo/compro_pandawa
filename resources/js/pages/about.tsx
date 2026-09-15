// resources/js/pages/about.tsx

import { MainLayout } from "@/layouts/main-layout";
import { AboutHeroSection } from "@/components/sections/about-hero-section";
import { MissionVisionSection } from "@/components/sections/mission-vision-section";
import { ProfileSection } from "@/components/sections/profile-section";
import { CompanyProfileSection } from "@/components/sections/company-profile-section";
// import { StatsSection } from "@/components/sections/stats-section";
import { CertificatesCarousel } from "@/components/organism/certificates-carousel";
import { AboutUs, Certificate, CompanySetting, Service } from "@/types";

interface AboutPageProps {
    companySettings: CompanySetting;
    featuredServices: Service[];
    about: AboutUs;
    certificates: Certificate[];
}

export default function About({ companySettings, about, certificates, featuredServices }: AboutPageProps) {
    console.log(about?.meta_description)
    return (
        <MainLayout settings={companySettings} title="Tentang Kami" description={about?.meta_description || companySettings.company_description} services={featuredServices}>

            <CompanyProfileSection settings={companySettings} />

            {/* Hero Section with Description */}
            {about?.description && (
                <AboutHeroSection description={about.description} />
            )}

            {/* Mission & Vision Section */}
            <MissionVisionSection
                vision={about?.vision}
                mission={about?.mission}
            />

            {/* Stats Section */}

            {/* Profile Images & Video Section */}
            <ProfileSection
                images={about?.profile_images || []}
                videoUrl={about?.profile_video_url || undefined}
            />

            {/* Certificates Carousel */}
            {certificates && certificates.length > 0 && (
                <CertificatesCarousel certificates={certificates} />
            )}
        </MainLayout>
    );
}
