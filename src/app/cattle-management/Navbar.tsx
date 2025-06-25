
import logo from '@/assets/gramathupaal-logo.png'
import userImage from '@/assets/userImage.png'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between md:px-6 px-6 shadow-sm bg-white py-2'>
        <div>
        <Image src={logo} alt="logo" className='w-[180px] h-auto' priority/>
        </div>
        <div className='flex gap-3 items-center'>
            <Image src={userImage} alt="user" className='w-[28px] h-auto'/>
        </div>
    </div>
  )
}

export default Navbar