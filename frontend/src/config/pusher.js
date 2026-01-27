// Laravel Reverb configuration (Pusher-compatible)
export const REVERB_CONFIG = {
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: import.meta.env.VITE_REVERB_HOST,
  wsPort: import.meta.env.VITE_REVERB_PORT ?? 8080,
  wssPort: import.meta.env.VITE_REVERB_PORT ?? 8080,
  forceTLS: (import.meta.env.VITE_REVERB_SCHEME === 'https'),
  enabledTransports: ['ws', 'wss'],
  disableStats: true,
  cluster: 'mt1',
  authEndpoint: '/api/broadcasting/auth',
};

// Legacy export for compatibility
export const PUSHER_CONFIG = REVERB_CONFIG;

export default REVERB_CONFIG;
