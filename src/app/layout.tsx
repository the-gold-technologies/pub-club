import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/providers/LenisProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Seven Stars | Countryside Gastro Club Pub',
  description: 'Experience luxury dining, elegant ambience, and unforgettable events at Seven Stars Gastro Club Pub.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased text-black bg-white`}>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
