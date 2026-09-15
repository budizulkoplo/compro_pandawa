// resources/js/components/sections/clients-list-section.tsx

import { useState, useMemo } from "react";
import { Client } from "@/types";
import { ClientPublicCard } from "@/components/molecules/client-public-card";
import { Button } from "@/components/ui/button";

interface ClientsListSectionProps {
    clients: Client[];
}

export function ClientsListSection({ clients }: ClientsListSectionProps) {
    const [selectedSector, setSelectedSector] = useState<string | null>(null);

    // Get unique sectors
    const sectors = useMemo(() => {
        const uniqueSectors = new Set(
            clients
                .filter((client) => client.sector)
                .map((client) => client.sector)
        );
        return Array.from(uniqueSectors).sort();
    }, [clients]);

    // Filter clients by sector
    const filteredClients = useMemo(() => {
        if (!selectedSector) return clients;
        return clients.filter((client) => client.sector === selectedSector);
    }, [clients, selectedSector]);

    if (!clients || clients.length === 0) {
        return (
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p className="text-muted-foreground">
                            Belum ada data klien yang tersedia saat ini.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Sector Filter */}
                {sectors.length > 0 && (
                    <div className="mb-8">
                        <div className="relative">
                            <div className="flex gap-2 overflow-x-auto pb-4 mx-auto justify-center">
                                <Button
                                    variant={selectedSector === null ? "default" : "outline"}
                                    onClick={() => setSelectedSector(null)}
                                    size="sm"
                                    className="shrink-0"
                                >
                                    Semua ({clients.length})
                                </Button>
                                {sectors.map((sector) => {
                                    const count = clients.filter((c) => c.sector === sector).length;
                                    return (
                                        <Button
                                            key={sector}
                                            variant={selectedSector === sector ? "default" : "outline"}
                                            onClick={() => setSelectedSector(sector)}
                                            size="sm"
                                            className="shrink-0"
                                        >
                                            {sector} ({count})
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Clients Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredClients.map((client) => (
                        <ClientPublicCard key={client.id} client={client} />
                    ))}
                </div>

                {/* Empty State for Filtered Results */}
                {filteredClients.length === 0 && selectedSector && (
                    <div className="py-12 text-center">
                        <p className="text-muted-foreground">
                            Tidak ada klien di sektor "{selectedSector}".
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
