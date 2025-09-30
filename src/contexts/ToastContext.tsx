// src/contexts/ToastContext.tsx
'use client';
import Toast from '@/components/Toast';
import { createContext, useContext, useState, ReactNode } from 'react';

interface ToastState {
  isOpen: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState>({
    isOpen: false,
    message: '',
    type: 'info'
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({
      isOpen: true,
      message,
      type
    });
  };

  const handleToastClose = () => {
    setToast({ ...toast, isOpen: false });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        isOpen={toast.isOpen}
        onClose={handleToastClose}
        message={toast.message}
        type={toast.type}
      />
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};