<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Page owner
            $table->string('name');                    // Page name
            $table->text('description')->nullable();   // About the page
            $table->string('cover_image_url')->nullable();    // Cover banner image
            $table->string('profile_image_url')->nullable();  // Profile picture
            $table->string('category')->nullable();    // e.g., Business, Community, etc.
            $table->string('website')->nullable();     // External site
            $table->string('email')->nullable();       // Contact email
            $table->string('phone')->nullable();       // Contact phone
            $table->string('location')->nullable();    // Address/location
            
            $table->boolean('is_verified')->default(false); // Verified badge
            // $table->string('slug')->unique();          // For SEO-friendly URLs
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};
