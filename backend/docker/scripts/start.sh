#!/bin/bash
# =============================================================================
# LARAVEL CONTAINER STARTUP SCRIPT
# =============================================================================
# Runs initialization tasks before starting Supervisord
# =============================================================================

set -e

echo "🚀 Starting Laravel Container..."

# -----------------------------------------------------------------------------
# Wait for MySQL to be ready (using PHP to check connection)
# -----------------------------------------------------------------------------
echo "⏳ Waiting for MySQL..."
until php -r "
try {
    new PDO('mysql:host=' . getenv('DB_HOST') . ';port=3306', getenv('DB_USERNAME'), getenv('DB_PASSWORD'));
    echo 'connected';
    exit(0);
} catch (PDOException \$e) {
    exit(1);
}
" 2>/dev/null; do
    echo "   MySQL not ready, retrying in 3s..."
    sleep 3
done
echo "✅ MySQL is ready!"

# -----------------------------------------------------------------------------
# Wait for Redis to be ready (using PHP to check connection)
# -----------------------------------------------------------------------------
echo "⏳ Waiting for Redis..."
until php -r "
\$redis = new Redis();
try {
    \$redis->connect(getenv('REDIS_HOST'), 6379);
    if (\$redis->ping()) {
        echo 'connected';
        exit(0);
    }
} catch (Exception \$e) {
    exit(1);
}
exit(1);
" 2>/dev/null; do
    echo "   Redis not ready, retrying in 2s..."
    sleep 2
done
echo "✅ Redis is ready!"

# -----------------------------------------------------------------------------
# Laravel Initialization
# -----------------------------------------------------------------------------
cd /var/www

# Generate application key if not set
if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "base64:" ]; then
    echo "🔑 Generating application key..."
    php artisan key:generate --force
fi

# Run migrations (with --force for production)
echo "📦 Running database migrations..."
php artisan migrate --force

# Create storage link
echo "🔗 Creating storage link..."
php artisan storage:link --force 2>/dev/null || true

# Cache configuration for production
if [ "$APP_ENV" = "production" ]; then
    echo "⚡ Caching configuration for production..."
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    php artisan event:cache
fi

# Set correct permissions
echo "🔐 Setting permissions..."
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
chmod -R 775 /var/www/storage /var/www/bootstrap/cache

echo "✅ Laravel initialization complete!"

# -----------------------------------------------------------------------------
# Start Supervisord
# -----------------------------------------------------------------------------
echo "🎬 Starting Supervisord..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
