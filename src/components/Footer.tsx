import Link from 'next/link'
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

function Footer() {
  return (
    <footer className='bg-blue-400'>
      <div className='flex justify-between items-start gap-4 p-4'>
        <div className='flex justify-center items-start gap-4 w-2/3 h-full p-4 '>
          <div className='bg-amber-700 w-1/2 h-full ml-0'>
            <h2 className='text-xl'>Popular : </h2>
            <ul className='text-lg'>
              <li>DSA</li>
              <li>AIML</li>
              <li>Full Stack</li>
              <li>Data Science</li>
              <li>Java Developer</li>
              <li>Frontend</li>
            </ul>
          </div>
          <div className='bg-amber-500 w-1/2 h-full'>
            <h3 className='text-xl'>Quick Links:</h3>
            <ul className='text-lg'>
              <li><Link href='/dashboard'>DashBoard</Link></li>
              <li><Link href='/interviews'>Interviews</Link></li>
              <li><Link href='/contact'>Contact Us</Link></li>
              <li><Link href='/about'>About Us</Link></li>
            </ul>
          </div>
        </div>
        <div className='w-1/3 h-full'>
          <Input className='w-full p-3' placeholder='Your Email...'/>
          <textarea rows={7} placeholder='Your Message...'/>
          <Button className='w-full p-3'>Send Message</Button>
        </div>
      </div>
      <div className='text-center text-lg'>
        © 2025 Sytheview AI. All rights reserved. <Link href='/privacy'>Privacy Policy</Link> | <Link href='/termspolicy'>Terms of Service</Link>
      </div>
    </footer>
  )
}

export default Footer
