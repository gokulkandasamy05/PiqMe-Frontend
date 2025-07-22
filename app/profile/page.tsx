'use client'
import { RootState } from '@/utils/appStore'
import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import ImageUpload from '../../components/fields/ImageUpload'
import { toast } from 'react-toastify'
import Image from 'next/image'
import UserCard from '@/components/UserCard'
import { setProfileImage } from '@/utils/common'
import { setLoader } from '@/utils/commonSlice'

type ProfileState = {
    firstName: string
    lastName: string
    _id: string
    emailId: string,
    image: string,
    about: string,
    age: string,
    gender: string,
    file: File | null
}

const initValue = {
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

const page = () => {
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
            console.log(err)
            dispatch(setLoader(false))
        }
    }

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault()
        const { about, age, firstName, gender, file, lastName } = profileData
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('about', about);
        if (file) {
            formData.append('image', file)
        }
        formData.append('age', age);
        formData.append('gender', gender);

        const res = await fetch(process.env?.NEXT_PUBLIC_API_BASE_URL + '/profile/edit', {
            method: "PATCH",
            body: formData,
            credentials: "include"
        })
        const data = await res.json()
        console.log(data);
        if (data?.status) {
            toast.success(data?.message)
        } else {
            toast.error(data?.message)
        }

    }

    const updateImage = (val: { base64: string, file: File }, name = '') => {
        setProfileData(p => ({ ...p, [name]: val?.base64, file: val?.file }))
    }

    const changeInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>): void => {
        const { name, value } = e.target
        setProfileData(p => ({ ...p, [name]: value }))
    }

    console.log(profileData);


    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4">
            <div className="md:flex flex-col md:flex-row md:gap-3 w-full max-w-4xl bg-white border border-[#E5E7EB] shadow-md rounded-3xl p-8">
                <div className='md:w-1/2'>
                    <form onSubmit={submitForm} className="space-y-5">
                        <>
                            <ImageUpload acceptableMimeTypes="image/png,image/jpeg" image={profileData?.image || null} onChange={(val: { base64: string, file: File }) => updateImage(val, 'image')} name='image'></ImageUpload>

                            <div>
                                <label className="text-sm text-[#374151]">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={profileData.firstName}
                                    onChange={changeInput}
                                    placeholder="First Name"
                                    className="mt-1 w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-[#1C1C28] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 transition"
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
                                    className="mt-1 w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-[#1C1C28] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm text-[#374151]">Age</label>
                                <input
                                    type="text"
                                    name="age"
                                    value={profileData?.age}
                                    onChange={changeInput}
                                    placeholder="Age"
                                    className="mt-1 w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-[#1C1C28] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 transition"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm text-[#374151]">Gender</label>
                                <div>
                                    <select name="gender" onChange={changeInput} value={profileData.gender} required className="mt-1 w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-[#1C1C28] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 transition">
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Others</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-[#374151]">About</label>
                                <textarea
                                    name="about"
                                    value={profileData.about}
                                    onChange={changeInput}
                                    placeholder="About"
                                    className="mt-1 w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-[#1C1C28] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 transition"
                                />
                            </div>
                        </>

                        <button
                            type="submit"
                            className="cursor-pointer w-full bg-[#1C1C28] text-white py-2.5 rounded-lg font-medium hover:bg-[#333] transition"
                        >
                            {'Update Profile'}
                        </button>
                    </form>
                </div>
                <UserCard user={profileData}></UserCard>
            </div>
        </div>
    )
}

export default page