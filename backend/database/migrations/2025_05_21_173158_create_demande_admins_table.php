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
        Schema::create('demande_admins', function (Blueprint $table) {
             $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('page_id')->constrained('pages');
            $table->foreignId('id_demondeur')->constrained('users');
            $table->string('message');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demande_admins');
    }
};
