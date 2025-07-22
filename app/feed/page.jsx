'use client'
import React, { useEffect } from 'react'

const page = () => {

  useEffect(() => {
    getFeedList()
  }, [])

  const getFeedList = async () => {
    // const data = await fetch('/api/feed', { credentials: 'include' });
    // const res = await data.json()
    // console.log(res);
  }



  return (
    <div>feed</div>
  )
}

export default page