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
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`${bgColors[type]} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]`}>
        <span className="text-2xl">{icons[type]}</span>
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-auto text-white/80 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
