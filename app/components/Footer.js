'use client'
import { motion } from 'framer-motion'

export default function Footer() {
const currentYear = new Date().getFullYear()

const links = {
product: [
{ name: "Whitepaper", href: "/whitepaper.pdf" },
{ name: "Tokenomics", href: "#tokenomics", scroll: true },
{ name: "Roadmap", href: "#roadmap", scroll: true },
{ name: "Staking", href: "#tokenomics", scroll: true }
],
community: [
{ name: "Discord : https://discord.gg/9G5ZDEGJw7" },
{ name: "Twitter : https://twitter.com/QuantumDefiQTM" },
{ name: "Telegram : https://t.me/QuantumTokenOfficial" },
{ name: "YouTube: https://youtube.com/@QuantumToken" }
],
legal: [
{ name: "Privacy Policy”, href: “/privacy" },
{ name: "Terms of Service”, href: “/terms" },
{ name: "Disclaimer”, href: “/disclaimer" },
{ name: "Contact”, href: “mailto:contact@qtmtoken.com" }
]
}

const scrollToSection = (sectionId) => {
const element = document.getElementById(sectionId)
if (element) {
element.scrollIntoView({ behavior: 'smooth' })
}
}

const handleLinkClick = (e, link) => {
if (link.scroll) {
e.preventDefault()
const sectionId = link.href.replace('#', '')
scrollToSection(sectionId)
}
}

return (
<footer className="bg-gray-900/95 border-t border-blue-500/20 backdrop-blur-md">
<div className="container mx-auto px-6 py-12">
<div className="grid md:grid-cols-4 gap-8 mb-8">

{/* Logo & Description */}
<div className="md:col-span-1">
<motion.div
className="flex items-center space-x-3 mb-4 cursor-pointer"
whileHover={{ scale: 1.05 }}
onClick={() => scrollToSection('home')}
>
<div className="w-10 h-10 quantum-glow rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
Q
</div>
<span className="text-xl font-orbitron font-bold quantum-text-gradient">QUANTUM</span>
</motion.div>
<p className="text-gray-400 text-sm mb-4">
Where quantum physics meets DeFi magic. The first meme coin powered by real quantum mechanics principles.
</p>
<div className="flex space-x-4">
{[
{ icon: '🐦', link: 'https://twitter.com/QuantumDefiQTM' },
{ icon: '💬', link: 'https://discord.gg/9G5ZDEGJw7' },
{ icon: '✈️', link: 'https://t.me/QuantumTokenOfficial' },
{ icon: '📺', link: 'https://youtube.com/@QuantumToken' }
].map((social, index) => (
<motion.button
key={index}
className="w-8 h-8 bg-gray-800/50 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-500/20 transition-colors duration-300 text-sm"
whileHover={{ scale: 1.1, y: -2 }}
onClick={() => window.open(social.link, '_blank')}
>
{social.icon}
</motion.button>
))}
</div>
</div>

{/* Product Links */}
<div>
<h3 className="text-white font-semibold mb-4 font-orbitron">Product</h3>
<div className="space-y-2">
{links.product.map((link, index) => (
<motion.a
key={index}
href={link.href}
onClick={(e) => handleLinkClick(e, link)}
target={link.href.startsWith('http') ? '_blank' : '_self'}
rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
className="block text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm cursor-pointer"
whileHover={{ x: 5 }}
>
{link.name}
</motion.a>
))}
</div>
</div>

{/* Community Links */}
<div>
<h3 className="text-white font-semibold mb-4 font-orbitron">Community</h3>
<div className="space-y-2">
{links.community.map((link, index) => (
<motion.a
key={index}
href={link.href}
target="_blank"
rel="noopener noreferrer"
className="block text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm cursor-pointer"
whileHover={{ x: 5 }}
>
{link.name}
</motion.a>
))}
</div>
</div>

{/* Legal Links */}
<div>
<h3 className="text-white font-semibold mb-4 font-orbitron">Legal</h3>
<div className="space-y-2">
{links.legal.map((link, index) => {
  return link?.href ? (
    <motion.a
      key={index}
      href={link.href}
      target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="block text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm cursor-pointer"
      whileHover={{ x: 5 }}
    >
      {link.label}
    </motion.a>
  ) : null;
})}

</div>
</div>
</div>

{/* Bottom Bar */}
<div className="border-t border-gray-800 pt-8">
<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
<div className="text-gray-400 text-sm text-center md:text-left">
© {currentYear} Quantum Token. Built with quantum energy. ⚡
</div>
<div className="text-gray-400 text-sm text-center md:text-right">
<span className="quantum-text-gradient font-semibold">
Not financial advice. DYOR always. 🧬
</span>
</div>
</div>

{/* Extra disclaimer for legal compliance */}
<div className="mt-4 pt-4 border-t border-gray-800/50">
<p className="text-gray-500 text-xs text-center">
Cryptocurrency investments carry significant risk. Past performance does not guarantee future results.
You may lose some or all of your investment. Always consult with a financial advisor before investing.
</p>
</div>
</div>
</div>
</footer>
)
}