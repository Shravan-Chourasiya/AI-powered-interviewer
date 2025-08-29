import Link from 'next/link'
import React from 'react'


function Navbar() {
  return (
    <div className='h-[10vh] w-full flex justify-between items-center supabase-gradient-light text-gray-900 font-[worksans] font-normal' >
      <div className='ml-24 text-4xl'>
        <Link href={'/'}>SytheView</Link>
      </div>
       
      <div className='mr-32 flex justify-around items-center space-x-4 gap-7'>
        <Link href='/sign-up'><p className='text-xl hover:underline' >Sign In </p></Link>
        <Link href='/sign-in'><p className='text-xl hover:underline' >Log In</p>  </Link>
      </div>
    </div>
  )
}

export default Navbar
