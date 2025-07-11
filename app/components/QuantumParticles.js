'use client'
import { useEffect, useState } from 'react'

export default function QuantumParticles() {
const [mounted, setMounted] = useState(false)

useEffect(() => {
setMounted(true)

const createParticle = () => {
const particle = document.createElement('div')
particle.className = 'quantum-particle-element'
particle.style.cssText = `
position: fixed;
left: ${Math.random() * 100}%;
bottom: -10px;
width: ${2 + Math.random() * 4}px;
height: ${2 + Math.random() * 4}px;
background: ${Math.random() > 0.5 ? '#0080FF' : '#8A2BE2'};
border-radius: 50%;
pointer-events: none;
z-index: 1;
animation: quantum-particle-float ${4 + Math.random() * 4}s linear infinite;
`
document.body.appendChild(particle)

setTimeout(() => {
if (particle.parentNode) {
particle.parentNode.removeChild(particle)
}
}, 8000)
}

const interval = setInterval(createParticle, 500)

return () => {
clearInterval(interval)
// Clean up existing particles
const particles = document.querySelectorAll('.quantum-particle-element')
particles.forEach(p => p.remove())
}
}, [])

if (!mounted) return null

return <div className="quantum-particles-container"></div>
}