'use client'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Whitepaper() {
return (
<main className="relative min-h-screen">
<Header />
<div className="pt-32 pb-16">
<div className="container mx-auto px-6 max-w-4xl">
<motion.div
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
>
<h1 className="text-4xl font-bold mb-8 quantum-text-gradient">Quantum Token Whitepaper</h1>
<div className="quantum-card">
<div className="prose prose-invert max-w-none">
<h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
<p className="text-gray-300 mb-6">
Our comprehensive whitepaper detailing the quantum mechanics behind our revolutionary tokenomics is currently being finalized.
</p>
<p className="text-gray-300 mb-6">
It will include detailed explanations of our quantum entanglement protocols, cross-chain innovation, and the scientific principles that power our ecosystem.
</p>
<div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
<p className="text-blue-300 font-semibold">
📄 The whitepaper will be available before our token launch. Join our community to be notified when it$apos;s released!
</p>
</div>
</div>
</div>
</motion.div>
</div>
</div>
<Footer />
</main>
)
}