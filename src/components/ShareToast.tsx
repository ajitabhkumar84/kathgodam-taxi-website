/**
 * ShareToast Component
 * Displays a success message when a link is copied to clipboard
 */

import { useEffect } from 'react';

interface ShareToastProps {
  message: string;
  isVisible: boolean;
  onDismiss: () => void;
}

export default function ShareToast({ message, isVisible, onDismiss }: ShareToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onDismiss]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-20 right-6 z-60 animate-slide-up"
      role="alert"
      aria-live="polite"
    >
      <div className="bg-black/90 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2">
        <svg
          className="w-5 h-5 text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
}
