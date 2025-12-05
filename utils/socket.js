import io from 'socket.io-client';

// Next.js replaces this with the actual URL during build
const API_BASE = 'https://piqme.live/api' || "";

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
