'use client'

import UserCard from '@/components/UserCard'
import { defaultImage, logout, setProfileImage } from '@/utils/common'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '@/utils/commonSlice'
import Chats from '@/components/Chats'
import ChatComponent from '@/components/ChatComponent'
import { createSocketConnection } from '../../utils/socket'
import { RootState } from '@/utils/appStore'

interface MessageObj {
  sender: 'from' | 'to'
  text: string,
}

const Page = () => {
  const [data, setData] = useState([])
  const [id, setId] = useState<{id: string, name: string}>({id: '', name:''})
  const dispatch = useDispatch()
  const user = useSelector((store: RootState) => store.user)
  const loggedinUserId = user?._id
  const [messages, setMessages] = useState<MessageObj[]>([])

  useEffect(() => {
    if (!id?.id) {
      return
    }
    const socket = createSocketConnection()
    if (id?.id) {
      socket.emit('joinChat', { loggedinUserId, id: id?.id })
    }

    socket.on('messageReceived', ({ text, loggedinUserId }) => {
      const sender = user?._id === loggedinUserId ? 'from' : 'to'
      setMessages((prev) => {
        return ([...prev, {sender, text}])
      })
    })

    return () => {
      socket.disconnect()
    }
  }, [id?.id])

  useEffect(() => {
    getFeedList()
  }, [])

  console.log(messages);

  const getFeedList = async () => {
    dispatch(setLoader(true))
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/feed`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
      const res = await response.json()
      if (res?.status) {
        const transformed = res.data.map((item: {
          image: { destination: string; filename: string }
        }) => ({
          ...item,
          image: item?.image?.destination ? setProfileImage({
            destination: item?.image?.destination,
            filename: item?.image?.filename
          }) : defaultImage
        }))
        setData(transformed)
      } else {
        if (res?.logout) {
          logout()
        }
      }
      dispatch(setLoader(false))
    } catch (error) {
      console.error('Failed to fetch feed list:', error)
    }
  }

  const setUserId = (id: string, name:string) => {
    setId({id: id, name: name})
  }



  return (
    <div className='w-full flex h-full'>
      <div className='w-1/3 h-full'>
        <Chats setUserId={setUserId}></Chats>
      </div>
      <div className="w-2/3 h-full flex justify-center items-center bg-gradient-to-b from-[#F0F4F8] to-[#D9E2EC]">
        {id?.id ? <ChatComponent name={id?.name} id={id?.id} messages={messages}></ChatComponent> : <Swiper
          direction="vertical"
          slidesPerView={1}
          mousewheel
          modules={[Mousewheel]}
          className="w-full max-w-2xl h-full"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <UserCard getFeedList={getFeedList} user={item} />
            </SwiperSlide>
          ))}
        </Swiper>}
      </div>
    </div>
  )
}

export default Page
