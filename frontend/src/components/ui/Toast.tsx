/**
 * Toast Notification Component
 * 
 * Shows temporary success/error messages
 */

import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, type = 'success', duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
  };

  return (
    <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50 animate-slide-in max-w-[calc(100vw-1rem)] sm:max-w-md">
      <div className={`${bgColors[type]} text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-lg flex items-center gap-2 sm:gap-3 min-w-[280px] sm:min-w-[300px]`}>
        <span className="text-xl sm:text-2xl">{icons[type]}</span>
        <span className="font-medium text-sm sm:text-base flex-1">{message}</span>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white active:text-white transition-colors text-lg"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
