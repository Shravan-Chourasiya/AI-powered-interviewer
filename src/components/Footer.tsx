'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Send, CheckCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'

function Footer() {
  const { data: session } = useSession()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !message) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'Footer',
          lastName: 'Contact',
          email,
          subject: 'Footer Contact Form',
          message
        })
      })
      
      if (response.ok) {
        setIsSubmitted(true)
        setEmail('')
        setMessage('')
        setTimeout(() => setIsSubmitted(false), 3000)
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
    
    setIsSubmitting(false)
  }
  return (
    <footer className='bg-slate-50 dark:bg-gray-900 border-t border-slate-200 dark:border-gray-800'>
      <div className='flex flex-col lg:flex-row justify-between items-start gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto'>
        <div className='flex flex-col sm:flex-row justify-start items-start gap-6 sm:gap-8 w-full lg:w-2/3'>
          <div className='w-full sm:w-1/2'>
            <h2 className='text-lg sm:text-xl font-semibold text-slate-800 dark:text-white mb-3 sm:mb-4 bg-gradient-to-r from-purple-600 dark:from-purple-400 to-teal-600 dark:to-teal-400 bg-clip-text text-transparent'>Popular Categories</h2>
            <ul className='space-y-2 text-slate-600 dark:text-gray-300'>
              <li><Link href='/interview/CreateInterview?field=DSA' className='block py-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 cursor-pointer touch-manipulation'>DSA</Link></li>
              <li><Link href='/interview/CreateInterview?field=AI/ML' className='block py-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 cursor-pointer touch-manipulation'>AI/ML</Link></li>
              <li><Link href='/interview/CreateInterview?field=Full Stack' className='block py-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 cursor-pointer touch-manipulation'>Full Stack</Link></li>
              <li><Link href='/interview/CreateInterview?field=Data Science' className='block py-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 cursor-pointer touch-manipulation'>Data Science</Link></li>
              <li><Link href='/interview/CreateInterview?field=Java Developer' className='block py-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 cursor-pointer touch-manipulation'>Java Developer</Link></li>
              <li><Link href='/interview/CreateInterview?field=Frontend' className='block py-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 cursor-pointer touch-manipulation'>Frontend</Link></li>
            </ul>
          </div>
          <div className='w-full sm:w-1/2'>
            <h3 className='text-lg sm:text-xl font-semibold text-slate-800 dark:text-white mb-3 sm:mb-4 bg-gradient-to-r from-purple-600 dark:from-purple-400 to-teal-600 dark:to-teal-400 bg-clip-text text-transparent'>Quick Links</h3>
            <ul className='space-y-2 text-slate-600 dark:text-gray-300'>
              {session && <li><Link href='/dashboard' className='block py-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 touch-manipulation'>Dashboard</Link></li>}
              {session && <li><Link href='/interview/CreateInterview' className='block py-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 touch-manipulation'>Start Interview</Link></li>}
              <li><Link href='/contact' className='block py-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 touch-manipulation'>Contact Us</Link></li>
              <li><Link href='/about' className='block py-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 touch-manipulation'>About Us</Link></li>
              <li><Link href='/faqs' className='block py-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 touch-manipulation'>FAQs</Link></li>
              <li><Link href='/termsandpolicy' className='block py-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 touch-manipulation'>Terms & Privacy</Link></li>
            </ul>
          </div>
        </div>
        <div className='w-full lg:w-1/3 space-y-4'>
          <h3 className='text-lg sm:text-xl font-semibold text-slate-800 dark:text-white mb-3 sm:mb-4 bg-gradient-to-r from-purple-600 dark:from-purple-400 to-teal-600 dark:to-teal-400 bg-clip-text text-transparent'>Contact Us</h3>
          {isSubmitted ? (
            <div className='text-center py-4'>
              <CheckCircle className='w-8 h-8 text-green-400 mx-auto mb-2' />
              <p className='text-green-400 text-sm'>Message sent successfully!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-4'>
              <Input 
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='bg-white dark:bg-gray-800/50 border-slate-300 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-400/20 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-400 h-12 text-base' 
                placeholder='Your Email...'
                required
              />
              <textarea 
                rows={4} 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Your Message...'
                className='w-full p-3 bg-white dark:bg-gray-800/50 border border-slate-300 dark:border-gray-700 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-400/20 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-400 resize-none text-base min-h-[100px]'
                required
              />
              <Button 
                type='submit'
                disabled={isSubmitting || !email || !message}
                className='w-full h-12 bg-gradient-to-r from-purple-500 to-teal-500 hover:scale-105 transition-all duration-300 disabled:opacity-50 touch-manipulation text-base font-semibold'
              >
                {isSubmitting ? (
                  <>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2' />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className='w-4 h-4 mr-2' />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
      <div className='text-center py-4 px-4 border-t border-slate-200 dark:border-gray-800 text-slate-600 dark:text-gray-400 text-sm'>
        <p className='mb-2'>© 2025 SyntheView AI. All rights reserved.</p>
        <div className='flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4'>
          <Link href='/termsandpolicy' className='text-purple-400 hover:text-teal-400 transition-colors duration-200 touch-manipulation py-1'>Privacy Policy</Link>
          <span className='hidden sm:inline'>|</span>
          <Link href='/termsandpolicy' className='text-purple-400 hover:text-teal-400 transition-colors duration-200 touch-manipulation py-1'>Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
