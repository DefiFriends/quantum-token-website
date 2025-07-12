'use client'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Disclaimer() {
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
<h1 className="text-4xl font-bold mb-8 quantum-text-gradient">Risk Disclaimer</h1>
<div className="quantum-card">
<div className="prose prose-invert max-w-none">
<div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 mb-8">
<h2 className="text-2xl font-bold text-red-300 mb-4">⚠️ HIGH RISK INVESTMENT WARNING</h2>
<p className="text-red-200">
Trading and investing in cryptocurrencies involves substantial risk of loss and is not suitable for every investor.
The valuation of cryptocurrencies and futures may fluctuate, and, as a result, you may lose more than your original investment.
</p>
</div>

<h2 className="text-2xl font-bold text-white mb-4">Investment Risks</h2>
<ul className="text-gray-300 mb-6 space-y-2">
<li>• <strong>Volatility:</strong> Cryptocurrency prices can be extremely volatile</li>
<li>• <strong>Regulatory Risk:</strong> Changes in regulations may affect token value</li>
<li>• <strong>Technology Risk:</strong> Smart contract vulnerabilities may exist</li>
<li>• <strong>Liquidity Risk:</strong> You may not be able to sell tokens when desired</li>
<li>• <strong>Total Loss:</strong> You could lose your entire investment</li>
</ul>

<h2 className="text-2xl font-bold text-white mb-4">No Financial Advice</h2>
<p className="text-gray-300 mb-6">
Nothing on this website constitutes financial, investment, legal, or tax advice.
You should consult your own advisors before making any investment decisions.
</p>

<h2 className="text-2xl font-bold text-white mb-4">Forward-Looking Statements</h2>
<p className="text-gray-300 mb-6">
This website may contain forward-looking statements. These statements are not guarantees of future performance
and actual results may differ materially from those expressed or implied.
</p>

<div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
<p className="text-blue-300 font-semibold">
Remember: Only invest what you can afford to lose. Always do your own research (DYOR)
and never invest based on social media hype or fear of missing out (FOMO).
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