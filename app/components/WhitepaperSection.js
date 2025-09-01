'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function WhitepaperSection() {
const [activeSection, setActiveSection] = useState(0)

const whitepaperSections = [
{
title: "Executive Summary",
content: {
overview: "Quantum Token (QTM) represents a revolutionary approach to decentralized finance, combining quantum physics principles with cutting-edge blockchain technology. As the first quantum-powered meme coin, QTM introduces unprecedented staking mechanisms, cross-chain integration with our upcoming PARADOX token, and community-driven governance.",
keyPoints: [
"Total Supply: 42,424,242,424 QTM tokens",
"Multi-phase presale with up to 20% bonuses",
"Revolutionary staking with up to 24% APY",
"Quantum entanglement with PARADOX ecosystem",
"Science-backed tokenomics and development"
],
vision: "To bridge the gap between theoretical quantum physics and practical DeFi applications, creating a sustainable ecosystem that rewards scientific curiosity and community participation."
}
},
{
title: "Technology Overview",
content: {
quantumMechanics: "Our smart contract incorporates quantum mechanics principles through randomized reward multipliers, uncertainty-based bonus distributions, and entanglement mechanics that create interconnected token relationships across multiple blockchains.",
technicalFeatures: [
"Quantum uncertainty reward calculations",
"Cross-chain entanglement protocols",
"Advanced staking mechanisms with time-lock features",
"Community point system for ecosystem participation",
"Team vesting with quantum cliff mechanics"
],
innovation: "By implementing quantum-inspired algorithms in our smart contracts, we create unpredictable yet mathematically sound reward structures that mirror real quantum phenomena."
}
},
{
title: "Tokenomics",
content: {
distribution: {
"Presale (27%)": "11,515,151,515 QTM - Multi-phase presale with increasing prices",
"Liquidity (25%)": "10,606,060,606 QTM - DEX liquidity provision",
"Team (15%)": "6,363,636,364 QTM - 2-year vesting with 6-month cliff",
"CCReserve (5%)": "2,121,212,121 QTM - Cross Chain and Bridge Liquidity fuel",
"Community (10%)": "4,242,424,242 QTM - Staking rewards and community incentives",
"Development (10%)": "4,242,424,242 QTM - Continued platform development",
"Marketing (5%)": "2,121,212,121 QTM - Marketing and partnerships",
"Reserve (3%)": "1,212,121,212 QTM - Emergency fund and future development"
},
mechanisms: [
"Deflationary burning mechanism",
"Staking rewards from community allocation",
"Cross-chain bridge fees revenue sharing",
"Quantum uncertainty bonus distributions"
]
}
},
{
title: "Presale Structure",
content: {
phases: [
{
name: "Quantum Pioneers",
allocation: "1,919,191,919 QTM",
price: "0.000001 ETH",
bonus: "20%",
requirements: "Whitelist only",
minMax: "0.005-5 ETH"
},
{
name: "Probability Wave",
allocation: "3,838,383,838 QTM",
price: "0.0000015 ETH",
bonus: "10%",
requirements: "Whitelist only",
minMax: "0.01-3 ETH"
},
{
name: "Observer Effect",
allocation: "5,757,575,758 QTM",
price: "0.000002 ETH",
bonus: "5%",
requirements: "Public sale",
minMax: "0.01-3 ETH"
}
],
benefits: [
"Early supporter bonuses up to 20%",
"Quantum uncertainty bonus multipliers",
"Priority access to PARADOX presale",
"Community points for governance participation"
]
}
},
{
title: "Staking Mechanism",
content: {
overview: "Our quantum-inspired staking system offers multiple lock periods with increasing rewards, incorporating uncertainty principles that can boost returns by up to 10% through quantum randomness.",
tiers: [
{ duration: "30 days", apy: "12%", multiplier: "1.0x" },
{ duration: "90 days", apy: "15%", multiplier: "1.25x" },
{ duration: "180 days", apy: "18%", multiplier: "1.5x" },
{ duration: "365 days", apy: "24%", multiplier: "2.0x" }
],
features: [
"Quantum uncertainty bonus (up to 10% extra)",
"Early supporter additional 20% bonus",
"Flexible unstaking after lock period",
"Community points accumulation",
"Cross-chain staking compatibility"
]
}
},
{
title: "PARADOX Integration",
content: {
concept: "Quantum entanglement between QTM and our upcoming PARADOX token creates a unique cross-chain ecosystem where holders can multiply their rewards through strategic token locking.",
mechanics: [
"Lock QTM tokens to mint equivalent PARADOX",
"150% reward multiplier for entangled tokens",
"Cross-chain yield farming opportunities",
"Shared governance between ecosystems",
"Quantum bridge technology for seamless transfers"
],
benefits: "Entangled token holders receive enhanced rewards from both ecosystems, creating a symbiotic relationship that increases utility and value for both tokens."
}
},
{
title: "Roadmap",
content: {
phases: [
{
quarter: "Q3 2025",
milestones: [
"Smart contract deployment and audit",
"Presale launch and community building",
"DEX listing and liquidity provision",
"Staking platform launch"
]
},
{
quarter: "Q4 2025",
milestones: [
"PARADOX token development",
"Cross-chain bridge implementation",
"Quantum entanglement feature launch",
"Partnership announcements"
]
},
{
quarter: "Q1 2026",
milestones: [
"PARADOX token launch",
"Cross-chain yield farming",
"Mobile app development",
"Advanced DeFi features"
]
},
{
quarter: "Q2 2026",
milestones: [
"Quantum governance implementation",
"Scientific research partnerships",
"Educational platform launch",
"Global expansion initiatives"
]
}
]
}
},
{
title: "Team & Legal",
content: {
team:  "Our team consists of two (for now ) @Mystery Technical Engineer and co-founder(will be revealed after launch of PDX Token) who is blockchain developer, quantum physics researcher, DeFi expert and much more and me Andrej@Admin co-founder and CEO committed to build a sustainable and innovative ecosystem.",
advisors: "Scientific advisor and co-founder provide guidance on quantum mechanics implementation and ensure our technology remains cutting-edge.",
legal: [
"Comprehensive legal review of all smart contracts",
"Compliance with applicable regulations",
"Regular security audits and updates",
"Transparent development and governance processes"
],
disclaimer: "QTM tokens are utility tokens designed for ecosystem participation. This document does not constitute investment advice. Please conduct your own research and consult with financial advisors before making investment decisions."
}
}
]

const downloadWhitepaper = () => {
// Create a more detailed PDF-ready content
const pdfContent = `
QUANTUM TOKEN (QTM) WHITEPAPER

${whitepaperSections.map(section => `
${section.title.toUpperCase()}
${'='.repeat(section.title.length)}

${JSON.stringify(section.content, null, 2)}
`).join('\n')}

Generated on: ${new Date().toLocaleDateString()}
`;

const blob = new Blob([pdfContent], { type: 'text/plain' })
const url = URL.createObjectURL(blob)
const a = document.createElement('a')
a.href = url
a.download = 'Quantum-Token-Whitepaper.txt'
document.body.appendChild(a)
a.click()
document.body.removeChild(a)
URL.revokeObjectURL(url)

}

return (
<section id="whitepaper" className="quantum-section bg-gray-900/30">
<div className="container mx-auto px-6">
<motion.div
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
className="text-center mb-12"
>
<h2 className="text-4xl md:text-5xl font-bold mb-6 quantum-title">
<span className="quantum-text-gradient">Whitepaper</span>
</h2>
<p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
Deep dive into the quantum mechanics behind our revolutionary DeFi ecosystem
</p>

<motion.button
onClick={downloadWhitepaper}
className="quantum-button text-lg px-8 py-4 mb-8"
whileHover={{ scale: 1.05, y: -2 }}
whileTap={{ scale: 0.95 }}
>
📄 Download Full Whitepaper
</motion.button>
</motion.div>

<div className="max-w-6xl mx-auto">
<div className="grid lg:grid-cols-4 gap-8">
{/* Navigation Sidebar */}
<div className="lg:col-span-1">
<motion.div
initial={{ opacity: 0, x: -20 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 0.6 }}
className="quantum-card sticky top-24"
>
<h3 className="font-semibold mb-4 quantum-text-gradient">Contents</h3>
<nav className="space-y-2">
{whitepaperSections.map((section, index) => (
<motion.button
key={index}
onClick={() => setActiveSection(index)}
className={`block w-full text-left p-3 rounded-full transition-all duration-300 ${
activeSection === index
? 'bg-blue-500/20 text-blue-400 border-l-4 border-blue-500'
: 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10'
}`}
whileHover={{ x: activeSection === index ? 0 : 5 }}
>
<span className="text-sm font-medium">{section.title}</span>
</motion.button>
))}
</nav>
</motion.div>
</div>

{/* Content Area */}
<div className="lg:col-span-3">
<motion.div
key={activeSection}
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
className="quantum-card"
>
<h3 className="text-2xl font-bold mb-6 quantum-text-gradient">
{whitepaperSections[activeSection].title}
</h3>

<div className="prose prose-invert max-w-none">
{/* Executive Summary */}
{activeSection === 0 && (
<div className="space-y-6">
<div>
<h4 className="text-lg font-semibold mb-3 text-blue-400">Overview</h4>
<p className="text-gray-300 leading-relaxed">
{whitepaperSections[0].content.overview}
</p>
</div>

<div>
<h4 className="text-lg font-semibold mb-3 text-blue-400">Key Points</h4>
<ul className="space-y-2">
{whitepaperSections[0].content.keyPoints.map((point, idx) => (
<li key={idx} className="flex items-start space-x-3">
<span className="text-blue-400 mt-1">•</span>
<span className="text-gray-300">{point}</span>
</li>
))}
</ul>
</div>

<div>
<h4 className="text-lg font-semibold mb-3 text-blue-400">Vision</h4>
<p className="text-gray-300 leading-relaxed">
{whitepaperSections[0].content.vision}
</p>
</div>
</div>
)}

{/* Technology Overview */}
{activeSection === 1 && (
<div className="space-y-6">
<div>
<h4 className="text-lg font-semibold mb-3 text-blue-400">Quantum Mechanics Integration</h4>
<p className="text-gray-300 leading-relaxed">
{whitepaperSections[1].content.quantumMechanics}
</p>
</div>

<div>
<h4 className="text-lg font-semibold mb-3 text-blue-400">Technical Features</h4>
<ul className="space-y-2">
{whitepaperSections[1].content.technicalFeatures.map((feature, idx) => (
<li key={idx} className="flex items-start space-x-3">
<span className="text-blue-400 mt-1">⚡</span>
<span className="text-gray-300">{feature}</span>
</li>
))}
</ul>
</div>

<div>
<h4 className="text-lg font-semibold mb-3 text-blue-400">Innovation</h4>
<p className="text-gray-300 leading-relaxed">
{whitepaperSections[1].content.innovation}
</p>
</div>
</div>
)}

{/* Tokenomics */}
{activeSection === 2 && (
<div className="space-y-6">
<div>
<h4 className="text-lg font-semibold mb-4 text-blue-400">Token Distribution</h4>
<div className="grid md:grid-cols-2 gap-4">
{Object.entries(whitepaperSections[2].content.distribution).map(([key, value], idx) => (
<div key={idx} className="bg-gray-800/50 p-4 rounded-lg border border-blue-500/20">
<h5 className="font-semibold text-blue-300 mb-2">{key}</h5>
<p className="text-gray-300 text-sm">{value}</p>
</div>
))}
</div>
</div>

<div>
<h4 className="text-lg font-semibold mb-3 text-blue-400">Economic Mechanisms</h4>
<ul className="space-y-2">
{whitepaperSections[2].content.mechanisms.map((mechanism, idx) => (
<li key={idx} className="flex items-start space-x-3">
<span className="text-blue-400 mt-1">🔄</span>
<span className="text-gray-300">{mechanism}</span>
</li>
))}
</ul>
</div>
</div>
)}

{/* Presale Structure */}
{activeSection === 3 && (
<div className="space-y-6">
<div>
<h4 className="text-lg font-semibold mb-4 text-blue-400">Presale Phases</h4>
<div className="space-y-4">
{whitepaperSections[3].content.phases.map((phase, idx) => (
<div key={idx} className="bg-gray-800/50 p-4 rounded-lg border border-blue-500/20">
<h5 className="font-semibold text-blue-300 mb-2">{phase.name}</h5>
<div className="grid md:grid-cols-2 gap-2 text-sm text-gray-300">
<p><strong>Allocation:</strong> {phase.allocation}</p>
<p><strong>Price:</strong> {phase.price}</p>
<p><strong>Bonus:</strong> {phase.bonus}</p>
<p><strong>Min/Max:</strong> {phase.minMax}</p>
<p className="md:col-span-2"><strong>Requirements:</strong> {phase.requirements}</p>
</div>
</div>
))}
</div>
</div>

<div>
<h4 className="text-lg font-semibold mb-3 text-blue-400">Early Supporter Benefits</h4>
<ul className="space-y-2">
{whitepaperSections[3].content.benefits.map((benefit, idx) => (
<li key={idx} className="flex items-start space-x-3">
<span className="text-blue-400 mt-1">🎁</span>
<span className="text-gray-300">{benefit}</span>
</li>
))}
</ul>
</div>
</div>
)}

{/* Staking Mechanism */}
{activeSection === 4 && (
<div className="space-y-6">
<div>
<h4 className="text-lg font-semibold mb-3 text-blue-400">Overview</h4>
<p className="text-gray-300 leading-relaxed">
{whitepaperSections[4].content.overview}
</p>
</div>

<div>
<h4 className="text-lg font-semibold mb-4 text-blue-400">Staking Tiers</h4>
<div className="grid md:grid-cols-2 gap-4">
{whitepaperSections[4].content.tiers.map((tier, idx) => (
<div key={idx} className="bg-gray-800/50 p-4 rounded-lg border border-blue-500/20">
<h5 className="font-semibold text-blue-300 mb-2">{tier.duration}</h5>
<p className="text-gray-300"><strong>APY:</strong> {tier.apy}</p>
<p className="text-gray-300"><strong>Multiplier:</strong> {tier.multiplier}</p>
</div>
))}
</div>
</div>

<div>
<h4 className="text-lg font-semibold mb-3 text-blue-400">Special Features</h4>
<ul className="space-y-2">
{whitepaperSections[4].content.features.map((feature, idx) => (
<li key={idx} className="flex items-start space-x-3">
<span className="text-blue-400 mt-1">🌟</span>
<span className="text-gray-300">{feature}</span>
</li>
))}
</ul>
</div>
</div>
)}

{/* PARADOX Integration */}
{activeSection === 5 && (
<div className="space-y-6">
<div>
<h4 className="text-lg font-semibold mb-3 text-blue-400">Quantum Entanglement Concept</h4>
<p className="text-gray-300 leading-relaxed">
{whitepaperSections[5].content.concept}
</p>
</div>

<div>
<h4 className="text-lg font-semibold mb-3 text-blue-400">Entanglement Mechanics</h4>
<ul className="space-y-2">
{whitepaperSections[5].content.mechanics.map((mechanic, idx) => (
<li key={idx} className="flex items-start space-x-3">
<span className="text-purple-400 mt-1">🔗</span>
<span className="text-gray-300">{mechanic}</span>
</li>
))}
</ul>
</div>

<div>
<h4 className="text-lg font-semibold mb-3 text-blue-400">Benefits</h4>
<p className="text-gray-300 leading-relaxed">
{whitepaperSections[5].content.benefits}
</p>
</div>
</div>
)}

{/* Roadmap */}
{activeSection === 6 && (
<div className="space-y-6">
<div className="space-y-6">
{whitepaperSections[6].content.phases.map((phase, idx) => (
<div key={idx} className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/20">
<h4 className="text-lg font-semibold mb-4 text-blue-400">{phase.quarter}</h4>
<ul className="space-y-2">
{phase.milestones.map((milestone, mIdx) => (
<li key={mIdx} className="flex items-start space-x-3">
<span className="text-green-400 mt-1">✓</span>
<span className="text-gray-300">{milestone}</span>
</li>
))}
</ul>
</div>
))}
</div>
</div>
)}

{/* Team & Legal */}
{activeSection === 7 && (
<div className="space-y-6">
<div>
<h4 className="text-lg font-semibold mb-3 text-blue-400">Team</h4>
<p className="text-gray-300 leading-relaxed">
{whitepaperSections[7].content.team}
</p>
</div>

<div>
<h4 className="text-lg font-semibold mb-3 text-blue-400">Scientific Advisors</h4>
<p className="text-gray-300 leading-relaxed">
{whitepaperSections[7].content.advisors}
</p>
</div>

<div>
<h4 className="text-lg font-semibold mb-3 text-blue-400">Legal & Compliance</h4>
<ul className="space-y-2">
{whitepaperSections[7].content.legal.map((item, idx) => (
<li key={idx} className="flex items-start space-x-3">
<span className="text-blue-400 mt-1">⚖️</span>
<span className="text-gray-300">{item}</span>
</li>
))}
</ul>
</div>

<div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
<h4 className="text-lg font-semibold mb-2 text-yellow-400">Important Disclaimer</h4>
<p className="text-gray-300 text-sm leading-relaxed">
{whitepaperSections[7].content.disclaimer}
</p>
</div>
</div>
)}
</div>
</motion.div>
</div>
</div>
</div>
</div>
</section>

)
}