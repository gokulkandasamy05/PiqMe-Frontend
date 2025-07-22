import React from 'react'

type User = {
    firstName: string
    lastName: string
    image: string,
    about: string,
    age: string,
    gender: string,
}

type Props = {
    user: User
}

const UserCard: React.FC<Props> = ({ user }) => {
    return (
        <div className='text-black mt-5 md:mt-0 md:w-1/2 flex items-center justify-center'>
            <div className="card bg-base-100 w-96 shadow-sm border">
                <figure>
                    {!!user?.image && <img
                        src={user?.image}
                        alt="profile" loading='lazy' />}
                </figure>
                <div className="card-body text-white">
                    <h2 className="card-title">{user?.firstName + ' ' + (user?.lastName ?? '')}</h2>
                    <p>{user?.age} | {user?.gender}</p>
                    <p>{user?.about}</p>
                </div>

                <div className="flex gap-4 w-full justify-center mb-5">
                    {/* Approve Button */}
                    <button
                        className="btn btn-circle btn-success shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-110"
                        aria-label="Approve"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </button>

                    {/* Reject Button */}
                    <button
                        className="btn btn-circle btn-error shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-110"
                        aria-label="Reject"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserCard