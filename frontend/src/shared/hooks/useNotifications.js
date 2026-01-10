import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pusher from 'pusher-js';
import { REVERB_CONFIG } from '@/config/pusher';
import { addNotification, setNotifications } from '@/Redux/notificationsSlice';
import api from '@/lib/api';

export default function useNotifications() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;

    // 1. First fetch existing notifications
    const fetchNotifications = async () => {
      try {
        const response = await api.get('/api/notifications');
        dispatch(setNotifications(response.data));
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

    // 2. Set up Pusher (pointing to Reverb) for real-time updates
    // Note: WebSocket auth now uses cookies automatically
    const pusher = new Pusher(REVERB_CONFIG.key, {
      wsHost: REVERB_CONFIG.wsHost,
      wsPort: REVERB_CONFIG.wsPort,
      wssPort: REVERB_CONFIG.wssPort,
      forceTLS: REVERB_CONFIG.forceTLS,
      enabledTransports: REVERB_CONFIG.enabledTransports,
      disableStats: REVERB_CONFIG.disableStats,
      cluster: REVERB_CONFIG.cluster,
    });

    const channel = pusher.subscribe(`user.${user.id}`);

    channel.bind('notification', (data) => {
      dispatch(addNotification(data));
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [dispatch, isAuthenticated, user?.id]);
}