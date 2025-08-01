import ApproveRejectButton from '@/components/ApproveRejectButton'
import { defaultImage, setProfileImage } from '@/utils/common'
import Image from 'next/image'
import React from 'react'

type User = {
  _id: string
  fromUserId: UserInfo
  toUserId: UserInfo
}

type UserInfo = {
  _id: string
  firstName: string
  lastName: string
  about: string
  age: string
  gender: string
  image: { destination: string | null, filename: string | null }
}

type Props = {
  data: User[]
  hideBtn: boolean
  getData?: () => void
}

const UserRow: React.FC<Props> = ({ data = [], hideBtn, getData }) => {
  if (!data.length) {
    return (
      <div className="text-center py-10 text-gray-500 font-medium">
        No {hideBtn ? 'connections' : 'requests'} found.
      </div>
    )
  }

  return (
    <ul className="space-y-4">
      {data.map((item: User, index: number) => {
        const { fromUserId, toUserId } = item

        const user = fromUserId?.firstName ? fromUserId : toUserId
        const name = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`
        const age = user?.age
        const gender = user?.gender
        const about = user?.about
        const imageUrl = user?.image?.destination && user?.image?.filename
          ? setProfileImage({ destination: user.image.destination, filename: user.image.filename })
          : typeof defaultImage === 'string' ? defaultImage : defaultImage

        return (
          <li
            key={item._id || index}
            className="flex flex-col sm:flex-row items-center sm:items-center text-justify gap-x-10 bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg transition-all"
          >
            <div className='flex flex-col md:flex-row w-full'>
              {/* Profile Image */}
              <div className="overflow-hidden rounded-xl border border-gray-300">
                <Image
                  alt="Profile"
                  width={100}
                  height={100}
                  src={imageUrl}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* User Info */}
              <div className="flex-1 sm:ml-6 mt-4 sm:mt-0 w-full">
                <div className="text-lg font-semibold text-gray-900">{name}</div>
                <div className="text-sm text-gray-500 font-medium">{age} • {gender}</div>
                <p className="text-sm text-gray-700 mt-2 line-clamp-3">{about}</p>
              </div>
            </div>

            {/* Approve/Reject Button */}
            {!hideBtn && (
              <div className="mt-4 sm:mt-0 sm:ml-auto flex items-center gap-3">
                <ApproveRejectButton row={item} getData={getData} />
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default UserRow
