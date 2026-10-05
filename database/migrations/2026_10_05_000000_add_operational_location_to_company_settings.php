<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('company_settings', function (Blueprint $table) {
            $table->string('operational_location')->nullable()->after('company_address');
        });

        DB::table('company_settings')
            ->whereNull('operational_location')
            ->update(['operational_location' => 'Jawa Tengah & DIY']);
    }

    public function down(): void
    {
        Schema::table('company_settings', function (Blueprint $table) {
            $table->dropColumn('operational_location');
        });
    }
};
