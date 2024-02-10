'use client'
import { FC } from 'react'
import { CusLink } from './CusLink'

export const ShortcutBtn: FC<{
  Icon: JSX.ElementType
  title: string
  route: string
}> = ({ Icon, title, route }) => (
  <CusLink
    normalClasses='text-sky-950'
    className='flex items-center gap-4 hover:text-orange-600 transition-all'
    href={route}
    activeLinkClasses='text-orange-600'>
    <Icon />
    <span className='capitalize'>{title}</span>
  </CusLink>
)
