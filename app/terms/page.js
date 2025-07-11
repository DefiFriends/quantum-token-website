'use client'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function TermsOfService() {
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
<h1 className="text-4xl font-bold mb-8 quantum-text-gradient">Terms of Service</h1>
<div className="quantum-card">
<div className="prose prose-invert max-w-none">
<p className="text-gray-300 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

<h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
<p className="text-gray-300 mb-6">
By accessing and using the Quantum Token (QTM) website and services, you accept and agree to be bound by the terms and provision of this agreement.
</p>

<h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
<p className="text-gray-300 mb-6">
Permission is granted to temporarily download one copy of the materials on Quantum Token's website for personal, non-commercial transitory viewing only.
</p>

<h2 className="text-2xl font-bold text-white mb-4">3. Disclaimer</h2>
<div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 mb-6">
<p className="text-yellow-300 font-semibold mb-2">⚠️ IMPORTANT FINANCIAL DISCLAIMER:</p>
<ul className="text-yellow-200 space-y-2">
<li>• Cryptocurrency investments carry significant risk</li>
<li>• Past performance does not guarantee future results</li>
<li>• You may lose some or all of your investment</li>
<li>• This is not financial advice - always DYOR (Do Your Own Research)</li>
<li>• Consult with a financial advisor before investing</li>
</ul>
</div>

<h2 className="text-2xl font-bold text-white mb-4">4. Limitations</h2>
<p className="text-gray-300 mb-6">
In no event shall Quantum Token or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Quantum Token's website.
</p>

<h2 className="text-2xl font-bold text-white mb-4">5. Governing Law</h2>
<p className="text-gray-300 mb-6">
These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction] and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
</p>

<h2 className="text-2xl font-bold text-white mb-4">6. Contact Information</h2>
<p className="text-gray-300">
If you have any questions about these Terms of Service, please contact us at: legal@qtmtoken.com
</p>
</div>
</div>
</motion.div>
</div>
</div>
<Footer />
</main>
)
}