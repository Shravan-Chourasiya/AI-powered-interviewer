'use client'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { Sun, Moon, Menu, X } from 'lucide-react'

function Navbar() {
  const isSessionActive = useSession()
  const { theme, setTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav className='sticky top-0 z-50 h-16 w-full flex justify-between items-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-slate-200 dark:border-gray-800 px-4 sm:px-6 lg:px-8 shadow-sm theme-transition'>
        {/* Logo */}
        <div className='text-xl sm:text-2xl lg:text-3xl'>
          <Link href={'/'} className='font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300'>
            SyntheView
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden lg:flex items-center space-x-1'>
          <Link href='/about' className='px-3 py-2 text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-slate-800 rounded-lg theme-transition text-sm font-medium'>
            About
          </Link>
          <Link href='/faqs' className='px-3 py-2 text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-slate-800 rounded-lg theme-transition text-sm font-medium'>
            FAQs
          </Link>
          <Link href='/contact' className='px-3 py-2 text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-slate-800 rounded-lg theme-transition text-sm font-medium'>
            Contact
          </Link>
          <Link href='/termsandpolicy' className='px-3 py-2 text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-slate-800 rounded-lg theme-transition text-sm font-medium'>
            Terms
          </Link>
          
          <button 
            onClick={toggleTheme}
            className='p-2 rounded-lg bg-slate-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-gray-700 hover:scale-105 shadow-sm theme-transition ml-2'
          >
            {theme === 'dark' ? (
              <Sun className='w-5 h-5 text-yellow-500' />
            ) : (
              <Moon className='w-5 h-5 text-slate-600' />
            )}
          </button>

          {isSessionActive.status === 'authenticated' ? (
            <>
              <Link href='/dashboard' className='px-3 py-2 text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-slate-800 rounded-lg theme-transition text-sm font-medium ml-2'>
                Dashboard
              </Link>
              <Button 
                onClick={() => signOut()} 
                className='px-4 py-2 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg text-sm ml-2'
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href='/sign-up' className='px-3 py-2 text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-slate-800 rounded-lg theme-transition text-sm font-medium ml-2'>
                Sign Up
              </Link>
              <Link href='/sign-in' className='px-4 py-2 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg text-sm ml-2'>
                Sign In
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className='flex items-center space-x-2 lg:hidden'>
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
          <button
            onClick={toggleMobileMenu}
            className='p-2 rounded-lg bg-slate-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-gray-700 hover:scale-105 shadow-sm theme-transition'
          >
            {isMobileMenuOpen ? (
              <X className='w-6 h-6 text-slate-600 dark:text-gray-300' />
            ) : (
              <Menu className='w-6 h-6 text-slate-600 dark:text-gray-300' />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className='fixed inset-0 z-40 lg:hidden'>
          <div className='fixed inset-0 bg-black/20 backdrop-blur-sm' onClick={closeMobileMenu} />
          <div className='fixed top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-800 shadow-xl'>
            <div className='px-4 py-6 space-y-1'>
              <Link 
                href='/about' 
                onClick={closeMobileMenu}
                className='block px-4 py-3 text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-slate-800 rounded-lg theme-transition font-medium text-base'
              >
                About
              </Link>
              <Link 
                href='/faqs' 
                onClick={closeMobileMenu}
                className='block px-4 py-3 text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-slate-800 rounded-lg theme-transition font-medium text-base'
              >
                FAQs
              </Link>
              <Link 
                href='/contact' 
                onClick={closeMobileMenu}
                className='block px-4 py-3 text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-slate-800 rounded-lg theme-transition font-medium text-base'
              >
                Contact
              </Link>
              <Link 
                href='/termsandpolicy' 
                onClick={closeMobileMenu}
                className='block px-4 py-3 text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-slate-800 rounded-lg theme-transition font-medium text-base'
              >
                Terms
              </Link>
              
              {isSessionActive.status === 'authenticated' ? (
                <>
                  <Link 
                    href='/dashboard' 
                    onClick={closeMobileMenu}
                    className='block px-4 py-3 text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-slate-800 rounded-lg theme-transition font-medium text-base'
                  >
                    Dashboard
                  </Link>
                  <div className='px-4 py-2'>
                    <Button 
                      onClick={() => {
                        signOut()
                        closeMobileMenu()
                      }} 
                      className='w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg text-base'
                    >
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    href='/sign-up' 
                    onClick={closeMobileMenu}
                    className='block px-4 py-3 text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-slate-800 rounded-lg theme-transition font-medium text-base'
                  >
                    Sign Up
                  </Link>
                  <div className='px-4 py-2'>
                    <Link 
                      href='/sign-in' 
                      onClick={closeMobileMenu}
                      className='block w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg text-center text-base'
                    >
                      Sign In
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
