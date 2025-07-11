'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function About() {
const [ref, inView] = useInView({
threshold: 0.3,
triggerOnce: true
})

const features = [
{
icon: "🧬",
title: "Quantum Staking",
description: "Revolutionary staking mechanics inspired by quantum superposition. Your tokens exist in multiple reward states simultaneously."
},
{
icon: "🔗",
title: "Cross-Chain Innovation",
description: "True quantum entanglement between chains. When events happen on one chain, they instantly affect tokens on another."
},
{
icon: "🔬",
title: "Science-Backed",
description: "Built by scientists for the future. Real quantum physics principles applied to DeFi mechanics."
}
]

return (
<section id="about" className="quantum-section" ref={ref}>
<div className="container mx-auto px-6">
<motion.div
initial={{ opacity: 0, y: 50 }}
animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
transition={{ duration: 0.8 }}
className="text-center mb-16"
>
<h2 className="text-4xl md:text-5xl font-bold mb-6 quantum-title">
<span className="quantum-text-gradient">The Quantum Revolution</span>
</h2>
<p className="text-xl text-gray-300 max-w-3xl mx-auto">
We're not just another meme coin. We're pioneering the first cryptocurrency
that uses real quantum mechanics principles to create revolutionary DeFi experiences.
</p>
</motion.div>

<div className="grid md:grid-cols-3 gap-8">
{features.map((feature, index) => (
<motion.div
key={index}
initial={{ opacity: 0, y: 50 }}
animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
transition={{ duration: 0.8, delay: index * 0.2 }}
className="quantum-card text-center"
whileHover={{ scale: 1.05 }}
>
<div className="text-4xl mb-4 quantum-float">{feature.icon}</div>
<h3 className="text-xl font-bold mb-4 quantum-text-gradient">{feature.title}</h3>
<p className="text-gray-300">{feature.description}</p>
</motion.div>
))}
</div>

{/* Wave Function Collapse Image */}
<motion.div
initial={{ opacity: 0, scale: 0.8 }}
animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
transition={{ duration: 1, delay: 0.5 }}
className="mt-16 text-center"
>
<div className="quantum-card max-w-2xl mx-auto">
<h3 className="text-2xl font-bold mb-4 quantum-text-gradient">Understanding Wave Function Collapse</h3>
<p className="text-gray-300 mb-6">
In quantum mechanics, particles exist in multiple states until observed.
In our ecosystem, your staking rewards exist in quantum superposition until you claim them!
</p>
<div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-lg">
<p className="text-sm text-gray-400 italic">
"Just as observing a quantum particle collapses its wave function into reality,
participating in our ecosystem collapses infinite possibilities into real rewards."
</p>
</div>
</div>
</motion.div>
</div>
</section>
)
}