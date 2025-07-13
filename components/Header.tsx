import { persistor, RootState } from '@/utils/appStore'
import { clearUser } from '@/utils/userSlice'
import { redirect } from 'next/navigation'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

type UserState = {
  firstName: string
  lastName: string
  _id: string
  emailId: string
}


const Header = () => {
  const user = useSelector((store: RootState) => store.user)
   const dispatch = useDispatch()
  console.log(user);

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
    <div className="navbar bg-black shadow-sm sticky top-0 z-10">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">PiqMe</a>
      </div>
      {!!user?._id && <div className="flex gap-2 items-center">
        <p className='me-3'>{`Welcome, ${user?.firstName}`}</p>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li><a onClick={logout}>Logout</a></li>
          </ul>
        </div>
      </div>}
    </div>
  )
}

export default Header