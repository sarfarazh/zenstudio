import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Header() {
  return (
    <div className='p-3 px-5 flex items-center justify-between shadow-md'>
        <div>
            <h1 className=' font-bold text-xl text-gray-900'>ZenStudio</h1>
        </div>
        <div className='flex gap-3 items-center'>
            <Button>Dashboard</Button>
            <UserButton/>
        </div>
    </div>
  )
}

export default Header