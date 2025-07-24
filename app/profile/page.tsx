'use client'

import { RootState } from '@/utils/appStore'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ImageUpload from '@/components/fields/ImageUpload'
import { toast } from 'react-toastify'
import UserCard from '@/components/UserCard'
import { logout, setProfileImage } from '@/utils/common'
import { setLoader } from '@/utils/commonSlice'

type ProfileState = {
  firstName: string
  lastName: string
  _id: string
  emailId: string
  image: string
  about: string
  age: string
  gender: string
  file: File | null
}

const initValue: ProfileState = {
  firstName: '',
  lastName: '',
  _id: '',
  emailId: '',
  image: '',
  about: '',
  age: '',
  gender: '',
  file: null
}

const Page = () => {
  const [profileData, setProfileData] = useState<ProfileState>(initValue)
  const dispatch = useDispatch()

  useEffect(() => {
    getProfileData()
  }, [])

  const getProfileData = async () => {
    try {
      dispatch(setLoader(true))
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/view`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include"
      })
      const res = await data.json()
      dispatch(setLoader(false))
      setProfileData({ ...res?.data, image: setProfileImage(res?.data?.image), file: res?.data?.image })
    } catch (err) {
      console.error(err)
      dispatch(setLoader(false))
    }
  }

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    const { about, age, firstName, gender, file, lastName } = profileData
    const formData = new FormData()
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('about', about)
    if (file) {
      formData.append('image', file)
    }
    formData.append('age', age)
    formData.append('gender', gender)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/edit`, {
      method: "PATCH",
      body: formData,
      credentials: "include"
    })
    const data = await res.json()
    if (data?.status) {
      toast.success(data?.message)
    } else {
      toast.error(data?.message)
      if (data?.logout) logout()
    }
  }

  const updateImage = (val: { base64: string, file: File }, name = '') => {
    setProfileData(p => ({ ...p, [name]: val?.base64, file: val?.file }))
  }

  const changeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-4 py-10 flex justify-center items-start">
      <div className="w-full max-w-5xl bg-white border border-[#E5E7EB] shadow-lg rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Form */}
        <form onSubmit={submitForm} className="space-y-5">
          <h2 className="text-2xl font-semibold text-[#1C1C28] mb-4">Edit Profile</h2>

          <ImageUpload
            acceptableMimeTypes="image/png,image/jpeg"
            image={profileData.image || null}
            onChange={(val: { base64: string; file: File }) => updateImage(val, 'image')}
            name="image"
          />

          <div>
            <label className="text-sm text-[#374151]">First Name</label>
            <input
              type="text"
              name="firstName"
              value={profileData.firstName}
              onChange={changeInput}
              placeholder="First Name"
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-pink-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="text-sm text-[#374151]">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={changeInput}
              placeholder="Last Name"
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-pink-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="text-sm text-[#374151]">Age</label>
            <input
              type="text"
              name="age"
              value={profileData.age}
              onChange={changeInput}
              placeholder="Age"
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-pink-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="text-sm text-[#374151]">Gender</label>
            <select
              name="gender"
              value={profileData.gender}
              onChange={changeInput}
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-pink-500 outline-none transition"
            >
              <option disabled value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-[#374151]">About</label>
            <textarea
              name="about"
              value={profileData.about}
              onChange={changeInput}
              placeholder="Tell us about yourself"
              rows={4}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-pink-500 outline-none transition resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2.5 rounded-lg font-medium transition"
          >
            Update Profile
          </button>
        </form>

        {/* Preview Card */}
        <div className="flex justify-center items-center pt-4 md:pt-0">
          <UserCard disabled={true} user={profileData} />
        </div>
      </div>
    </div>
  )
}

export default Page
