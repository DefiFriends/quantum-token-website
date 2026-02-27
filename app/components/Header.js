'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Header() {
const [isOpen, setIsOpen] = useState(false)

// Smooth scroll function
const scrollToSection = (sectionId) => {
const element = document.getElementById(sectionId)
if (element) {
element.scrollIntoView({ behavior: 'smooth' })
}
setIsOpen(false) // Close mobile menu
}

const menuItems = [
{ name: 'Home', href: 'home' },
{ name: 'About', href: 'about' },
{ name: 'Tokenomics', href: 'tokenomics' },
{ name: 'Web3 Interface', href: 'web3' },
{ name: 'Pioneers', href: 'pioneers' },
{ name: 'Whitepaper', href: 'whitepaper' },
{ name: 'Roadmap', href: 'roadmap' },
{ name: 'Community', href: 'community' },
]

// Your real social media links
const socialLinks = {
discord: 'https://discord.gg/9G5ZDEGJw7',
twitter: 'https://twitter.com/QuantumDefiQTM',
telegram: 'https://t.me/QuantumTokenOfficial',
website: 'https://qtmtoken.com'
}

return (
<motion.header
className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-blue-500/20"
initial={{ y: -100 }}
animate={{ y: 0 }}
transition={{ duration: 0.5 }}
>
<nav className="container mx-auto px-6 py-4">
<div className="flex items-center justify-between">
{/* Logo */}
<motion.div
className="flex items-center space-x-3 cursor-pointer"
whileHover={{ scale: 1.05 }}
onClick={() => scrollToSection('home')}
>
<div className="w-10 h-10 quantum-glow rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
QTM
</div>
<span className="text-xl font-orbitron font-bold quantum-text-gradient">
QUANTUM TOKEN
</span>
</motion.div>

{/* Desktop Menu */}
<div className="hidden md:flex items-center space-x-8">
{menuItems.map((item) => (
<motion.button
key={item.name}
onClick={() => scrollToSection(item.href)}
className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
whileHover={{ scale: 1.1 }}
whileTap={{ scale: 0.95 }}
>
{item.name}
</motion.button>
))}
<motion.button
onClick={() => window.open(socialLinks.discord, '_blank')}
className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
>

Join Community
</motion.button>
</div>

{/* Mobile Menu Button */}
<button
className="md:hidden text-white"
onClick={() => setIsOpen(!isOpen)}
>
<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
</svg>
</button>
</div>

{/* Mobile Menu */}
{isOpen && (
<motion.div
className="md:hidden mt-4 pb-4 border-t border-blue-500/20"
initial={{ opacity: 0, height: 0 }}
animate={{ opacity: 1, height: 'auto' }}
exit={{ opacity: 0, height: 0 }}
>
{menuItems.map((item) => (
<button
key={item.name}
onClick={() => scrollToSection(item.href)}
className="block py-2 text-gray-300 hover:text-blue-400 transition-colors duration-300 w-full text-left"
>
{item.name}
</button>
))}
</motion.div>
)}
</nav>
</motion.header>
)
}