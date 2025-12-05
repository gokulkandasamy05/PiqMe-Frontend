'use client'
import React, { useRef } from 'react'
import { toast } from 'react-toastify'
import { FaEdit } from 'react-icons/fa'
import Image from 'next/image'
import { defaultImage } from '@/utils/common.client'

type Props = {
  acceptableMimeTypes: string
  image?: string | null
  onChange: (data: { file: File, base64: string | ArrayBuffer | null }) => void
  name: string
}

const CustomUpload = ({ acceptableMimeTypes, image, onChange, name }: Props) => {
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
        if (typeof reader.result === 'string') {
          onChange({ file: file, base64: reader.result })
        } else {
          toast.error("Failed to read the file as a base64 string.")
        }
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex justify-center">
      <div className="relative group w-24 h-24 rounded-full overflow-hidden border-2">
        <Image
          src={image || defaultImage}
          alt="avatar"
          width={96}
          height={96}
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
          className="absolute cursor-pointer inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
        >
          <FaEdit size={20} color="white" />
        </div>
      </div>
    </div>
  )
}

export default CustomUpload
