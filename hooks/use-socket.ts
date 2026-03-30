"use client";

import { useCallback, useEffect, useRef } from "react";

import { getSocket } from "@/lib/socket";

export function useSocket(scope?: string) {
  const socketRef = useRef(getSocket(scope));

  useEffect(() => {
    const socket = getSocket(scope);

    socketRef.current = socket;

    if (!socket.connected) {
      socket.connect();
    }
    // Do NOT disconnect on unmount — singleton is shared across components
  }, [scope]);

  const on = useCallback(
    (event: string, handler: (...args: unknown[]) => void) => {
      socketRef.current.on(event, handler);
    },
    [],
  );

  const off = useCallback(
    (event: string, handler: (...args: unknown[]) => void) => {
      socketRef.current.off(event, handler);
    },
    [],
  );

  const emit = useCallback((event: string, ...args: unknown[]) => {
    socketRef.current.emit(event, ...args);
  }, []);

  return { on, off, emit, socket: socketRef.current };
}
