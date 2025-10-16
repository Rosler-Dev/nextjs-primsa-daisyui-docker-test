import type { Metadata } from 'next'
import Navbar from '@components/navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'NextJS, Primsa, DaisyUI, Docker Test',
  description: 'an application for Searching and Favouriting Universities!'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <Navbar />
        <div className="m-2">{children}</div>
      </body>
    </html>
  )
}
