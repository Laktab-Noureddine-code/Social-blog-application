// Laravel Reverb configuration (Pusher-compatible)
import { CONFIG } from '@/config/env';

export const REVERB_CONFIG = {
  key: CONFIG.reverb.appKey,
  wsHost: CONFIG.reverb.host,
  wsPort: CONFIG.reverb.port,
  wssPort: CONFIG.reverb.port,
  forceTLS: CONFIG.reverb.forceTLS,
  enabledTransports: ['ws', 'wss'],
  disableStats: true,
  cluster: 'mt1',
  authEndpoint: '/api/broadcasting/auth',
};

// Legacy export for compatibility
export const PUSHER_CONFIG = REVERB_CONFIG;

export default REVERB_CONFIG;
