<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AboutUsSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('about_us')->insert([
            'description' => 'Di tengah perkembangan dunia yang dinamis dan semakin berkembang PT.SINERGY GARDA PRATAMA hadir sebagai salah satu perusahaan yang bergerak dalam bidang pelayanan Jasa Keamanan/Jasa pengamanan, Jasa pengelolaaan Parkiran di luar badan jalan (Off street Parking), dan Penyedia Sumber Daya manusia dan managemen fungsi Sumber Daya Manusia (tenaga kerja Outsourcing) lainya dalam rangka memenuhi tenaga kerja dari perusahaan perusahaan di seluruh Indonesia. Berbekal pengalaman bertahun tahun yang di miliki oleh jajaran direksi dan karyawan yang kami miliki pada sektor bisnis yang kami jalankan, kami mengerti pentingnya penyediaan sumber daya manusia yang tidak hanya terampil tapi juga profesional, serta system teknologi yang terbarukan dengan di dukung oleh ahli sytem pengelolaan keamanan dan pengelolaan sumber daya manusia yang kami miliki.',
            'vision' => 'Menjadi perusahaan Terdepan dan Terbesar di Indonesia pada sektor usaha yang di jalankan serta di dukung oleh system, Teknologi dan SDM Profesional, serta mampu memenuhi kebutuhan pasar dengan solutif, inovatif, dan bertanggung jawab',
            'mission' => 'Menerapkan kaidah terbaik dalam sektor, keamanan/Pengamanan, Jasa pengeloaan parkir (Off Stret Parking), Penyedia SDM (Tenaga Kerja Outsorcing) dengan menerapkan Teknik Sistem dan layanan oprasional yang dapat di andalkan. Memberikan pelayanan dan membangun kompetensi melalui pengembangan SDM dengan berorientasi pada integritas dan standart etika kerja yang tinggi. Mengutamakan kepuasan pelanggan melalui service excellent yang di dasarkan nilai-nilai perusahaan.',
            'profile_images' => json_encode([
                '/images/about/team-briefing.jpg',
                '/images/about/training-classroom.jpg',
                '/images/about/physical-training.jpg',
            ]),
            'profile_video_url' => null,
            'meta_title' => 'Tentang Kami - PT. Sinergy Garda Pratama (SIGAP)',
            'meta_description' => 'Pelajari lebih lanjut tentang visi, misi, dan komitmen PT. Sinergy Garda Pratama dalam menyediakan layanan keamanan dan SDM terbaik di Indonesia.',
            'meta_keywords' => 'tentang sigap, profil perusahaan keamanan, visi misi sigap, outsourcing indonesia',
            'slug' => 'tentang-kami',
        ]);
    }
}
