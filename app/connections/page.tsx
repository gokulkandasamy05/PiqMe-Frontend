'use client'
import React, { useState } from 'react'
import Requests from './Requests'

const Page = () => {
  const [tab, setTab] = useState<'requests' | 'connections'>('requests')

  return (
    <div className="min-h-screen flex justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md border border-gray-200">
        {/* Tabs Header */}
        <div className="flex border-b border-gray-200">
          <TabButton
            isActive={tab === 'requests'}
            onClick={() => setTab('requests')}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
              </svg>
            }
            label="Requests"
          />
          <TabButton
            isActive={tab === 'connections'}
            onClick={() => setTab('connections')}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
              </svg>
            }
            label="Connections"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {tab === 'requests' && <Requests name="requests" />}
          {tab === 'connections' && <Requests name="connections" />}
        </div>
      </div>
    </div>
  )
}

const TabButton = ({
  isActive,
  onClick,
  icon,
  label
}: {
  isActive: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) => {
  return (
    <button
      className={`flex items-center w-1/2 justify-center px-4 py-3 text-sm font-medium transition-colors ${
        isActive
          ? 'border-b-2 border-pink-600 text-pink-600 bg-pink-50'
          : 'text-gray-500 hover:text-pink-600'
      }`}
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
    >
      {icon}
      {label}
    </button>
  )
}

export default Page
