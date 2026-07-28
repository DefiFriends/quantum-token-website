'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-gray-900" />
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-gray-900"></div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-left"
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 quantum-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="quantum-text-gradient">Where Quantum Physics</span>
              <br />
              <span className="text-white quantum-text-shadow">Meets DeFi Magic</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              The first meme coin powered by real quantum mechanics principles.
              Revolutionary staking, cross-chain innovation, and science-backed development.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold quantum-text-gradient quantum-pulse">42.4B</div>
                <div className="text-sm text-gray-400">Total Supply</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold quantum-text-gradient quantum-pulse">12%</div>
                <div className="text-sm text-gray-400">Base APY</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold quantum-text-gradient quantum-pulse">∞</div>
                <div className="text-sm text-gray-400">Possibilities</div>
              </div>
            </motion.div>

          {/* Buttons */}
            <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.button
              onClick={() => window.open('https://discord.gg/9G5ZDEGJw7', '_blank')}
            className="quantum-button text-lg px-8 py-4"
              whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
           >
            Join the Revolution
            </motion.button>
          <motion.button
            onClick={() => window.open('/whitepaper.html', '_blank')}
              className="border-2 border-blue-500 px-8 py-4 rounded-full text-blue-400 font-semibold text-lg hover:bg-blue-500/10 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
          >
            Read Whitepaper
            </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Animated Logo */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.div
              className="relative"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            >
              <div className="w-48 h-48 md:w-80 md:h-64 lg:w-96 lg:h-96 quantum-glow rounded-full flex items-center justify-center overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-full"
                  style={{ filter: 'brightness(1.1) contrast(1.1)' }}
                >
                  <source src="/quantum-logo-animated.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Orbital rings */}
              <div
                className="absolute inset-0 border-2 border-blue-500/30 rounded-full animate-spin"
                style={{ animationDuration: '10s' }}
              ></div>
              <div
                className="absolute inset-4 border-2 border-purple-500/30 rounded-full animate-spin"
                style={{ animationDuration: '15s', animationDirection: 'reverse' }}
              ></div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-blue-500 rounded-full flex justify-center quantum-glow">
          <motion.div
            className="w-1 h-3 bg-blue-500 rounded-full mt-2"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
