import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'koras-e2e-shop',
  description: 'koras-e2e-shop application',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
