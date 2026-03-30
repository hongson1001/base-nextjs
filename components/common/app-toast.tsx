"use client";

import { useCallback, useEffect, useState } from "react";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

let toastId = 0;
const listeners: Set<(toast: Toast) => void> = new Set();

export function showToast(message: string, type: ToastType = "info") {
  const toast: Toast = { id: ++toastId, message, type };

  listeners.forEach((listener) => listener(toast));
}

const typeStyles: Record<ToastType, string> = {
  success: "bg-success text-success-foreground",
  error: "bg-danger text-danger-foreground",
  warning: "bg-warning text-warning-foreground",
  info: "bg-primary text-primary-foreground",
};

export function AppToastContainer({ duration = 4000 }: { duration?: number }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Toast) => {
    setToasts((prev) => [...prev, toast]);
  }, []);

  useEffect(() => {
    listeners.add(addToast);

    return () => {
      listeners.delete(addToast);
    };
  }, [addToast]);

  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, duration);

    return () => clearTimeout(timer);
  }, [toasts, duration]);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed right-4 top-4 z-[9999] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`animate-appearance-in flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg ${typeStyles[toast.type]}`}
          role="alert"
        >
          <span className="text-sm font-medium">{toast.message}</span>
          <button
            className="ml-2 opacity-70 hover:opacity-100"
            onClick={() => removeToast(toast.id)}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}
