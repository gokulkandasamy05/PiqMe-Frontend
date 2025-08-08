import io from 'socket.io-client'
// utils/socket.ts
export const createSocketConnection = () => {
  return io('wss://piqme.live', {
    path: '/socket.io',
    transports: ['websocket', 'polling'],
    withCredentials: true
  })
}
