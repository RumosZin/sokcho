// src/components/Toast.tsx
import { useEffect } from 'react';
import { getToastClasses } from '@/constants/colors';

interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type?: 'success' | 'error' | 'info' | 'create' | 'edit' | 'delete';
  duration?: number;
}

export default function Toast({ 
  isOpen, 
  onClose, 
  message,
  type = 'info',
  duration = 2000
}: ToastProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, duration]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
      case 'create':
        return '✅';
      case 'error':
      case 'delete':
        return '🗑️';
      case 'edit':
        return '✏️';
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className="fixed top-8 left-0 right-0 flex justify-center z-50">
      <div className="max-w-4xl mx-auto px-8 w-full">
        <div className={`font-bold py-4 px-6 rounded-lg shadow-lg border transition-colors duration-200 animate-slide-down-up text-center ${getToastClasses(type)}`}>
          <span className="text-lg mr-2">{getIcon()}</span>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
}