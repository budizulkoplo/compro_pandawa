<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->text('content');
            $table->string('image')->nullable();
            $table->boolean('isActive')->default(true);
            $table->integer('sortOrder')->default(0);

            // SEO fields
            $table->string('metaTitle')->nullable();
            $table->text('metaDescription')->nullable();
            $table->text('metaKeywords')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
