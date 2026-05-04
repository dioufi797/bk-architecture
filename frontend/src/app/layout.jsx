import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'BK-Architecture | Excellence & Prestige',
  description: 'Cabinet d\'architecture haut de gamme spécialisé dans la création d\'espaces exceptionnels. Architecture résidentielle, commerciale, design intérieur.',
  keywords: 'architecture, marocaine, luxe, résidentiel, commercial, design intérieur, Casablanca',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} dark:bg-dark-900`} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
