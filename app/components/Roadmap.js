'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Roadmap() {
const [ref, inView] = useInView({
threshold: 0.2,
triggerOnce: true
})

const phases = [
{
phase: "Phase 1",
title: "Foundation",
period: "Q3 2026",
status: "current",
items: [
"✅ Smart contract development",
"✅ Community building",
"✅ Token launch",
"🔄 Basic staking pools",
"📋 Security audits"
]
},
{
phase: "Phase 2",
title: "Quantum Mechanics",
period: "Q4 2026",
status: "upcoming",
items: [
"🔮 Cross-chain bridge development",
"🎮 Quantum gaming features",
"📊 Advanced analytics dashboard",
"💎 Premium staking tiers",
"🤖 Automated market making"
]
},
{
phase: "Phase 3",
title: "Entanglement",
period: "Q1 2027",
status: "planned",
items: [
"🔗 True quantum entanglement between chains",
"🎲 Uncertainty principle mining",
"👁️ Observer effect NFTs",
"🌌 Multiverse token variants",
"🏛️ DAO governance launch"
]
},
{
phase: "Phase 4",
title: "Quantum Supremacy",
period: "Q2 2027",
status: "vision",
items: [
"🚀 Quantum metaverse integration",
"🎓 Educational platform launch",
"🏢 Enterprise solutions",
"🌍 Global expansion",
"♾️ Infinite possibilities unlocked"
]
}
]

const getStatusColor = (status) => {
switch(status) {
case 'current': return 'from-green-500 to-emerald-500'
case 'upcoming': return 'from-blue-500 to-cyan-500'
case 'planned': return 'from-purple-500 to-violet-500'
case 'vision': return 'from-orange-500 to-red-500'
default: return 'from-gray-500 to-gray-600'
}
}

return (
<section id="roadmap" className="quantum-section" ref={ref}>
<div className="container mx-auto px-6">
<motion.div
initial={{ opacity: 0, y: 50 }}
animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
transition={{ duration: 0.8 }}
className="text-center mb-16"
>
<h2 className="text-4xl md:text-5xl font-bold mb-6 quantum-title">
<span className="quantum-text-gradient">Quantum Roadmap</span>
</h2>
<p className="text-xl text-gray-300 max-w-3xl mx-auto">
Our journey to quantum supremacy. Each phase builds upon the last,
creating an ever-expanding universe of possibilities.
</p>
</motion.div>

<div className="relative">
{/* Connecting Line */}
<div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 hidden lg:block"></div>

<div className="space-y-12">
{phases.map((phase, index) => (
<motion.div
key={index}
initial={{ opacity: 0, y: 50 }}
animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
transition={{ duration: 0.8, delay: index * 0.2 }}
className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
>
{/* Content */}
<div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
<div className="quantum-card">
<div className="flex items-center justify-between mb-4">
<div className={`px-4 py-2 rounded-full bg-gradient-to-r ${getStatusColor(phase.status)} text-white text-sm font-semibold`}>
{phase.phase}
</div>
<div className="text-sm text-gray-400">{phase.period}</div>
</div>

<h3 className="text-2xl font-bold mb-4 quantum-text-gradient">{phase.title}</h3>

<div className="space-y-2">
{phase.items.map((item, itemIndex) => (
<motion.div
key={itemIndex}
initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
transition={{ duration: 0.5, delay: index * 0.2 + itemIndex * 0.1 }}
className="text-gray-300 text-sm flex items-center"
>
<span className="mr-2">{item.split(' ')[0]}</span>
<span>{item.split(' ').slice(1).join(' ')}</span>
</motion.div>
))}
</div>
</div>
</div>

{/* Timeline Node */}
<div className="hidden lg:flex w-2/12 justify-center">
<div className={`w-6 h-6 rounded-full bg-gradient-to-r ${getStatusColor(phase.status)} quantum-glow relative z-10`}>
<div className="absolute inset-1 bg-gray-900 rounded-full"></div>
</div>
</div>

{/* Spacer */}
<div className="hidden lg:block w-5/12"></div>
</motion.div>
))}
</div>
</div>

{/* Call to Action */}
<motion.div
initial={{ opacity: 0, y: 50 }}
animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
transition={{ duration: 0.8, delay: 1 }}
className="text-center mt-16"
>
<div className="quantum-card max-w-2xl mx-auto">
<h3 className="text-2xl font-bold mb-4 quantum-text-gradient">Join the Quantum Journey</h3>
<p className="text-gray-300 mb-6">
Be part of the revolution from day one. Every quantum leap forward
is made possible by our incredible community.
</p>
<button
className="quantum-button"
onClick={() => {
const element = document.getElementById('community')
if (element) {
element.scrollIntoView({ behavior: 'smooth' })
}
}}
>
Get Early Access
</button>
</div>
</motion.div>
</div>
</section>
)
}