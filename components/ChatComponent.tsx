import { RootState } from '@/utils/appStore'
import { createSocketConnection } from '@/utils/socket'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

interface ChatsProps {
    id: string;
    messages: {
        sender: 'from' | 'to'
        text: string
    }[],
    name: string
}

const ChatComponent: React.FC<ChatsProps> = ({ id, messages, name }) => {
    const [text, setText] = useState('')
    const user = useSelector((store: RootState) => store.user)
    const loggedinUserId = user?._id


    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e?.target?.value)
    }

    const sendMessage = () => {
        if (text) {
            const socket = createSocketConnection()
            socket.emit('sendMessage', { loggedinUserId, id, text })
            setText('')
        }
    }

    return (
        <div className='w-full h-full relative flex flex-col justify-between'>

            <div className='sticky top-0 w-full bg-pink-200 text-black p-3'>
                <p>{name}</p>
            </div>
            <div className='p-5 overflow-x-scroll h-full sticky top-0'>
                {
                    messages.map((item, index) => {
                        return <div key={index}>
                            {item?.sender === 'to' && <div className="chat chat-start">
                                {/* <div className="chat-header">
                                    Obi-Wan Kenobi
                                    <time className="text-xs opacity-50">12:45</time>
                                </div> */}
                                <div className="chat-bubble">{item?.text}</div>
                                {/* <div className="chat-footer opacity-50">Delivered</div> */}
                            </div>}
                            {item?.sender === 'from' && <div className="chat chat-end">
                                {/* <div className="chat-header">
                                    Anakin
                                    <time className="text-xs opacity-50">12:46</time>
                                </div> */}
                                <div className="chat-bubble">{item?.text}</div>
                                {/* <div className="chat-footer opacity-50">Seen at 12:46</div> */}
                            </div>}
                        </div>
                    })
                }
            </div>







            <div className='w-full p-5 flex gap-2'>
                <input
                    type="text"
                    name="lastName"
                    value={text}
                    onChange={changeInput}
                    placeholder="Type message.."
                    className="w-11/12 rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-[#1C1C28] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 transition"
                    required
                />
                <button onClick={() => sendMessage()} className="w-1/12 cursor-pointer bg-pink-600 hover:bg-pink-700 text-white py-2.5 rounded-lg font-medium transition">
                    Send
                </button>
            </div>
        </div>
    )
}

export default ChatComponent