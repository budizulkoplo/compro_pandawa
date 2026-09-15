<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServicesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('services')->insert([
            [
                'title' => 'Jasa Keamanan',
                'slug' => 'jasa-keamanan',
                'description' => 'Penyediaan tenaga pengamanan terlatih yang siap menjaga keamanan lingkungan kerja, tempat tinggal, dan tempat usaha Anda.',
                'content' => 'Layanan keamanan kami mencakup: Penyedia Pengamanan, Pendidikan dan Pelatihan keamanan, Konsultasi Keamanan, Penerapan Peralatan Keamanan, serta Pengawalan Pribadi, Barang dan Uang. Kami memastikan setiap personel terlatih secara profesional untuk mengidentifikasi dan mengatasi potensi risiko keamanan.',
                'image' => '/images/services/jasa-keamanan.jpg',
                'isActive' => true,
                'sortOrder' => 1,
                'metaTitle' => 'Jasa Keamanan Profesional | PT. Sinergy Garda Pratama',
                'metaDescription' => 'Layanan keamanan lengkap mulai dari penyediaan satpam, pelatihan, konsultasi, hingga pengawalan pribadi dan aset berharga.',
                'metaKeywords' => 'jasa keamanan, satpam, security, pengawalan, bodyguard, keamanan perusahaan',
            ],
            [
                'title' => 'Pengelolaan Parkir (Off-Street Parking)',
                'slug' => 'pengelolaan-parkir',
                'description' => 'Jasa pengelolaan parkir yang profesional untuk gedung dan properti Anda, mengedepankan kerapian dan kenyamanan.',
                'content' => 'Kami menyediakan jasa pengelolaan parkir yang profesional untuk building dan property anda, mengedepankan keindahan dan kerapian dalam standart pengelolaan lokasi parkir, untuk memberikan kenyamanan, kemudahan, kerapian, keindahan bagi setiap pengunjung yang memasuki area parkir.',
                'image' => '/images/services/pengelolaan-parkir.jpg',
                'isActive' => true,
                'sortOrder' => 2,
                'metaTitle' => 'Jasa Pengelolaan Parkir Profesional | PT. Sinergy Garda Pratama',
                'metaDescription' => 'Solusi pengelolaan parkir off-street yang efisien, rapi, dan nyaman untuk gedung, mal, dan properti komersial lainnya.',
                'metaKeywords' => 'jasa parkir, manajemen parkir, off-street parking, pengelolaan parkir gedung',
            ],
            [
                'title' => 'Penyedia Tenaga Kerja (Outsourcing)',
                'slug' => 'penyedia-tenaga-kerja-outsourcing',
                'description' => 'Penyediaan tenaga kerja terlatih, berpengalaman, dan profesional untuk berbagai kebutuhan perusahaan Anda.',
                'content' => 'Kami menyediakan tenaga terlatih, berpengalaman, profesional, dan dapat di percaya untuk kebutuhan perusahaan anda, sehingga anda dapat fokus pada pertumbuhan dan keberlanjutan bisnis anda. Layanan kami mencakup berbagai sektor industri.',
                'image' => '/images/services/outsourcing.jpg',
                'isActive' => true,
                'sortOrder' => 3,
                'metaTitle' => 'Jasa Outsourcing Tenaga Kerja | PT. Sinergy Garda Pratama',
                'metaDescription' => 'Dapatkan tenaga kerja outsourcing yang terampil dan profesional untuk mendukung operasional bisnis Anda. Fokus pada pertumbuhan, kami urus SDM Anda.',
                'metaKeywords' => 'outsourcing, tenaga kerja, sdm, penyedia sdm, outsourcing semarang',
            ],
        ]);
    }
}
