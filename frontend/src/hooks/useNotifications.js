import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pusher from 'pusher-js';
import { addNotification, setNotifications } from '../Redux/notificationsSlice';
export default function useNotifications() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const token = useSelector(state => state.auth.access_token);

  useEffect(() => {
    if (!token || !user?.id) return;

    // 1. First fetch existing notifications
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications' ,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        dispatch(setNotifications(data));
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

    // 2. Set up Pusher for real-time updates
    const pusher = new Pusher('bbd7507f62ff970a1689', {
      cluster: 'eu',
      forceTLS: false, // Disable TLS for local development
      enabledTransports: ['ws', 'wss'],
      authEndpoint: '/broadcasting/auth',
      auth: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
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
  }, [dispatch, token, user?.id]);
}