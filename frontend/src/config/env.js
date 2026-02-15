/**
 * Environment Configuration
 * Automatically detects production vs development based on URLs
 */

// Production domain(s) - add your production domains here
const PRODUCTION_DOMAINS = ['m1n.me', 'www.m1n.me', 'api.m1n.me'];

/**
 * Detect if we're in production based on:
 * 1. VITE_BACKEND_URL contains production domain
 * 2. Current window hostname is a production domain
 * 3. Vite's built-in DEV mode flag
 */
const detectEnvironment = () => {
  // Check Vite's built-in mode first
  if (import.meta.env.DEV) {
    return 'development';
  }
  
  // Check if VITE_BACKEND_URL contains production domain
  const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
  const isBackendProduction = PRODUCTION_DOMAINS.some(domain => 
    backendUrl.includes(domain)
  );
  
  // Check if current hostname is production
  const currentHost = typeof window !== 'undefined' ? window.location.hostname : '';
  const isHostProduction = PRODUCTION_DOMAINS.some(domain => 
    currentHost.includes(domain) || currentHost === domain
  );
  
  return (isBackendProduction || isHostProduction) ? 'production' : 'development';
};

// Current environment
export const ENV = detectEnvironment();
export const IS_PRODUCTION = ENV === 'production';
export const IS_DEVELOPMENT = ENV === 'development';

// Production URLs
const PROD_CONFIG = {
  backendUrl: 'https://api.m1n.me',
  frontendUrl: 'https://www.m1n.me',
  reverbHost: 'api.m1n.me',
  reverbPort: 443,
  reverbScheme: 'https',
  forceTLS: true,
};

// Development URLs  
const DEV_CONFIG = {
  backendUrl: '', // Empty for Vite proxy
  frontendUrl: 'http://localhost:5173',
  reverbHost: '127.0.0.1',
  reverbPort: 8080,
  reverbScheme: 'http',
  forceTLS: false,
};

/**
 * Get config based on environment
 * Priority: ENV variables > auto-detected defaults
 */
export const CONFIG = {
  // Environment info
  env: ENV,
  isProduction: IS_PRODUCTION,
  isDevelopment: IS_DEVELOPMENT,
  
  // API URLs - use env vars if set, otherwise use defaults
  backendUrl: import.meta.env.VITE_BACKEND_URL || 
    (IS_PRODUCTION ? PROD_CONFIG.backendUrl : DEV_CONFIG.backendUrl),
  
  frontendUrl: import.meta.env.VITE_FRONTEND_URL || 
    (IS_PRODUCTION ? PROD_CONFIG.frontendUrl : DEV_CONFIG.frontendUrl),
  
  // Reverb/WebSocket config
  reverb: {
    appKey: import.meta.env.VITE_REVERB_APP_KEY || 'my-app-key',
    host: import.meta.env.VITE_REVERB_HOST || 
      (IS_PRODUCTION ? PROD_CONFIG.reverbHost : DEV_CONFIG.reverbHost),
    port: parseInt(import.meta.env.VITE_REVERB_PORT) || 
      (IS_PRODUCTION ? PROD_CONFIG.reverbPort : DEV_CONFIG.reverbPort),
    scheme: import.meta.env.VITE_REVERB_SCHEME || 
      (IS_PRODUCTION ? PROD_CONFIG.reverbScheme : DEV_CONFIG.reverbScheme),
    forceTLS: import.meta.env.VITE_REVERB_SCHEME === 'https' || 
      (IS_PRODUCTION ? PROD_CONFIG.forceTLS : DEV_CONFIG.forceTLS),
  },
};

// Debug log in development
if (IS_DEVELOPMENT) {
  console.log('🔧 Environment:', ENV);
  console.log('🔧 Config:', CONFIG);
}

export default CONFIG;
