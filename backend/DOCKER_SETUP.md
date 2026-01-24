# 🐳 Docker Setup for Laravel Backend

> **Production-First Containerization Guide**

This document explains the Docker configuration for the Laravel backend, covering the **what**, **why**, and **how** of each component.

---

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [File Structure](#file-structure)
3. [Dockerfile Explained](#dockerfile-explained)
4. [Nginx Configuration](#nginx-configuration)
5. [Docker Compose Services](#docker-compose-services)
6. [Environment Configuration](#environment-configuration)
7. [Networking](#networking)
8. [Quick Start](#quick-start)
9. [Common Commands](#common-commands)
10. [Troubleshooting](#troubleshooting)

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         DOCKER NETWORK                              │
│                       (laravel-network)                             │
│                                                                     │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐         │
│  │  NGINX  │────│   APP   │────│  MYSQL  │    │  REDIS  │         │
│  │  :80    │    │  :9000  │    │  :3306  │    │  :6379  │         │
│  └────┬────┘    └─────────┘    └─────────┘    └────┬────┘         │
│       │              │                              │              │
│       │         ┌────┴────┐                         │              │
│       │         │         │                         │              │
│  ┌────┴────┐  ┌─┴───┐  ┌──┴──┐                     │              │
│  │ REVERB  │  │WORKER│  │SCHED│◄────────────────────┘              │
│  │  :8080  │  └─────┘  └─────┘                                     │
│  └─────────┘                                                        │
└─────────────────────────────────────────────────────────────────────┘
         │              │
         ▼              ▼
    localhost:8080  localhost:8000
    (WebSocket)     (HTTP API)
```

### Why This Architecture?

| Component | Purpose | Why Separate? |
|-----------|---------|---------------|
| **App** | Runs PHP-FPM | Handles HTTP requests via FastCGI |
| **Web** | Nginx reverse proxy | Serves static files, routes to PHP, handles WebSocket upgrades |
| **MySQL** | Database | Persistent data storage |
| **Redis** | Cache/Queue broker | Fast in-memory operations |
| **Reverb** | WebSocket server | Real-time bidirectional communication |
| **Worker** | Queue processor | Background job execution |
| **Scheduler** | Cron replacement | Runs Laravel's task scheduler |

---

## 📁 File Structure

```
backend/
├── Dockerfile                    # Production-optimized PHP image
├── docker-compose.local.yml      # Local development orchestration
├── .env.docker                   # Docker-specific environment vars
├── .dockerignore                 # Files excluded from build context
└── docker/
    └── nginx/
        └── default.conf          # Nginx configuration
```

---

## 🐋 Dockerfile Explained

### What It Does

The Dockerfile creates a **production-ready PHP 8.2 FPM** image with all dependencies needed for Laravel 11.

### Layer-by-Layer Breakdown

```dockerfile
FROM php:8.2-fpm
```
**Why PHP-FPM?** FastCGI Process Manager is designed for high-load environments. It manages PHP worker processes efficiently, unlike Apache's mod_php.

---

```dockerfile
RUN apt-get update && apt-get install -y \
    git curl zip unzip \
    libpng-dev libonig-dev libxml2-dev libzip-dev libicu-dev
```
**Why These Packages?**
| Package | Required For |
|---------|-------------|
| `git` | Composer packages from Git repos |
| `curl` | HTTP requests, health checks |
| `zip/unzip` | Composer package extraction |
| `libpng-dev` | GD image processing |
| `libonig-dev` | Multibyte string (mbstring) |
| `libzip-dev` | ZIP archive handling |
| `libicu-dev` | Internationalization (intl) |

---

```dockerfile
RUN docker-php-ext-install pdo_mysql bcmath pcntl mbstring exif gd zip intl opcache
```
**Why These Extensions?**
| Extension | Purpose | Critical For |
|-----------|---------|-------------|
| `pdo_mysql` | MySQL database driver | Database connections |
| `bcmath` | Arbitrary precision math | Encryption, hashing |
| `pcntl` | Process control | **Reverb, Queue workers** |
| `mbstring` | Multibyte strings | UTF-8 handling |
| `gd` | Image manipulation | Avatar/photo processing |
| `intl` | Internationalization | Date formatting, translations |
| `opcache` | Bytecode caching | **50-100% performance boost** |

> ⚠️ **CRITICAL**: `pcntl` is essential for Reverb and queue workers to handle signals properly (graceful shutdown, job timeouts).

---

```dockerfile
RUN pecl install redis && docker-php-ext-enable redis
```
**Why Redis Extension?** Native PHP Redis extension is 2-3x faster than predis (pure PHP client). Required for:
- Session storage
- Cache operations
- Queue jobs
- Real-time broadcasting

---

```dockerfile
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
```
**Why Production INI?** Uses PHP's optimized production settings:
- `display_errors = Off`
- `log_errors = On`
- `error_reporting = E_ALL & ~E_DEPRECATED & ~E_STRICT`

---

```dockerfile
# OPcache configuration
RUN echo "opcache.enable=1" >> "$PHP_INI_DIR/conf.d/opcache.ini" \
    && echo "opcache.memory_consumption=256" >> ...
```
**Why OPcache Tuning?**
| Setting | Value | Reason |
|---------|-------|--------|
| `memory_consumption` | 256MB | Enough for large Laravel apps |
| `max_accelerated_files` | 20000 | Laravel has many files |
| `validate_timestamps` | 0 | **Production only**: Don't check file changes |

---

```dockerfile
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader
COPY . .
RUN composer dump-autoload --optimize
```
**Why This Order?** Docker layer caching optimization:
1. Copy dependency files first
2. Install dependencies (cached if composer.json unchanged)
3. Copy application code
4. Generate optimized autoloader

This means rebuilds are **fast** when only code changes (not dependencies).

---

## 🌐 Nginx Configuration

### What It Does

Nginx acts as a reverse proxy handling:
- Static file serving (CSS, JS, images)
- PHP request routing to PHP-FPM
- **WebSocket upgrade handling for Reverb**

### Key Sections Explained

#### PHP-FPM Connection
```nginx
location ~ \.php$ {
    fastcgi_pass app:9000;  # 'app' is the Docker service name
    ...
}
```
**Why `app:9000`?** Docker's internal DNS resolves `app` to the PHP container's IP. Port 9000 is PHP-FPM's default.

#### WebSocket Proxy (The Critical Part)
```nginx
location /app {
    proxy_pass http://reverb:8080;
    proxy_http_version 1.1;
    
    # CRUCIAL: WebSocket upgrade headers
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    
    proxy_read_timeout 86400;  # 24 hours
}
```

**Why This is Necessary:**

1. **HTTP/1.1 Required**: WebSockets need HTTP/1.1 for the upgrade mechanism
2. **Upgrade Headers**: Tell the server to switch protocols from HTTP to WebSocket
3. **Long Timeout**: WebSocket connections are long-lived (24h = 86400 seconds)
4. **No Buffering**: Real-time data must flow immediately

**How WebSocket Handshake Works:**
```
Client                    Nginx                     Reverb
  │                         │                         │
  │──GET /app?transport=ws──│                         │
  │  Upgrade: websocket     │                         │
  │  Connection: Upgrade    │                         │
  │                         │──Proxy with headers────▶│
  │                         │                         │
  │                         │◀──101 Switching─────────│
  │◀────────────────────────│                         │
  │                         │                         │
  │◀═══════WebSocket════════│═════════════════════════│
```

---

## 🎼 Docker Compose Services

### Service Definitions

#### 1. App Service (PHP-FPM)
```yaml
app:
  build:
    context: .
    dockerfile: Dockerfile
  volumes:
    - .:/var/www  # Mount code for development
  depends_on:
    mysql:
      condition: service_healthy
```

**Why Health Check Dependency?** Ensures MySQL is accepting connections before Laravel tries to connect. Prevents "Connection refused" errors on startup.

#### 2. Web Service (Nginx)
```yaml
web:
  image: nginx:alpine
  ports:
    - "8000:80"
  volumes:
    - .:/var/www
    - ./docker/nginx/default.conf:/etc/nginx/conf.d/default.conf:ro
```

**Why Alpine?** Nginx Alpine image is ~23MB vs ~140MB for Debian-based. Faster pulls, smaller attack surface.

**Why Mount Code?** Nginx needs access to `/public` for static files.

#### 3. MySQL Service
```yaml
mysql:
  image: mysql:8.0
  ports:
    - "3306:3306"  # Exposed for TablePlus
  environment:
    MYSQL_DATABASE: ${DB_DATABASE:-laravel}
  volumes:
    - mysql_data:/var/lib/mysql
  healthcheck:
    test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
```

**Why Named Volume?** `mysql_data` persists data between container restarts. Without it, you'd lose your database on every `docker-compose down`.

#### 4. Redis Service
```yaml
redis:
  image: redis:alpine
  command: redis-server --appendonly yes
  volumes:
    - redis_data:/data
```

**Why `--appendonly yes`?** Enables Redis persistence. Without it, cached data is lost on restart.

#### 5. Reverb Service (WebSockets)
```yaml
reverb:
  build:
    context: .
    dockerfile: Dockerfile
  ports:
    - "8080:8080"
  command: php artisan reverb:start --host=0.0.0.0 --port=8080 --debug
```

**Why Same Dockerfile?** Reverb needs the same PHP environment as the app. Using the same image ensures consistency and saves disk space.

**Why `--host=0.0.0.0`?** Binds to all network interfaces inside the container. Required for Docker networking to work.

#### 6. Worker Service
```yaml
worker:
  command: php artisan queue:work redis --sleep=3 --tries=3 --max-time=3600
```

**Why These Flags?**
| Flag | Value | Purpose |
|------|-------|---------|
| `--sleep=3` | 3 seconds | Polling interval when queue is empty |
| `--tries=3` | 3 attempts | Retry failed jobs |
| `--max-time=3600` | 1 hour | Restart worker to prevent memory leaks |

---

## 🔧 Environment Configuration

### Key Variables in `.env.docker`

```env
# Database - Use container name, not localhost
DB_HOST=mysql
DB_PORT=3306

# Redis - Same principle
REDIS_HOST=redis

# Reverb Server - Bind to all interfaces
REVERB_HOST=0.0.0.0
REVERB_PORT=8080

# Reverb Client (Frontend) - Browser connects to host machine
VITE_REVERB_HOST=localhost
VITE_REVERB_PORT=8080
```

### Why Different Hosts?

**Container-to-Container Communication:**
```
┌──────────────┐     ┌──────────────┐
│   App        │────▶│   MySQL      │
│              │     │              │
│ DB_HOST=mysql│     │ Port 3306    │
└──────────────┘     └──────────────┘
       Uses Docker DNS
```

**Browser-to-Container Communication:**
```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Browser    │────▶│   Host       │────▶│   Reverb     │
│              │     │   Machine    │     │   Container  │
│ localhost    │     │ Port 8080    │     │ Port 8080    │
└──────────────┘     └──────────────┘     └──────────────┘
       Uses localhost (host machine)
```

---

## 🌐 Networking

### How Docker Networking Works

```yaml
networks:
  laravel-network:
    driver: bridge
```

**Bridge Network Features:**
- Containers can communicate using service names
- Isolated from other Docker networks
- Automatic DNS resolution (`mysql` → `172.18.0.3`)

### Port Mapping

| Service | Container Port | Host Port | Purpose |
|---------|---------------|-----------|---------|
| Web | 80 | 8000 | HTTP API access |
| Reverb | 8080 | 8080 | WebSocket access |
| MySQL | 3306 | 3306 | Database tools |
| Redis | 6379 | 6379 | Redis CLI access |

---

## 🚀 Quick Start

### 1. Copy Environment File
```powershell
cd backend
copy .env.docker .env
```

### 2. Build and Start
```powershell
docker-compose -f docker-compose.local.yml up --build -d
```

### 3. Initialize Laravel
```powershell
# Generate application key
docker exec -it laravel_app php artisan key:generate

# Run database migrations
docker exec -it laravel_app php artisan migrate

# (Optional) Seed database
docker exec -it laravel_app php artisan db:seed
```

### 4. Verify Services
```powershell
# Check all containers are running
docker-compose -f docker-compose.local.yml ps

# Check logs if issues
docker-compose -f docker-compose.local.yml logs -f
```

### 5. Access Application
- **API**: http://localhost:8000
- **WebSocket**: ws://localhost:8080

---

## 🛠️ Common Commands

### Container Management
```powershell
# Start services
docker-compose -f docker-compose.local.yml up -d

# Stop services
docker-compose -f docker-compose.local.yml down

# Rebuild after Dockerfile changes
docker-compose -f docker-compose.local.yml up --build -d

# View logs
docker-compose -f docker-compose.local.yml logs -f [service_name]

# Shell into container
docker exec -it laravel_app bash
```

### Laravel Commands
```powershell
# Artisan commands
docker exec -it laravel_app php artisan [command]

# Run migrations
docker exec -it laravel_app php artisan migrate

# Clear caches
docker exec -it laravel_app php artisan optimize:clear

# Composer install
docker exec -it laravel_app composer install
```

### Database
```powershell
# MySQL CLI
docker exec -it laravel_mysql mysql -u laravel -p

# Backup database
docker exec laravel_mysql mysqldump -u laravel -p laravel > backup.sql

# Restore database
docker exec -i laravel_mysql mysql -u laravel -p laravel < backup.sql
```

---

## 🔍 Troubleshooting

### Container Won't Start

**Check logs:**
```powershell
docker-compose -f docker-compose.local.yml logs app
```

### Database Connection Refused

**Cause:** MySQL not ready when app starts.

**Solution:** Health check is configured, but if issues persist:
```powershell
# Wait for MySQL, then restart app
docker-compose -f docker-compose.local.yml restart app
```

### WebSocket Connection Failed

**Check Reverb is running:**
```powershell
docker-compose -f docker-compose.local.yml logs reverb
```

**Verify port is accessible:**
```powershell
curl http://localhost:8080
```

### Permission Denied Errors

**Fix storage permissions:**
```powershell
docker exec -it laravel_app chmod -R 775 storage bootstrap/cache
docker exec -it laravel_app chown -R www-data:www-data storage bootstrap/cache
```

### Out of Memory

**Increase Docker memory** in Docker Desktop settings (recommended: 4GB minimum).

---

## 📚 Additional Resources

- [Laravel Reverb Documentation](https://laravel.com/docs/11.x/reverb)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [PHP-FPM Tuning](https://www.php.net/manual/en/install.fpm.configuration.php)

---

*Last updated: January 2026*
