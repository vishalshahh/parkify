import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@parkify/ui/src/app/globals.css'
import { ApolloProvider } from '@parkify/network/src/config/apollo'
import { SessionProvider } from '@parkify/ui/src/components/molecules/SessionProvider'
import { Header } from '@parkify/ui/src/components/organisms/Header'
import { ToastContainer } from '@parkify/ui/src/components/molecules/Toast'
import { MenuItem } from '@parkify/util/types'
import { Container } from '@parkify/ui/src/components/atoms/Container'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Parkify',
  description: 'A Smart Parking App',
}

const MENUITEMS: MenuItem[] = [
  { label: 'Search', href: '/search' },
  { label: 'Bookings', href: '/bookings' },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <ApolloProvider>
          <body className={`${inter.className} bg-gray-25`}>
            <Header menuItems={MENUITEMS} />
            <Container>{children}</Container>
            <ToastContainer />
          </body>
        </ApolloProvider>
      </SessionProvider>
    </html>
  )
}
