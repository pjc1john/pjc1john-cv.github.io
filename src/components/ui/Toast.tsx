'use client';

import { useEffect, useState } from 'react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}

interface ToastProps {
  message: ToastMessage;
  onClose: (id: string) => void;
  duration?: number;
}

function ToastItem({ message, onClose, duration = 2000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    setTimeout(() => setIsVisible(true), 10);

    // Start exit animation before removal
    const exitTimer = setTimeout(() => {
      setIsLeaving(true);
    }, duration - 300);

    // Remove toast
    const removeTimer = setTimeout(() => {
      onClose(message.id);
    }, duration);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [message.id, onClose, duration]);

  const bgColor = message.type === 'success' 
    ? 'bg-green-500' 
    : message.type === 'error' 
    ? 'bg-red-500' 
    : 'bg-blue-500';

  const icon = message.type === 'success' ? (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ) : message.type === 'error' ? (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all duration-300 ${bgColor} ${
        isVisible && !isLeaving 
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 translate-x-full'
      }`}
    >
      {icon}
      <span>{message.text}</span>
    </div>
  );
}

interface ToastContainerProps {
  messages: ToastMessage[];
  onClose: (id: string) => void;
  duration?: number;
}

export default function ToastContainer({ messages, onClose, duration = 2000 }: ToastContainerProps) {
  if (messages.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      {messages.map((message) => (
        <ToastItem 
          key={message.id} 
          message={message} 
          onClose={onClose} 
          duration={duration} 
        />
      ))}
    </div>
  );
}

// Helper hook for managing toasts
export function useToast() {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const showToast = (type: 'success' | 'error' | 'info', text: string) => {
    const id = Date.now().toString();
    setMessages((prev) => [...prev, { id, type, text }]);
  };

  const closeToast = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  return { messages, showToast, closeToast };
}
