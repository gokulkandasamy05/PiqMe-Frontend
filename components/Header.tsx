'use client'
import { persistor, RootState } from '@/utils/appStore'
import { defaultImage, setProfileImage } from '@/utils/common'
import { clearUser } from '@/utils/userSlice'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {
  const user = useSelector((store: RootState) => store.user)
  const dispatch = useDispatch()
  
  const logout = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/logout", {
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
      redirect('/login')
    }
  }

  return (
    <header className="bg-[#1C1C28] text-white sticky top-0 z-50 shadow-sm">
      <nav className="mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="text-2xl font-semibold text-[#FF5C8A] tracking-tight cursor-pointer" onClick={() => redirect('/login')}>
          PiqMe
        </div>

        {!!user?._id && (
          <div className="flex items-center gap-3">
            <p className="hidden sm:block text-sm font-medium text-white">
              {`Welcome, ${user?.firstName}`}
            </p>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:bg-[#2A2A3B] transition"
              >
                <div className="w-10 rounded-full ring ring-offset-2 ring-offset-[#1C1C28]">
                  <img
                    src={setProfileImage({destination: user?.image?.destination??"", filename: user?.image?.filename??""}) ?? defaultImage}
                    alt="User Avatar"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow-xl bg-white rounded-xl w-52 text-[#1C1C28] border border-[#E5E7EB]"
              >
                <li>
                  <a onClick={() => redirect('/profile')} className="hover:bg-[#F9FAFB] rounded-md px-2 py-2 text-sm font-medium">
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    onClick={logout}
                    className="hover:bg-[#FFF5F5] rounded-md px-2 py-2 text-sm font-medium text-[#FF3D57]"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
