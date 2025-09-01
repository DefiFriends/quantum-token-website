'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Community() {
const [ref, inView] = useInView({
threshold: 0.3,
triggerOnce: true
})

const socialPlatforms = [
{
name: "Discord",
icon: "💬",
members: "1,250+",
description: "Join our main community hub for discussions, updates, and quantum physics talks.",
link: "https://discord.gg/9G5ZDEGJw7", // Your real Discord link
color: "from-indigo-500 to-purple-500"
},
{
name: "Twitter",
icon: "🐦",
members: "2,800+",
description: "Follow us for daily updates, memes, and quantum education.",
link: "https://twitter.com/QuantumDefiQTM", // Your real Twitter
color: "from-blue-500 to-cyan-500"
},
{
name: "Telegram",
icon: "✈️",
members: "890+",
description: "Quick updates and community chat for active traders.",
link: "https://t.me/QuantumTokenOfficial", // Your real Telegram
color: "from-blue-400 to-blue-600"
},
{
name: "YouTube",
icon: "📺",
members: "450+",
description: "Educational content about quantum physics and DeFi.",
link: "https://youtube.com/@QuantumToken", // Your real YouTube
color: "from-red-500 to-pink-500"
}
]

const stats = [
{ label: "Community Members", value: "5,000+", icon: "👥" },
{ label: "Daily Messages", value: "500+", icon: "💬" },
{ label: "Countries", value: "25+", icon: "🌍" },
{ label: "Quantum Enthusiasts", value: "∞", icon: "🧬" }
]

return (
<section id="community" className="quantum-section bg-gradient-to-b from-gray-800 to-gray-900" ref={ref}>
<div className="container mx-auto px-6">
<motion.div
initial={{ opacity: 0, y: 50 }}
animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
transition={{ duration: 0.8 }}
className="text-center mb-16"
>
<h2 className="text-4xl md:text-5xl font-bold mb-6 quantum-title">
<span className="quantum-text-gradient">Quantum Community</span>
</h2>
<p className="text-xl text-gray-300 max-w-3xl mx-auto">
Join thousands of quantum enthusiasts, DeFi pioneers, and science lovers
building the future of cryptocurrency together.
</p>
</motion.div>

{/* Community Stats */}
<motion.div
initial={{ opacity: 0, y: 50 }}
animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
transition={{ duration: 0.8, delay: 0.2 }}
className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
>
{stats.map((stat, index) => (
<div key={index} className="quantum-card text-center">
<div className="text-3xl mb-2 quantum-float">{stat.icon}</div>
<div className="text-2xl font-bold quantum-text-gradient quantum-pulse">{stat.value}</div>
<div className="text-sm text-gray-400">{stat.label}</div>
</div>
))}
</motion.div>

{/* Social Platforms */}
<div className="grid md:grid-cols-2 gap-6 mb-16">
{socialPlatforms.map((platform, index) => (
<motion.div
key={index}
initial={{ opacity: 0, y: 50 }}
animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
transition={{ duration: 0.8, delay: index * 0.1 }}
className="quantum-card group cursor-pointer"
whileHover={{ scale: 1.03 }}
onClick={() => window.open(platform.link, '_blank')}
>
<div className="flex items-center space-x-4">
<div className={`w-16 h-16 rounded-full bg-gradient-to-r ${platform.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
{platform.icon}
</div>
<div className="flex-1">
<div className="flex items-center justify-between mb-2">
<h3 className="text-xl font-bold text-white">{platform.name}</h3>
<span className="text-sm text-gray-400">{platform.members}</span>
</div>
<p className="text-gray-300 text-sm mb-4">{platform.description}</p>
<motion.div
className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${platform.color} text-white font-semibold text-sm`}
whileHover={{ x: 5 }}
>
<span className="mr-2">{platform.icon}</span>
Join {platform.name}
</motion.div>
</div>
</div>
</motion.div>
))}
</div>

{/* Newsletter Signup */}
<motion.div
initial={{ opacity: 0, y: 50 }}
animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
transition={{ duration: 0.8, delay: 0.5 }}
className="quantum-card max-w-2xl mx-auto text-center"
>
<h3 className="text-2xl font-bold mb-4 quantum-text-gradient">Stay Quantum Connected</h3>
<p className="text-gray-300 mb-6">
Get exclusive updates, early access to features, and quantum physics insights
delivered directly to your inbox.
</p>
<div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
<input
type="email"
placeholder="Enter your email address"
className="flex-1 px-4 py-3 bg-gray-800 border border-blue-500/30 rounded-full text-white focus:border-blue-500 focus:outline-none"
/>
<motion.button
className="quantum-button whitespace-nowrap"
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
>
Subscribe
</motion.button>
</div>
<p className="text-xs text-gray-500 mt-3">
No spam, just quantum goodness. Unsubscribe anytime.
</p>
</motion.div>
</div>
</section>
)
}