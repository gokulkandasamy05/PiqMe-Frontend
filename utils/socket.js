import io from 'socket.io-client'

export const createSocketConnection = () => {
  if (location.hostname === 'localhost') {
    return io(process.env.NEXT_PUBLIC_API_BASE_URL);
  }else{
    io('/', {
      path: "/api/socket.io",
      transports: ["websocket"],
      withCredentials: true
    })
  }

};
