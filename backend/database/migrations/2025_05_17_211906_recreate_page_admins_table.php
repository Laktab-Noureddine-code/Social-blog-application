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
        Schema::create('page_admins', function (Blueprint $table) {
            $table->id();

            $table->foreignId('page_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->timestamps();

            $table->unique(['page_id', 'user_id']); // prevent duplicate entries
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('page_admins');
    }
};
