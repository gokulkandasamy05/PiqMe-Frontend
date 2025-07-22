'use client'
import { defaultImage } from '@/utils/common'
import React, { useRef } from 'react'
import { FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'

const customUpload = ({ acceptableMimeTypes, image, onChange, name }: { acceptableMimeTypes: string, image?: string | undefined | null, onChange: Function, name: string }) => {

    const inputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target?.files?.length) {
            const file = e.target.files[0]
            if (!acceptableMimeTypes.includes(file?.type)) {
                toast.error(`Invalid file format`)
                return
            }
            
            const reader = new FileReader()
            reader.onerror = () => console.error('File reading has failed')
            reader.onload = () => {
                onChange({file: file, base64: reader?.result})
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="flex justify-center">
            <div className="relative group w-24 h-24 rounded-full overflow-hidden border-2">
                <img
                    src={image || defaultImage}
                    alt="avatar"
                    className="w-full h-full object-cover"
                />
                <input
                    ref={inputRef}
                    type="file"
                    name={name}
                    hidden
                    accept={acceptableMimeTypes}
                    onChange={handleFileChange}
                />
                <div
                    onClick={() => inputRef.current?.click()}
                    // onClick={() => document.querySelector(`input[name=${name}]`)?.click()}
                    className="absolute cursor-pointer inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                    <FaEdit size={20} color="white" />
                </div>
            </div>
        </div>
    )
}

export default customUpload