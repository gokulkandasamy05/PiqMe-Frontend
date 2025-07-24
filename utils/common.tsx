import { redirect } from "next/navigation";
import { persistor } from "./appStore";
import Image from '../public/defaultProfile.jpg'
export const defaultImage = Image

export const setProfileImage = (obj: { destination: string, filename: string}) => {
    return process.env.NEXT_PUBLIC_API_BASE_URL + '/' + obj?.destination + obj?.filename
}


export const logout = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    });

    const data = await res?.json()
    if (data?.status) {
        persistor.purge()
        redirect('/login')
    }
    return data?.status
}