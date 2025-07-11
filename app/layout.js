import './globals.css'
import { Inter, Orbitron } from 'next/font/google'
import QuantumParticles from './components/QuantumParticles'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })

export const metadata = {
title: 'Quantum Token (QTM) - Where Physics Meets DeFi',
description: 'The first quantum-powered meme coin with real utility. Revolutionary staking mechanics powered by quantum physics principles.',
keywords: 'quantum, defi, cryptocurrency, staking, blockchain, quantum physics',
}

export default function RootLayout({ children }) {
return (
<html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
<body className="font-inter">
<QuantumParticles />
{children}
</body>
</html>
)
}