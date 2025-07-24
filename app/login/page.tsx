'use client'
import { defaultImage } from '@/utils/common'
import { setUser } from '@/utils/userSlice'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FaEdit } from 'react-icons/fa'
import { RootState } from '@/utils/appStore'
import ImageUpload from '../../components/fields/ImageUpload'
import { setLoader } from '@/utils/commonSlice'

type screenFieldsTypes = {
    login: { firstName?: string, lastName?: string, emailId: string, password: string, image?: string },
    signup: { firstName: string, lastName: string, emailId: string, password: string, image: string },
}

const screenFields: screenFieldsTypes = {
    login: { firstName: '', lastName: '', emailId: '', password: '', image: '' },
    signup: { firstName: '', lastName: '', emailId: '', password: '', image: '' },
}

type ScreenType = 'login' | 'signup'

const Login = () => {
    const [screen, setScreen] = useState<ScreenType>('login')
    const [userData, setUserData] = useState<screenFieldsTypes[ScreenType]>(() => screenFields[screen])
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        setUserData(screenFields[screen])
    }, [screen])

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserData(p => ({ ...p, [name]: value }))
    }

    const submitForm = async (e: React.FormEvent) => {
        dispatch(setLoader(true))
        try {
            e.preventDefault()
            const res = await fetch(process.env?.NEXT_PUBLIC_API_BASE_URL + (screen === 'signup' ? '/signUp' : "/login"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
                credentials: "include"
            })
            const data = await res.json()
            if (data?.status) {
                toast.success(data?.message)
                if (screen === 'login') {
                    dispatch(setUser(data?.data))
                    router.push('/feed')
                } else {
                    setScreen('login')
                    setUserData({ emailId: '', password: '' })
                }
                dispatch(setLoader(false))
            } else {
                toast.error(data?.message)
            }
        } catch (err) {
            console.log(err)
            dispatch(setLoader(false))
        }
    }

    const updateImage = (val : String, name = '') =>{
        setUserData(p => ({ ...p, [name]: val }))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4">
            <div className="w-full max-w-md bg-white border border-[#E5E7EB] shadow-md rounded-3xl p-8">
                <h2 className="text-2xl font-semibold text-center text-[#1C1C28] mb-1">
                    {screen === 'login' ? 'Welcome Back' : 'Create an Account'}
                </h2>
                <p className="text-center text-sm text-[#6B7280] mb-6">
                    {screen === 'login' ? 'Please enter your details to continue.' : 'Start your journey with us.'}
                </p>

                <form onSubmit={submitForm} className="space-y-5">
                    {screen === 'signup' && (
                        <>
                            <ImageUpload acceptableMimeTypes="image/png,image/jpeg" image={userData?.image || defaultImage?.src} onChange={(val: String) => updateImage(val, 'image')} name='image'></ImageUpload>

                            <div>
                                <label className="text-sm text-[#374151]">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={userData.firstName}
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
                                    value={userData.lastName}
                                    onChange={changeInput}
                                    placeholder="Last Name"
                                    className="mt-1 w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-[#1C1C28] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 transition"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label className="text-sm text-[#374151]">Email</label>
                        <input
                            type="email"
                            name="emailId"
                            value={userData.emailId}
                            onChange={changeInput}
                            placeholder="you@example.com"
                            className="mt-1 w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-[#1C1C28] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm text-[#374151]">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={changeInput}
                            placeholder="••••••••"
                            className="mt-1 w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-[#1C1C28] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="cursor-pointer w-full bg-[#1C1C28] text-white py-2.5 rounded-lg font-medium hover:bg-[#333] transition"
                    >
                        {screen === 'signup' ? 'Sign Up' : 'Login'}
                    </button>
                </form>

                <div className="text-center mt-6">
                    {screen === 'login' ? (
                        <>
                            <p className="text-sm text-[#6B7280]">Don't have an account?</p>
                            <button
                                onClick={() => setScreen('signup')}
                                className="text-black cursor-pointer mt-1 text-sm font-medium hover:underline"
                            >
                                Create one
                            </button>
                        </>
                    ) : (
                        <>
                            <p className="text-sm text-[#6B7280]">Already registered?</p>
                            <button
                                onClick={() => setScreen('login')}
                                className="text-black mt-1 text-sm font-medium hover:underline cursor-pointer"
                            >
                                Login
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )

}

export default Login
