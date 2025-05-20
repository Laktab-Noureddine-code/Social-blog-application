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
        Schema::create('group_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('group_id')->constrained('groups')->onDelete('cascade'); // FK vers groups
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');   // FK vers users
            $table->enum('role', ['admin', 'member']); // rôle: admin ou membre
            $table->enum('status', ['pending', 'accepted' , 'invited']); // statut: invitation/demande ou accepté
            $table->timestamp('joined_at')->nullable(); // Date d'acceptation
            $table->timestamps();

            // Pour éviter les doublons
            $table->unique(['group_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('group_members');
    }
};
