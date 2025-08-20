'use client'

import { defaultImage, fetchConnectedList, setProfileImage } from '@/utils/common'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type UserInfo = {
    _id: string
    firstName: string
    lastName: string
    about: string
    age: string
    gender: string
    image: { destination: string | null, filename: string | null }
}

type UserInfoFrom = {
    fromUserId: UserInfo
}

type UserInfoTo = {
    toUserId: UserInfo
}

interface ChatsProps {
  setUserId: (id: string, name: string) => void;
}

const Chats: React.FC<ChatsProps> = ({ setUserId }) => {
    const [connections, setConnections] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchConnectedList()
            if (data?.data?.length) {
                setConnections(data?.data.map((item: UserInfoFrom | UserInfoTo) => {
                    if ('toUserId' in item) {
                        return item.toUserId;
                    } else if ('fromUserId' in item) {
                        return item.fromUserId;
                    }
                    return null;
                }).filter(Boolean));
            }
        }
        fetchData()
    }, [])

    console.log(connections);


    return (
        <div className='w-full h-full'>
            {/* <div className='h-[100px]'>
                Chats
            </div> */}
            <div className='w-full h-full'>
                {
                    connections.map((item: UserInfo) => {
                        const imageUrl = item?.image?.destination && item?.image?.filename
                            ? setProfileImage({ destination: item.image.destination, filename: item.image.filename })
                            : typeof defaultImage === 'string' ? defaultImage : defaultImage
                        return <div key={item?._id} className='p-4 bg-gray-50 w-full border border-gray-300 cursor-pointer' onClick={() => setUserId(item?._id, item?.firstName + ' ' + item?.lastName)}>
                            <div className="chat-image avatar gap-3">
                                <div className="w-10 rounded-full">
                                    <Image
                                        alt="Profile"
                                        width={100}
                                        height={100}
                                        src={imageUrl}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <p className='text-black'>{item?.firstName} {item?.lastName}</p>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Chats