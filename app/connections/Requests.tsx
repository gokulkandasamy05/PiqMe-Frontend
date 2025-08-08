'use client'
import { logout } from '@/utils/common'
import { setLoader } from '@/utils/commonSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import UserRow from './UserRow'
import { clearUser } from '@/utils/userSlice'

const Requests = ({ name }: { name: 'requests' | 'connections' }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      dispatch(setLoader(true))
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${name === 'connections' ? '/user/connections' : '/user/requests'}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      )
      const result = await res.json()

      if (result.status) {
        setData(result.data)
      } else {
        if (result?.logout) {
          dispatch(clearUser())
          logout()
        }
      }

      dispatch(setLoader(false))
    } catch (err) {
      console.error(err)
      dispatch(setLoader(false))
    }
  }

  return (
    <div className="bg-white rounded-2xl p-4 h-full">
      <UserRow data={data} hideBtn={name === 'connections'} getData={getData} />
    </div>
  )
}

export default Requests
