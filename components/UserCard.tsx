'use client'

import React from 'react'
import { defaultImage, logout } from '@/utils/common'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setLoader } from '@/utils/commonSlice'
import { clearUser } from '@/utils/userSlice'

type User = {
  _id: string
  firstName: string
  lastName: string
  image: string
  about: string
  age: string
  gender: string
}

type Props = {
  user: User
  getFeedList?: () => void
  disabled?: boolean
}

const UserCard: React.FC<Props> = ({ user, getFeedList, disabled }) => {
  const dispatch = useDispatch()

  const acceptOrReject = async (status: string) => {
    if (disabled) return
    dispatch(setLoader(true))
    const id = user?._id

    try {
      const res = await fetch(`${'https://piqme.live/api'}/request/send/${status}/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      })
      const data = await res.json()

      if (data?.status) {
        toast.success(data?.message)
        getFeedList?.()
      } else {
        if (data?.logout) {
          dispatch(clearUser())
          logout()}
        toast.error(data?.message)
      }
    } catch (err) {
      console.error(err)
    } finally {
      dispatch(setLoader(false))
    }
  }


  return (
 <div className="min-h-screen flex items-center justify-center px-4 w-full">
  <div className={`bg-white w-full ${getFeedList ? 'max-w-md'  : ''} rounded-2xl shadow-lg overflow-hidden transition transform hover:scale-[1.01] duration-300`}>
    
    {/* Image Section */}
    <div>
      <img
        src={user?.image || (typeof defaultImage === 'string' ? defaultImage : defaultImage)}
        alt="Profile"
        className="w-full h-64 object-cover"
        loading="lazy"
      />
    </div>

    {/* Content Section */}
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{user?.firstName} {user?.lastName}</h2>
      <p className="text-gray-600 text-sm mb-1"><strong>Age:</strong> {user?.age}</p>
      <p className="text-gray-600 text-sm mb-3"><strong>Gender:</strong> {user?.gender}</p>
      <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{user?.about}</p>
    </div>

    {/* Buttons Section */}
    <div className="flex justify-center gap-6 pb-6">
      <button
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition duration-300"
        onClick={() => acceptOrReject('interested')}
        title="Accept"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </button>
      <button
        className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition duration-300"
        onClick={() => acceptOrReject('ignored')}
        title="Reject"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</div>

  )
}

export default UserCard
