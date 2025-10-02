'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Send, CheckCircle } from 'lucide-react'

function Footer() {
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
    <footer className='bg-gray-900 border-t border-gray-800'>
      <div className='flex flex-col lg:flex-row justify-between items-start gap-8 p-6 lg:p-8 max-w-6xl mx-auto'>
        <div className='flex flex-col sm:flex-row justify-start items-start gap-8 w-full lg:w-2/3'>
          <div className='w-full sm:w-1/2'>
            <h2 className='text-xl font-semibold text-white mb-4 bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text '>Popular Categories</h2>
            <ul className='space-y-2 text-gray-300'>
              <li><Link href='/interview/CreateInterview?field=DSA' className='hover:text-purple-400 transition-colors duration-200 cursor-pointer'>DSA</Link></li>
              <li><Link href='/interview/CreateInterview?field=AI/ML' className='hover:text-purple-400 transition-colors duration-200 cursor-pointer'>AI/ML</Link></li>
              <li><Link href='/interview/CreateInterview?field=Full Stack' className='hover:text-purple-400 transition-colors duration-200 cursor-pointer'>Full Stack</Link></li>
              <li><Link href='/interview/CreateInterview?field=Data Science' className='hover:text-purple-400 transition-colors duration-200 cursor-pointer'>Data Science</Link></li>
              <li><Link href='/interview/CreateInterview?field=Java Developer' className='hover:text-purple-400 transition-colors duration-200 cursor-pointer'>Java Developer</Link></li>
              <li><Link href='/interview/CreateInterview?field=Frontend' className='hover:text-purple-400 transition-colors duration-200 cursor-pointer'>Frontend</Link></li>
            </ul>
          </div>
          <div className='w-full sm:w-1/2'>
            <h3 className='text-xl font-semibold text-white mb-4 bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text'>Quick Links</h3>
            <ul className='space-y-2 text-gray-300'>
              <li><Link href='/dashboard' className='hover:text-purple-400 transition-colors duration-200'>Dashboard</Link></li>
              <li><Link href='/interview/CreateInterview' className='hover:text-purple-400 transition-colors duration-200'>Start Interview</Link></li>
              <li><Link href='/contact' className='hover:text-purple-400 transition-colors duration-200'>Contact Us</Link></li>
              <li><Link href='/about' className='hover:text-purple-400 transition-colors duration-200'>About Us</Link></li>
              <li><Link href='/faqs' className='hover:text-purple-400 transition-colors duration-200'>FAQs</Link></li>
              <li><Link href='/termsandpolicy' className='hover:text-purple-400 transition-colors duration-200'>Terms & Privacy</Link></li>
            </ul>
          </div>
        </div>
        <div className='w-full lg:w-1/3 space-y-4'>
          <h3 className='text-xl font-semibold text-white mb-4 bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text'>Contact Us</h3>
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
                className='bg-gray-800/50 border-gray-700 focus:border-purple-400 text-white placeholder-gray-400' 
                placeholder='Your Email...'
                required
              />
              <textarea 
                rows={4} 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Your Message...'
                className='w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 text-white placeholder-gray-400 resize-none'
                required
              />
              <Button 
                type='submit'
                disabled={isSubmitting || !email || !message}
                className='w-full bg-gradient-to-r from-purple-500 to-teal-500 hover:scale-105 transition-all duration-300 disabled:opacity-50'
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
      <div className='text-center py-4 border-t border-gray-800 text-gray-400'>
        © 2025 SyntheView AI. All rights reserved. <Link href='/termsandpolicy' className='text-purple-400 hover:text-teal-400 transition-colors duration-200'>Privacy Policy</Link> | <Link href='/termsandpolicy' className='text-purple-400 hover:text-teal-400 transition-colors duration-200'>Terms of Service</Link>
      </div>
    </footer>
  )
}

export default Footer
