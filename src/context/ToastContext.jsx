'use client'

import React, { createContext, useState, useContext, useCallback } from 'react';
import Alert from '@/components/application/alerts/Alert';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, style = 'success') => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, style }]);
    setTimeout(() => removeToast(id), 5000); // Auto-remove after 5 seconds
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <Alert
            key={toast.id}
            message={toast.message}
            style={toast.style}
            onClose={() => removeToast(toast.id)} // Pass the dismissal handler
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
