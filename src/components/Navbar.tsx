'use client'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'

function Navbar() {
  const isSessionActive=useSession()
  return (
    <div className='h-[10vh] w-full flex justify-between items-center bg-gray-900 border-b border-gray-800 px-6 sm:px-24'>
      <div className='text-2xl sm:text-4xl'>
        <Link href={'/'} className='font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300'>
          SyntheView
        </Link>
      </div>
      <div className='flex items-center space-x-4 sm:space-x-8'>
        {isSessionActive.status === 'authenticated' ? (
          <>
            <Link href='/homepage' className='px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 hover:underline'>
              Dashboard
            </Link>
            <Button 
              onClick={() => signOut()} 
              className='px-6 py-2 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg'
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href='/sign-up' className='px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 hover:underline'>
              Sign Up
            </Link>
            <Link href='/sign-in' className='px-6 py-2 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg'>
              Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
