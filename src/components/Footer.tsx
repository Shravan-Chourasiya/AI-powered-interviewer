import Link from 'next/link'
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

function Footer() {
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
            </ul>
          </div>
        </div>
        <div className='w-full lg:w-1/3 space-y-4'>
          <h3 className='text-xl font-semibold text-white mb-4 bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text '>Contact Us</h3>
          <Input className='bg-gray-800/50 border-gray-700 focus:border-purple-400 text-white placeholder-gray-400' placeholder='Your Email...'/>
          <textarea 
            rows={4} 
            placeholder='Your Message...'
            className='w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 text-white placeholder-gray-400 resize-none'
          />
          <Button className='w-full bg-gradient-to-r from-purple-500 to-teal-500 hover:scale-105 transition-all duration-300'>Send Message</Button>
        </div>
      </div>
      <div className='text-center py-4 border-t border-gray-800 text-gray-400'>
        © 2025 SyntheView AI. All rights reserved. <Link href='/termsandpolicy' className='text-purple-400 hover:text-teal-400 transition-colors duration-200'>Privacy Policy</Link> | <Link href='/termsandpolicy' className='text-purple-400 hover:text-teal-400 transition-colors duration-200'>Terms of Service</Link>
      </div>
    </footer>
  )
}

export default Footer
