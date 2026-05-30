import './globals.css'
import { Inter, Orbitron } from 'next/font/google'
import QuantumParticles from './components/QuantumParticles'
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from './components/ThemeProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })

export const metadata = {
  metadataBase: new URL('https://qtmtoken.com'),
  
  title: 'Quantum Token QTM - First Quantum DeFi Protocol',
  description: 'Real quantum mechanics in DeFi. Probabilistic staking, cross-chain entanglement, non-inflationary rewards.',
  keywords: 'Quantum Token, QTM, DeFi, Quantum Physics, Staking, Crypto, Blockchain, PARADOX, Quantum Entanglement',
  authors: [{ name: 'Quantum Token Team' }],
  creator: 'Quantum Token',
  publisher: 'Quantum Token',

  // Open Graph - works for Telegram, Discord, WhatsApp, Facebook
  openGraph: {
    title: 'Quantum Token QTM - First Quantum DeFi Protocol',
    description: 'Real quantum mechanics in DeFi. Probabilistic staking, cross-chain entanglement, non-inflationary rewards.⚛️',
    url: 'https://qtmtoken.com',
    siteName: 'Quantum Token',
    images: [
      {
        url: '/og-image.png',
        width: 1730,
        height: 909,
        alt: "Quantum Token (QTM) - Where Quantum Physics Meets DeFi",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // Twitter/X Card
  twitter: {
    card: 'summary_large_image',
    title: 'Quantum Token QTM - First Quantum DeFi Protocol',
    description: 'Real quantum mechanics in DeFi. Probabilistic staking, cross-chain entanglement, non-inflationary rewards.',
    site: '@QuantumDefiQTM',
    creator: '@QuantumDefiQTM',
    images: ['/og-image.png'],
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="font-inter">
        <ThemeProvider>
          <QuantumParticles />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}