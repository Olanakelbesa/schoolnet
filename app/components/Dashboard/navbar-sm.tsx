'use client'

import { Menu } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import MobileSidebar from './mobilesidebar'

function NavbarSm() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <div className='md:hidden flex justify-between px-6 py-4 bg-[#efeeff]'>
        <Menu
          className='text-[#614B7D] hover:text-[#563a7a] cursor-pointer'
          onClick={() => setIsSidebarOpen(true)}
        />
        <Image src={"/profilepic-rm.png"} alt='profile pic' width={30} height={30} />
      </div>
      
      {isSidebarOpen && (
        <MobileSidebar onClose={() => setIsSidebarOpen(false)} />
      )}
    </>
  )
}

export default NavbarSm
