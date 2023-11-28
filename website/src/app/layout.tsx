'use client'

import { Footer } from '@tcc/components/shared/Footer'
import { Navbar } from '@tcc/components/shared/Navbar'
import { Toaster } from '@tcc/components/ui'
import { queryClient } from '@tcc/lib/react-query'
import { Roboto_Flex } from 'next/font/google'
import { QueryClientProvider } from 'react-query'

import './globals.css'

const roboto = Roboto_Flex({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="pt-BR">
        <body style={roboto.style} className="bg-zinc-900">
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </body>
      </html>
    </QueryClientProvider>
  )
}
