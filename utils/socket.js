import io from 'socket.io-client';

export const createSocketConnection = () => {
  return io('https://piqme.live', {
    transports: ['websocket'],
    withCredentials: true
  });
};
