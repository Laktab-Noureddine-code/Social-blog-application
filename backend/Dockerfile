# =============================================================================
# PRODUCTION-OPTIMIZED LARAVEL DOCKERFILE
# =============================================================================
# Base: PHP 8.2 FPM for Laravel 11
# Optimized for: Production deployment with local testing capability
# =============================================================================

FROM php:8.2-fpm

# -----------------------------------------------------------------------------
# SYSTEM DEPENDENCIES
# -----------------------------------------------------------------------------
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libicu-dev \
    libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# -----------------------------------------------------------------------------
# PHP EXTENSIONS
# -----------------------------------------------------------------------------
# pdo_mysql  - MySQL database connection
# bcmath     - Laravel encryption & hashing
# pcntl      - Process control (CRUCIAL for Reverb/Queues)
# mbstring   - Multibyte string handling
# exif       - Image metadata
# gd         - Image processing
# zip        - Archive handling
# intl       - Internationalization
# opcache    - Production performance optimization
# -----------------------------------------------------------------------------
RUN docker-php-ext-install \
    pdo_mysql \
    bcmath \
    pcntl \
    mbstring \
    exif \
    gd \
    zip \
    intl \
    opcache

# -----------------------------------------------------------------------------
# REDIS EXTENSION (for Cache/Queues/Sessions)
# -----------------------------------------------------------------------------
RUN pecl install redis && docker-php-ext-enable redis

# -----------------------------------------------------------------------------
# COMPOSER INSTALLATION
# -----------------------------------------------------------------------------
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# -----------------------------------------------------------------------------
# PHP CONFIGURATION FOR PRODUCTION
# -----------------------------------------------------------------------------
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# OPcache configuration for production performance
RUN echo "opcache.enable=1" >> "$PHP_INI_DIR/conf.d/opcache.ini" \
    && echo "opcache.memory_consumption=256" >> "$PHP_INI_DIR/conf.d/opcache.ini" \
    && echo "opcache.interned_strings_buffer=16" >> "$PHP_INI_DIR/conf.d/opcache.ini" \
    && echo "opcache.max_accelerated_files=20000" >> "$PHP_INI_DIR/conf.d/opcache.ini" \
    && echo "opcache.validate_timestamps=0" >> "$PHP_INI_DIR/conf.d/opcache.ini" \
    && echo "opcache.save_comments=1" >> "$PHP_INI_DIR/conf.d/opcache.ini"

# -----------------------------------------------------------------------------
# APPLICATION SETUP
# -----------------------------------------------------------------------------
WORKDIR /var/www

# Copy composer files first (for better layer caching)
COPY composer.json composer.lock ./

# Install dependencies (no dev dependencies for production)
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

# Copy application code
COPY . .

# Generate optimized autoloader
RUN composer dump-autoload --optimize

# -----------------------------------------------------------------------------
# PERMISSIONS
# -----------------------------------------------------------------------------
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage \
    && chmod -R 755 /var/www/bootstrap/cache

# -----------------------------------------------------------------------------
# EXPOSE & ENTRYPOINT
# -----------------------------------------------------------------------------
EXPOSE 9000

CMD ["php-fpm"]