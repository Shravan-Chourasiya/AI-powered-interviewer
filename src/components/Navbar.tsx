'use client'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'


function Navbar() {
  const isSessionActive = useSession()


  return (
    <>
      <nav className='sticky top-0 z-50 h-16 w-full flex justify-between items-center bg-card/95 backdrop-blur-md border-b border-border px-8 shadow-sm'>
        {/* Logo */}
        <div className='text-3xl'>
          <Link href={'/'} className='font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300'>
            SyntheView
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className='flex items-center space-x-1'>
          <Link href='/about' className='px-3 py-2 text-muted-foreground hover:text-purple-400 hover:bg-accent rounded-lg font-medium'>
            About
          </Link>
          <Link href='/faqs' className='px-3 py-2 text-muted-foreground hover:text-purple-400 hover:bg-accent rounded-lg font-medium'>
            FAQs
          </Link>
          <Link href='/contact' className='px-3 py-2 text-muted-foreground hover:text-purple-400 hover:bg-accent rounded-lg font-medium'>
            Contact
          </Link>
          <Link href='/termsandpolicy' className='px-3 py-2 text-muted-foreground hover:text-purple-400 hover:bg-accent rounded-lg font-medium'>
            Terms
          </Link>

          {isSessionActive.status === 'authenticated' ? (
            <>
              <Link href='/dashboard' className='px-3 py-2 text-muted-foreground hover:text-purple-400 hover:bg-accent rounded-lg font-medium ml-2'>
                Dashboard
              </Link>
              <Button 
                onClick={() => signOut()} 
                className='px-4 py-2 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg ml-2'
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href='/sign-up' className='px-3 py-2 text-muted-foreground hover:text-purple-400 hover:bg-accent rounded-lg font-medium ml-2'>
                Sign Up
              </Link>
              <Link href='/sign-in' className='px-4 py-2 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg ml-2'>
                Sign In
              </Link>
            </>
          )}
        </div>


      </nav>


    </>
  )
}

export default Navbar
