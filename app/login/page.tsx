'use client'
import { defaultImage } from '@/utils/common'
import { setUser } from '@/utils/userSlice'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { FaEdit } from 'react-icons/fa';

type screenFieldsTypes = {
    login: { firstName?: string, lastName?: string, emailId: string, password: string, image?: string },
    signup: { firstName: string, lastName: string, emailId: string, password: string, image: string },
}

const screenFields: screenFieldsTypes = {
    login: { firstName: '', lastName: '', emailId: '', password: '', image: '' },
    signup: { firstName: '', lastName: '', emailId: '', password: '', image: '' },
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


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files?.length) {
            const { name } = e?.target
            const file = e.target.files[0];

            const acceptableMimeTypes = ['image/png', 'image/jpeg']
            if (!acceptableMimeTypes.includes(file?.type)) {
                toast.error(`Invalid file format`);
                return
            }

            const reader = new FileReader();
            reader.onerror = () => {
                console.error('File reading has failed');
                return
            };
            reader.onload = () => {
                setUserData(p => {
                    return { ...p, [name]: reader?.result }
                })
            };
            reader.readAsDataURL(file);
        }
    };


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
                <div className="hero-content flex-col lg:flex-row-reverse sm:w-1/3">
                    <div className="card bg-base-100 shrink-0 shadow-2xl py-5 w-full">
                        <h5 className="text-2xl font-bold  text-center">{screen === 'login' ? 'Login now!' : 'Sign Up'}</h5>
                        <div className="card-body">
                            <form action="#" onSubmit={submitForm}>
                                <fieldset className="fieldset">
                                    {
                                        screen === 'signup' ? <>
                                            <div className='w-full flex justify-center mb-2'>
                                                <div className='relative overflow-hidden group'>
                                                    <div className="avatar">
                                                        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                                                            <img src={!!userData?.image ? userData?.image : defaultImage} />
                                                            <input onChange={handleFileChange} accept="image/png, image/jpeg" hidden type="file" id="image" name="image"></input>
                                                        </div>
                                                    </div>
                                                    <div onClick={() => document.querySelector(`input[name=image]`)?.click()} className="absolute top-0 left-0 w-full h-full cursor-pointer bg-gray-950 hidden group-hover:flex justify-center items-center rounded-full">
                                                        <FaEdit size={24} color="white" />
                                                    </div>
                                                </div>
                                            </div>
                                            <label className="label">First Name</label>
                                            <input type="text" value={userData?.firstName ?? ''} required name="firstName" onChange={changeInput} className="input w-full" placeholder="First Name" />
                                            <label className="label">Last Name</label>
                                            <input type="text" value={userData?.lastName ?? ''} required name="lastName" onChange={changeInput} className="input w-full" placeholder="Last Name" />
                                        </> : null
                                    }
                                    <label className="label">Email</label>
                                    <input type="email" required value={userData?.emailId ?? ''} name="emailId" onChange={changeInput} className="input w-full" placeholder="Email" />
                                    <label className="label">Password</label>
                                    <input type="password" required name='password' value={userData?.password ?? ''} onChange={changeInput} className="input w-full" placeholder="Password" />
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