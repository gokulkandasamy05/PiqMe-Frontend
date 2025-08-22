'use client'
import { persistor, RootState } from '@/utils/appStore'
import { defaultImage, setProfileImage } from '@/utils/common'
import { clearUser } from '@/utils/userSlice'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {
  const user = useSelector((store: RootState) => store.user)
  const dispatch = useDispatch()
  const router = useRouter()

  const logout = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });

    const data = await res?.json()
    if (data?.status) {
      dispatch(clearUser())
      persistor.purge()
      router.replace('/login') // 🔥 client-side redirect (fast)
    } else {
      if (data?.logout) {
        dispatch(clearUser())
        logout()
      }
    }
  }

  return (
    // <header className="sticky top-0 inset-x-0 z-50 bg-white shadow-sm border-b border-gray-200">
    //   <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
    //     <div
    //       className="text-2xl font-bold text-pink-600 cursor-pointer tracking-tight"
    //       onClick={() => router.push('/login')} // 🔥 use router.push
    //     >
    //       PiqMe
    //     </div>

    //     {!!user?._id && (
    //       <div className="flex items-center space-x-4">
    //         <p className="hidden sm:block text-sm font-medium text-gray-700">
    //           {`Welcome, ${(user?.firstName ?? '') + ' ' + (user?.lastName ?? '')}`}
    //         </p>

    //         <div className="relative group">
    //           <button className="flex items-center focus:outline-none">
    //             <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500">
    // <img
    //   src={
    //     setProfileImage({
    //       destination: user?.image?.destination ?? "",
    //       filename: user?.image?.filename ?? ""
    //     }) || defaultImage
    //   }
    //   alt="User Avatar"
    //   className="object-cover w-full h-full"
    // />
    //             </div>
    //           </button>

    //           <ul className="bg-white rounded-lg shadow-lg ring-1 ring-black/5 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transform transition duration-200 z-50 divide-y divide-gray-100">
    //             <li>
    //               <button
    //                 onClick={() => router.push('/profile')} // ✅ fast client nav
    //                 className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
    //               >
    //                 Profile
    //               </button>
    //             </li>
    //             <li>
    //               <button
    //                 onClick={() => router.push('/connections')}
    //                 className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
    //               >
    //                 Connections
    //               </button>
    //             </li>
    //             <li>
    // <button
    //   onClick={logout}
    //   className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
    // >
    //   Logout
    // </button>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </header>
    <div className="navbar bg-gray-100 shadow-sm w-full justify-between">
      <div
        className="text-2xl font-bold text-pink-600 cursor-pointer tracking-tight"
        onClick={() => router.push('/login')} // 🔥 use router.push
      >
        PiqMe
      </div>
      {!!user?._id && <div className="flex gap-2">
        <p className="hidden sm:block text-sm font-medium text-gray-700 content-center">
          {`Welcome, ${(user?.firstName ?? '') + ' ' + (user?.lastName ?? '')}`}
        </p>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src={
                  setProfileImage({
                    destination: user?.image?.destination ?? "",
                    filename: user?.image?.filename ?? ""
                  }) || defaultImage
                }
                alt="Image"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow bg-gray-100">
            <li>
              <Link href='profile' className="w-full px-4 py-2 text-left text-sm hover:text-pink-600 hover:bg-gray-100">
                Profile
              </Link>
            </li>
            <li><Link href='connections' className="w-full px-4 py-2 text-left text-sm hover:text-pink-600 hover:bg-gray-100">Connections</Link></li>
            <li><button
              onClick={logout}
              className="w-full px-4 py-2 text-left text-sm hover:text-pink-600 hover:bg-gray-100"
            >
              Logout
            </button></li>
          </ul>
        </div>
      </div>}
    </div>
  )
}

export default Header
