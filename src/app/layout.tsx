import './globals.scss'
import type { Metadata } from 'next'
import { CusProvider } from '@/redux_store/CusProvider'
import { FC, ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Politician Of India | Home',
  description: 'Politician of india',
}

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {

  return (
    <html lang='en'>
      <body>
        <CusProvider>{children}</CusProvider>
      </body>
    </html>
  )
}

export default RootLayout
