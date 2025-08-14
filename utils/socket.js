export const createSocketConnection = () => {
  return io("https://piqme.live", {
    path: "/socket.io",
    transports: ["websocket"],
    withCredentials: true
  });
};
