'use client'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Tokenomics from './components/Tokenomics'
import Roadmap from './components/Roadmap'
import Community from './components/Community'
import Footer from './components/Footer'

export default function Home() {
return (
<main className="relative">
<Header />
<Hero />
<About />
<Tokenomics />
<Roadmap />
<Community />
<Footer />
</main>
)
}