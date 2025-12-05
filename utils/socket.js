import io from 'socket.io-client'

export const createSocketConnection = () => {
  if (location.hostname === 'localhost') {
    return io('https://piqme.live/api');
  }else{
    return io('/', {
      path: "/api/socket.io",
      transports: ["websocket"],
      withCredentials: true
    })
  }

};
