import { logout } from '@/utils/common';
import { clearUser } from '@/utils/userSlice';
import React from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const ApproveRejectButton = ({ getData, row }: { getData?: () => void, row?: { _id: string, fromUserId: { _id: string, firstName: string, lastName: string, about: string, age: string, gender: string, image: { destination: string | null, filename: string | null } }, toUserId: { firstName: string, lastName: string, about: string, age: string, gender: string, image: { destination: string | null, filename: string | null } } } }) => {
    const dispatch = useDispatch()
    const acceptOrReject = async (status: string) => {
        const id = row?._id
        try {
            const res = await fetch('https://piqme.live/api' + `/request/review/${status}/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })
            const data = await res.json()
            if (data?.status) {
                toast.success(data?.message)
                if (!!getData) {
                    getData()
                }

                // dispatch(setLoader(false))
            } else {
                if (data?.logout) {
                    dispatch(clearUser())
                    logout()
                }
                toast.error(data?.message)
            }
        } catch (err) {
            console.log(err)
            // dispatch(setLoader(false))
        }
    }

    return (
        <>
            <button
                className="btn btn-circle btn-success shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-110"
                aria-label="Approve"
                onClick={() => acceptOrReject('accepted')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </button>
            <button
                className="btn btn-circle btn-error shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-110"
                aria-label="Reject"
                onClick={() => acceptOrReject('rejected')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </>
    )
}

export default ApproveRejectButton