/**
 * ShareToastContainer Component
 * Manages the state and display of share toast notifications
 */

import { useState, useEffect } from 'react';
import ShareToast from './ShareToast';

export default function ShareToastContainer() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleShowToast = (event: CustomEvent) => {
      setMessage(event.detail.message);
      setIsVisible(true);
    };

    window.addEventListener('show-share-toast', handleShowToast as EventListener);

    return () => {
      window.removeEventListener('show-share-toast', handleShowToast as EventListener);
    };
  }, []);

  return (
    <ShareToast
      message={message}
      isVisible={isVisible}
      onDismiss={() => setIsVisible(false)}
    />
  );
}
