// src/components/Toast.jsx
import React from 'react';
import { usePlatform } from '../context/PlatformContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toasts, removeToast } = usePlatform();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="toast-icon success" size={20} />;
      case 'error':
        return <AlertTriangle className="toast-icon error" size={20} />;
      default:
        return <Info className="toast-icon info" size={20} />;
    }
  };

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item ${toast.type}`}>
          {getIcon(toast.type)}
          <div className="toast-content">
            <h4 className="toast-title">{toast.title}</h4>
            <p className="toast-message">{toast.message}</p>
          </div>
          <button 
            className="toast-close" 
            onClick={() => removeToast(toast.id)}
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
export default Toast;
