// Laravel Reverb configuration (Pusher-compatible)
export const REVERB_CONFIG = {
  key: 'my-app-key',                     // REVERB_APP_KEY from backend .env
  wsHost: '127.0.0.1',                   // REVERB_HOST
  wsPort: 8080,                          // REVERB_PORT
  wssPort: 8080,
  forceTLS: false,                       // false for local dev (http)
  enabledTransports: ['ws'],             // Only ws for local (not wss)
  disableStats: true,
  cluster: 'mt1',                        // Required by pusher-js (any value works)
  authEndpoint: '/api/broadcasting/auth',
};

// Legacy export for compatibility
export const PUSHER_CONFIG = REVERB_CONFIG;

export default REVERB_CONFIG;
