import io from 'socket.io-client'

export const createSocketConnection = () => {
    return io(process.env?.NEXT_PUBLIC_API_BASE_URL, {
        transports: ['websocket', 'polling'], // important for fallback
        withCredentials: true
    })
}