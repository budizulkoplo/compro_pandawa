// resources/js/components/organisms/certificates-carousel.tsx

import Slider from 'react-infinite-logo-slider';
import { SectionTitle } from "@/components/atoms/section-title-guest";
import { Certificate } from "@/types";
import { getImageUrl } from "@/utils/image-helper";
import { Award } from "lucide-react";

interface CertificatesCarouselProps {
    certificates: Certificate[];
}

export function CertificatesCarousel({ certificates }: CertificatesCarouselProps) {
    return (
        <section className="container w-full mx-auto py-20 items-center">
            <SectionTitle>Sertifikasi & Penghargaan</SectionTitle>

            <div className="mt-12">
                <Slider
                    width="250px"
                    duration={10}
                    pauseOnHover={true}
                >
                    {certificates.map((cert) => (
                        <Slider.Slide key={cert.id}>
                            <div className="w-40 h-40 bg-card rounded-lg shadow-md hover:shadow-xl p-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:scale-105">
                                {cert.image_path ? (
                                    <img
                                        src={getImageUrl(cert.image_path)}
                                        alt={cert.title}
                                        className="max-h-20 w-full object-contain rounded-md"
                                    />
                                ) : (
                                    <Award className="w-16 h-16 text-[#21b6fc]" />
                                )}
                                <p className="text-xs text-center font-medium text-[#00334e] dark:text-white line-clamp-2">
                                    {cert.title}
                                </p>
                            </div>
                        </Slider.Slide>
                    ))}
                </Slider>
            </div>
        </section>
    );
}
