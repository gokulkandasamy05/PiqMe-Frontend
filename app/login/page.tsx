'use client'
import { setUser } from '@/utils/userSlice'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

type screenFieldsTypes = {
    login: { firstName?: string, lastName?: string, emailId: string, password: string },
    signup: { firstName: string, lastName: string, emailId: string, password: string },
}

const screenFields: screenFieldsTypes = {
    login: { firstName: '', lastName: '', emailId: '', password: '' },
    signup: { firstName: '', lastName: '', emailId: '', password: '' },
}

type ScreenType = 'login' | 'signup';



const Login = () => {

    const [screen, setScreen] = useState<ScreenType>('login')
    const [userData, setUserData] = useState<screenFieldsTypes[ScreenType]>(() => screenFields[screen])
    const dispatch = useDispatch()
    const router = useRouter();

    useEffect(() => {
        setUserData(screenFields[screen])
    }, [screen])

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e?.target
        setUserData(p => {
            return { ...p, [name]: value }
        })
    }

    const submitForm = async (e: React.FormEvent) => {
        try {
            e.preventDefault()
            console.log(userData);
            const res = await fetch(process.env?.NEXT_PUBLIC_API_BASE_URL + (screen === 'signup' ? '/signUp' : "/login"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
                credentials: "include"
            });

            const data = await res?.json()
            console.log(data);
            
            if (data?.status) {
                
                if (screen === 'login') {
                    toast.success(data?.message)
                    dispatch(setUser(data?.data))
                    router.push('/feed');
                } else if (screen === 'signup') {
                    toast.success(data?.message)
                    setScreen('login')
                    setUserData({ emailId: '', password: '' })
                }
            } else {
                toast.error(data?.message)
            }
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <>
            <div className="hero min-h-screen w-full">
                <div className="hero-content flex-col lg:flex-row-reverse sm:w-1/2">
                    <div className="card bg-base-100 shrink-0 shadow-2xl py-5 w-full">
                        <h5 className="text-2xl font-bold  text-center">{screen === 'login' ? 'Login now!' : 'Signup'}</h5>
                        <div className="card-body">
                            <form action="#" onSubmit={submitForm}>
                                <fieldset className="fieldset">
                                    {
                                        screen === 'signup' ? <>
                                            <label className="label">First Name</label>
                                            <input type="text" value={userData?.firstName??''} required name="firstName" onChange={changeInput} className="input w-full" placeholder="First Name" />
                                            <label className="label">Last Name</label>
                                            <input type="text" value={userData?.lastName??''} required name="lastName" onChange={changeInput} className="input w-full" placeholder="Last Name" />
                                        </> : null
                                    }
                                    <label className="label">Email</label>
                                    <input type="email" required value={userData?.emailId??''} name="emailId" onChange={changeInput} className="input w-full" placeholder="Email" />
                                    <label className="label">Password</label>
                                    <input type="password" required name='password' value={userData?.password??''} onChange={changeInput} className="input w-full" placeholder="Password" />
                                    <button className="btn btn-neutral mt-4" type='submit'>{screen === 'signup' ? 'Signup' : 'Login'}</button>
                                </fieldset>
                            </form>
                        </div>
                        <div className='w-full text-center'>
                            {
                                screen === 'login' ? <>
                                    <p>Don't have an account?</p>
                                    <button onClick={() => setScreen('signup')} className="btn">Signup</button>
                                </> : <>
                                    <p>Already have an account?</p>
                                    <button className="btn" onClick={() => setScreen('login')}>Login</button>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login