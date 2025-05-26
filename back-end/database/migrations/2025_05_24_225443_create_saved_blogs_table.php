<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('saved_blogs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('blog_id')->constrained()->onDelete('cascade');
            $table->timestamp('saved_at')->useCurrent();
            $table->timestamps();

            $table->unique(['user_id', 'blog_id']); // Prevent duplicate saves
        });
    }

    public function down()
    {
        Schema::dropIfExists('saved_blogs');
    }
};
