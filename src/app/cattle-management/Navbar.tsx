
"use client";

import logo from '@/assets/gramathupaal-logo.png';
import userImage from '@/assets/userImage.png';
import Image from 'next/image';
import menuIcon from '@/assets/menuIcon.png';
import cross from '@/assets/cross-dark.png';
import { useState } from 'react';
import SideBar from '@/app/cattle-management/SideBar';

const Navbar = () => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <div className='flex items-center justify-between md:px-6 px-6 shadow-sm bg-white py-2 z-50 relative'>
        <div className='flex items-center gap-4'>
          <Image
            src={isShow ? cross : menuIcon}
            alt='menuIcon'
            className='w-[32px] h-auto cursor-pointer lg:hidden'
            onClick={() => setIsShow(!isShow)}
          />
          <Image src={logo} alt='logo' className='w-[180px] h-auto' priority />
        </div>
        <div className='flex gap-3 items-center'>
          <Image src={userImage} alt='user' className='w-[28px] h-auto' />
        </div>
      </div>

      {/* Mobile Sidebar with Animation */}
      <div
        className={`fixed top-0 left-0 h-full w-[75%] max-w-[320px] z-40 bg-white shadow-md transition-transform duration-500 ease-in-out transform ${
          isShow ? 'translate-x-0' : '-translate-x-full'
        } lg:hidden`}
      >
        <SideBar />
      </div>
    </>
  );
};

export default Navbar;



/* "use client"

import logo from '@/assets/gramathupaal-logo.png'
import userImage from '@/assets/userImage.png'
import Image from 'next/image'
import menuIcon from '@/assets/menuIcon.png'
import { useState } from 'react'
import  SideBar  from '@/app/cattle-management/SideBar'
import cross from '@/assets/cross-dark.png'

const Navbar = () => {
  const [isShow,setIsShow]=useState(false)
  return (
    <>
    <div className='flex items-center justify-between md:px-6 px-6 shadow-sm bg-white py-2'>
        <div className='flex items-center gap-4'>
        <Image src={isShow?cross:menuIcon} alt="menuIcon" className='w-[32px] h-auto cursor-pointer lg:hidden' onClick={()=>setIsShow(!isShow)}/>
        <Image src={logo} alt="logo" className='w-[180px] h-auto' priority/>
        </div>
        <div className='flex gap-3 items-center'>
            <Image src={userImage} alt="user" className='w-[28px] h-auto'/>
        </div>
    </div>
    {isShow && <SideBar/>}

    </>
  )
}

export default Navbar */