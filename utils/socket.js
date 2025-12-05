import io from 'socket.io-client';

// Next.js replaces this with the actual URL during build
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const createSocketConnection = () => {
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return io(API_BASE, {
      transports: ["websocket"]
    });
  }

  return io("/", {
    path: "/api/socket.io",
    transports: ["websocket"],
    withCredentials: true
  });
};
