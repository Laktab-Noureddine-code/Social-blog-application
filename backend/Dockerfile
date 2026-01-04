FROM php:8.2-fpm

# 1. Install system dependencies (Keeping your list + optimizations)
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev \
    zip unzip libzip-dev libicu-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# 2. Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd intl zip

# 3. Setup Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# 4. Copy code (Excluding secrets/junk via .dockerignore)
COPY . /var/www

# 5. Professional Optimization
# We run composer install but skip dev tools and optimize the autoloader for speed
RUN composer install --no-interaction --optimize-autoloader --no-dev

# 6. Correct Permissions (Only for what Laravel needs to write to)
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]