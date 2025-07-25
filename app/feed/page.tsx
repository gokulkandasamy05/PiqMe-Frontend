'use client'

import UserCard from '@/components/UserCard'
import { defaultImage, logout, setProfileImage } from '@/utils/common'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const Page = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    getFeedList()
  }, [])

  const getFeedList = async () => {
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
          }) : defaultImage?.src
        }))
        setData(transformed)
      } else {
        if (res?.logout) {
          logout()
        }
      }
    } catch (error) {
      console.error('Failed to fetch feed list:', error)
    }
  }


  return (
    <div className="h-screen py-10 px-4 flex justify-center items-center bg-gradient-to-b from-[#F0F4F8] to-[#D9E2EC]">
      <Swiper
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
      </Swiper>
    </div>
  )
}

export default Page
