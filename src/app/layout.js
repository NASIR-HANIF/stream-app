import { Inter } from 'next/font/google'
import 'material-icons/iconfont/material-icons.css';
import 'font-awesome/css/font-awesome.min.css'
import './globals.css'
import AuthProvider from '../../Components/AuthProvider/AuthProvider';
import Loading from './loading';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <AuthProvider>
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
        </AuthProvider>
      </body>
    </html>
  )
}
