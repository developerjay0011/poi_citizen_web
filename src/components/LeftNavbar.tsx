import { CusLink } from '@/utils/CusLink'
import { FC, ReactNode } from 'react'
import { FaBell, FaClipboard, FaUser } from 'react-icons/fa'
import { BiSolidMessageSquareError } from 'react-icons/bi'
import { FaHandshakeAngle } from 'react-icons/fa6'
import { HiLightBulb } from 'react-icons/hi'
import { FiEdit } from 'react-icons/fi'

export const LeftNavbar: FC = () => {
  return (
    <>
      <section className='py-8 px-3 bg-white flex flex-col shadow_left gap-5 h-full max-[1000px]:hidden'>
        <LeftNavLink link={`/user`} info='feed'>
          <FaClipboard />
        </LeftNavLink>

        <LeftNavLink link={`/user/profile`} info='my profile'>
          <FaUser />
        </LeftNavLink>

        {/* <LeftNavLink link={`/user/profile/notifications`} info='notifications'>
          <FaBell />
        </LeftNavLink> */}

        <LeftNavLink link={`/user/profile/complaints`} info='complaints'>
          <BiSolidMessageSquareError />
        </LeftNavLink>

        <LeftNavLink link={`/user/profile/requests`} info='requests'>
          <FiEdit />
        </LeftNavLink>

        <LeftNavLink link={`/user/profile/contributions`} info='contributions'>
          <FaHandshakeAngle />
        </LeftNavLink>

        <LeftNavLink link={`/user/profile/suggestions`} info='suggestions'>
          <HiLightBulb />
        </LeftNavLink>
      </section>
    </>
  )
}

const LeftNavLink: FC<{ children: ReactNode; link: string; info: string }> = ({
  children,
  link,
  info,
}) => (
  <CusLink
    activeLinkClasses='bg-sky-950 text-sky-50'
    normalClasses='text-sky-950 bg-sky-100'
    href={link}
    className='rounded-full w-12 aspect-square flex items-center justify-center text-2xl relative cus_link'>
    {children}

    <span className='hover_text z-[120]'>
      <span className='triangle' />
      {info}
    </span>
  </CusLink>
)
