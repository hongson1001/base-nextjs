import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;
let currentScope: string | undefined;

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3001";

/**
 * Returns (or creates) a Socket.io singleton.
 * If `scope` differs from the current scope, the existing socket is
 * disconnected and a new one is created for the new scope/namespace.
 */
export function getSocket(scope?: string): Socket {
  if (socket && currentScope === scope) {
    return socket;
  }

  // Scope changed — tear down old connection
  if (socket) {
    socket.disconnect();
    socket = null;
  }

  const namespace = scope ? `/${scope}` : "";

  socket = io(`${SOCKET_URL}${namespace}`, {
    withCredentials: true,
    autoConnect: false,
    transports: ["websocket", "polling"],
  });

  currentScope = scope;

  return socket;
}

/**
 * Disconnect and dispose of the singleton socket.
 */
export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
    currentScope = undefined;
  }
}
