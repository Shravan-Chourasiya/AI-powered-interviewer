'use client'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/context/ThemeProvider'
import { Sun, Moon } from 'lucide-react'

function Navbar() {
  const isSessionActive=useSession()
  const { theme, toggleTheme } = useTheme()
  return (
    <div className='h-[10vh] w-full flex justify-between items-center bg-white/95 dark:bg-gray-900 backdrop-blur-sm border-b border-slate-200 dark:border-gray-800 px-6 sm:px-24 shadow-sm theme-transition'>
      <div className='text-2xl sm:text-4xl'>
        <Link href={'/'} className='font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300'>
          SyntheView
        </Link>
      </div>
      <div className='flex items-center space-x-2 sm:space-x-6'>
        <Link href='/about' className='px-3 py-2 text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-slate-800 rounded-lg theme-transition text-sm sm:text-base'>
          About
        </Link>
        <Link href='/faqs' className='px-3 py-2 text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-slate-800 rounded-lg theme-transition text-sm sm:text-base'>
          FAQs
        </Link>
        <Link href='/contact' className='px-3 py-2 text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-slate-800 rounded-lg theme-transition text-sm sm:text-base'>
          Contact
        </Link>
        <Link href='/termsandpolicy' className='px-3 py-2 text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-slate-800 rounded-lg theme-transition text-sm sm:text-base'>
          Terms
        </Link>
        <button 
          onClick={toggleTheme}
          className='p-2 rounded-lg bg-slate-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-gray-700 hover:scale-105 shadow-sm theme-transition'
        >
          {theme === 'dark' ? (
            <Sun className='w-5 h-5 text-yellow-500' />
          ) : (
            <Moon className='w-5 h-5 text-slate-600' />
          )}
        </button>
        {isSessionActive.status === 'authenticated' ? (
          <>
            <Link href='/dashboard' className='px-3 py-2 text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-slate-800 rounded-lg theme-transition text-sm sm:text-base'>
              Dashboard
            </Link>
            <Button 
              onClick={() => signOut()} 
              className='px-4 py-2 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base'
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href='/sign-up' className='px-3 py-2 text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-slate-800 rounded-lg theme-transition text-sm sm:text-base'>
              Sign Up
            </Link>
            <Link href='/sign-in' className='px-4 py-2 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base'>
              Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
