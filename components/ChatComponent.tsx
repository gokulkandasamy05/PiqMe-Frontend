import { RootState } from '@/utils/appStore'
import { createSocketConnection } from '@/utils/socket'
import { format } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

interface ChatsProps {
    id: string;
    messages: {
        sender: string
        text: string,
        createdAt: string,
        side: string,
    _id?:string
    }[],
    name: string
}

interface message {
    createdAt: string
    sender: string
    text: string
    updatedAt: string
    _id: string
    dateHeader?: string
    side: string
}

const ChatComponent: React.FC<ChatsProps> = ({ id, messages, name }) => {
    const [text, setText] = useState('')
    const user = useSelector((store: RootState) => store.user)
    const loggedinUserId = user?._id
    const [modifiedMessages, setModifiedMessages] = useState<message[]>([])
    const messagesEndRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (modifiedMessages?.length) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
        }
    }, [modifiedMessages])

    useEffect(() => {
        const arr: string[] = []
        const todayDate = format(new Date(), 'dd MMM yyyy');
        if (messages?.length) {
            const modifiedArr = messages.map((item) => {
                const date = item?.createdAt;
                const formattedDate = format(new Date(date), 'dd MMM yyyy');
                // Add dateHeader only for the first message of a new date
                let dateHeader = '';
                if (!arr.includes(formattedDate)) {
                    arr.push(formattedDate);
                    dateHeader = formattedDate === todayDate ? 'Today' : formattedDate;
                }
                return {
                    sender: item.sender,
                    text: item.text,
                    createdAt: item.createdAt,
                    updatedAt: item.createdAt, // Use createdAt as a placeholder if updatedAt is not available
                    _id: item._id || '', // Use _id as required by the interface
                    dateHeader: dateHeader,
                    side: item?.side
                };
            });
            setModifiedMessages(modifiedArr);
        }else{
            setModifiedMessages([])
        }
    }, [messages])

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e?.target?.value)
    }

    const sendMessage = () => {
        if (text) {
            const socket = createSocketConnection()
            socket.emit('sendMessage', { loggedinUserId, id, text })
            setText('')
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const setDate = (date: string | Date | number) => {
        const d = new Date(date)
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    console.log(modifiedMessages);
    

    return (
        <div className='w-full h-full relative flex flex-col justify-between'>

            <div className='sticky top-0 w-full bg-pink-200 text-black p-3'>
                <p>{name}</p>
            </div>
            <div className='px-5 overflow-x-scroll h-full sticky top-0' >
                {
                    modifiedMessages.map((item, index) => {

                        return <div key={index} className='w-full'>
                            {!!item?.dateHeader && <div className='py-5 text-center'>
                                <p>{item?.dateHeader}</p>
                            </div>}
                            <div className='text-md'>
                                {item?.side === 'to' ? <div className="chat chat-start flex flex-col">
                                    <div className="bg-white text-[#000] p-2 rounded-xl shadow">{item?.text}</div>
                                    <div className="chat-footer">
                                        <time className="text-xs opacity-70 mt-1">{setDate(item?.createdAt).toLocaleString()}</time>
                                    </div>
                                </div> : <div className="chat chat-end flex flex-col">
                                    <div className="bg-stone-300 text-[#000] p-2 rounded-xl shadow">{item?.text}</div>
                                    <div className="chat-footer">
                                        <time className="text-xs opacity-70 mt-1">{setDate(item?.createdAt).toLocaleString()}</time>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    })
                }
                <div ref={messagesEndRef} />
            </div>



            <div className='w-full p-5 flex gap-2'>
                <input
                    type="text"
                    name="lastName"
                    value={text}
                    onChange={changeInput}
                    placeholder="Type message.."
                    autoComplete='off'
                    className="w-11/12 rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-[#1C1C28] placeholder-[#9CA3AF] focus:outline-none transition"
                    required
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault(); // prevent newline
                            sendMessage() // send your message
                        }
                    }}
                />
                <button onClick={() => {
                    sendMessage()
                }} className="min-w-1/12 px-4 cursor-pointer bg-pink-600 hover:bg-pink-700 text-white py-2.5 rounded-lg font-medium transition">
                    Send
                </button>
            </div>
        </div>
    )
}

export default ChatComponent