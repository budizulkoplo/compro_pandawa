<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClientsSeeder extends Seeder
{
    public function run(): void
    {
        $clients = [
            // MANUFACTURING AND WORKSHOP
            ['name' => 'PT. SEG Solar Manufacturing Indonesia', 'sector' => 'Manufacturing and Workshop'],
            ['name' => 'PT. Dream Plastic Indonesia', 'sector' => 'Manufacturing and Workshop'],
            ['name' => 'PT. Bosung Indonesia Semarang', 'sector' => 'Manufacturing and Workshop'],
            ['name' => 'PT. Gotrans Internatiaonal Logistics', 'sector' => 'Manufacturing and Workshop'],
            ['name' => 'PT. Prochain Kontruksi Indonesia', 'sector' => 'Manufacturing and Workshop'],
            ['name' => 'PT. Zhonbu Resins Indonesia', 'sector' => 'Manufacturing and Workshop'],
            ['name' => 'PT. Youmi Medika Industri', 'sector' => 'Manufacturing and Workshop'],
            ['name' => 'PT. Ihsing Industri Indonesia', 'sector' => 'Manufacturing and Workshop'],
            ['name' => 'PT. Concord Industry', 'sector' => 'Manufacturing and Workshop'],
            ['name' => 'PT. Kimuda Indonesia', 'sector' => 'Manufacturing and Workshop'],
            ['name' => 'PT. Trustindo Metronics Mulya', 'sector' => 'Manufacturing and Workshop'],
            ['name' => 'PT. Hageshii Jaya Sempurna', 'sector' => 'Manufacturing and Workshop'],

            // RESIDENCE AND TOWN HOUSE
            ['name' => 'Wisata Properti, PT', 'sector' => 'Residence and Town House'],

            // OFFICE AND PUBLIK
            ['name' => 'PT Indo Barometer', 'sector' => 'Office and Publik'],
            ['name' => 'PT. My Rasch Indonesia', 'sector' => 'Office and Publik'],
            ['name' => 'PT. Verdanco Group', 'sector' => 'Office and Publik'],
            ['name' => 'PT. Starworld International', 'sector' => 'Office and Publik'],
            ['name' => 'PT. Astra Aviva Life', 'sector' => 'Office and Publik'],
            ['name' => 'PT. Emerson Indonesia', 'sector' => 'Office and Publik'],
            ['name' => 'PT. Valarbi', 'sector' => 'Office and Publik'],
            ['name' => 'PT EFJA', 'sector' => 'Office and Publik'],

            // HOSPITAL
            ['name' => 'Klinik Kartika Sari', 'sector' => 'Hospital'],
            ['name' => 'RS. Karang Tengah Medika', 'sector' => 'Hospital'],

            // SCHOOL
            ['name' => 'Raffles House Preschool', 'sector' => 'School'],
            ['name' => 'Mentari International School', 'sector' => 'School'],

            // WORSHIP PLACE
            ['name' => 'GKI Bringin Semarang', 'sector' => 'Worship Place'],
        ];

        foreach ($clients as $client) {
            DB::table('clients')->insert([
                'name' => $client['name'],
                'slug' => \Illuminate\Support\Str::slug($client['name']),
                'sector' => $client['sector'],
                'description' => 'Klien terpercaya kami di sektor ' . $client['sector'] . '.',
                'logo_path' => '/images/clients/' . \Illuminate\Support\Str::slug($client['name']) . '.png',
                'is_active' => true,
            ]);
        }
    }
}
