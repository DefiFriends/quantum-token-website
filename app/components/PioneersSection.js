'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function PioneersSection() {
  const [activeTab, setActiveTab] = useState('overview')

  const GOOGLE_FORM_URL = 'https://forms.gle/YuX5x6vNWEymcjD17'

  const pointCategories = [
    {
      title: "Content Creation",
      icon: "🎨",
      items: [
        { task: "Twitter Thread", points: "100-2,000", color: "text-blue-400" },
        { task: "YouTube Video", points: "200-10,000", color: "text-red-400" },
        { task: "Blog Article", points: "200-3,000", color: "text-green-400" },
        { task: "Infographic", points: "200-1,500", color: "text-purple-400" }
      ]
    },
    {
      title: "Community Building",
      icon: "💬",
      items: [
        { task: "Daily Discord Activity", points: "200/week", color: "text-blue-400" },
        { task: "Help New Members", points: "100/week", color: "text-green-400" },
        { task: "Organize Events", points: "300-500", color: "text-yellow-400" },
        { task: "Member Referral", points: "100 each", color: "text-purple-400" }
      ]
    },
    {
      title: "Technical Contributions",
      icon: "💻",
      items: [
        { task: "Code Review", points: "500-1,000", color: "text-cyan-400" },
        { task: "Bug Report", points: "100-1,000", color: "text-orange-400" },
        { task: "Security Audit", points: "1,000-15,000", color: "text-red-400" },
        { task: "Tool Development", points: "1,000-10,000", color: "text-green-400" }
      ]
    },
    {
      title: "Translation",
      icon: "🌍",
      items: [
        { task: "Website Translation", points: "1,000-3,000", color: "text-blue-400" },
        { task: "Content Translation", points: "100-500", color: "text-green-400" },
        { task: "Documentation", points: "500-1,000", color: "text-purple-400" }
      ]
    }
  ]

  const specialBonuses = [
    { name: "First 10 Pioneers", bonus: "+1,000 pts", icon: "🏆" },
    { name: "90-Day Streak", bonus: "+2,000 pts", icon: "🔥" },
    { name: "Top Monthly", bonus: "+500 pts", icon: "👑" },
    { name: "Viral Content (10K+)", bonus: "+2,000 pts", icon: "💥" },
    { name: "10+ Referrals", bonus: "+1,500 pts", icon: "🌊" }
  ]

  const leaderboardSample = [
    { rank: 1, name: "BIG LESI", points: 69700, contributions: 24 },
    { rank: 2, name: "Crypt The Great", points: 62450, contributions: 9 },
    { rank: 3, name: "Silver", points: 58400, contributions: 8 },
    { rank: 4, name: "Smallriri", points: 57050, contributions: 5 },
    { rank: 5, name: "Adex_014", points: 31400, contributions: 20 },
    { rank: 6, name: "Radiant", points: 25500, contributions: 4 },
    { rank: 7, name: "Kimmy", points: 12200, contributions: 4 },
    { rank: 8, name: "Dynamite", points: 10850, contributions: 7 },
    { rank: 9, name: "Malpsin", points: 10100, contributions: 2 },
    { rank: 10, name: "Veektoriea", points: 8000, contributions: 2 },
    { rank: 11, name: "M Ï K E", points: 7700, contributions: 4 },
    { rank: 12, name: "@Michealisreal", points: 6150, contributions: 4 },
    { rank: 13, name: "JudgmentSheep", points: 4900, contributions: 7 },
    { rank: 14, name: "Joachim", points: 3000, contributions: 3 },
    { rank: 15, name: "Aysmooth_bjorn", points: 2700, contributions: 2 },
    { rank: 16, name: "slimchief7", points: 2300, contributions: 1 },
    { rank: 17, name: "@alphanexus001", points: 2000, contributions: 2 },
    { rank: 18, name: "Carcal", points: 1250, contributions: 1 },
    { rank: 19, name: "flacko_crypt", points: 1000, contributions: 1 },
    { rank: 19, name: "Atomicwhale", points: 1000, contributions: 1 },
    { rank: 19, name: "Darkrum", points: 1000, contributions: 1 }
  ]

  return (
    <section id="pioneers" className="relative min-h-screen py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-blue-900/20 to-gray-900"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-20 h-20 mx-auto quantum-glow rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-4xl">
              ⚛️
            </div>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 font-orbitron">
            <span className="quantum-text-gradient">QUANTUM PIONEERS</span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Earn your place in history. Contribute to the revolution and claim your share of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 font-bold">
              2.1 BILLION QTM
            </span>
          </p>

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              { label: "Total Allocation", value: "2.1B QTM", icon: "💎" },
              { label: "Active Pioneers", value: "19", icon: "👥" },
              { label: "Total Points", value: "378660", icon: "⭐" },
              { label: "Time Left", value: "Q4 2026", icon: "⏰" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="quantum-card text-center"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold quantum-text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Tabs Navigation – overview + points + submit only */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'points', label: 'Point System', icon: '⭐' },
            { id: 'submit', label: 'Submit Work', icon: '🚀' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'submit') {
                  window.open(GOOGLE_FORM_URL, '_blank')
                } else {
                  setActiveTab(tab.id)
                }
              }}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <motion.div className="quantum-card" whileHover={{ scale: 1.02, y: -5 }}>
                  <h3 className="text-2xl font-bold mb-4 quantum-text-gradient">🎯 What Is This?</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    The Pioneer Program rewards genuine contributors who help build the QTM ecosystem.
                    Create content, engage with community, contribute code, or translate materials.
                  </p>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <p className="text-blue-300 font-semibold">
                      Your Points ÷ Total Points × 2.1B QTM = Your Allocation
                    </p>
                  </div>
                </motion.div>

                <motion.div className="quantum-card" whileHover={{ scale: 1.02, y: -5 }}>
                  <h3 className="text-2xl font-bold mb-4 quantum-text-gradient">⚡ How It Works</h3>
                  <div className="space-y-3">
                    {[
                      "Contribute to the ecosystem (content, code, community)",
                      "Submit your work via the form",
                      "Earn points based on quality & impact",
                      "Get your QTM at mainnet launch!"
                    ].map((step, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-400 font-bold">
                          {index + 1}
                        </div>
                        <p className="text-gray-300">{step}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <motion.div className="quantum-card" whileHover={{ scale: 1.01 }}>
                <h3 className="text-2xl font-bold mb-6 text-center quantum-text-gradient">🎁 Special Bonuses</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {specialBonuses.map((bonus, index) => (
                    <motion.div
                      key={index}
                      className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-full p-4 text-center"
                      whileHover={{ scale: 1.05, y: -3 }}
                    >
                      <div className="text-3xl mb-2">{bonus.icon}</div>
                      <div className="text-sm text-gray-300 mb-1">{bonus.name}</div>
                      <div className="text-lg font-bold text-yellow-400">{bonus.bonus}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div className="text-center mt-12" whileHover={{ scale: 1.05 }}>
                <button
                  onClick={() => window.open(GOOGLE_FORM_URL, '_blank')}
                  className="quantum-button text-xl px-12 py-4"
                >
                  🚀 Start Contributing Now
                </button>
              </motion.div>
            </div>
          )}

          {/* POINTS TAB */}
          {activeTab === 'points' && (
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {pointCategories.map((category, index) => (
                  <motion.div
                    key={index}
                    className="quantum-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-4xl">{category.icon}</div>
                      <h3 className="text-2xl font-bold quantum-text-gradient">{category.title}</h3>
                    </div>
                    <div className="space-y-3">
                      {category.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center py-2 border-b border-gray-700/30"
                        >
                          <span className="text-gray-300">{item.task}</span>
                          <span className={`font-bold ${item.color}`}>{item.points}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="quantum-card mt-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10"
                whileHover={{ scale: 1.01 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-center quantum-text-gradient">💡 Example Calculation</h3>
                <div className="max-w-2xl mx-auto bg-gray-900/50 rounded-lg p-6">
                  <p className="text-gray-300 mb-4">
                    If you earn <span className="text-blue-400 font-bold">10,000 points</span> and total is{' '}
                    <span className="text-purple-400 font-bold">500,000 points</span>:
                  </p>
                  <div className="text-center py-4">
                    <div className="text-3xl font-bold">
                      <span className="text-blue-400">(10,000</span>
                      <span className="text-gray-500"> ÷ </span>
                      <span className="text-purple-400">500,000)</span>
                      <span className="text-gray-500"> × </span>
                      <span className="text-yellow-400">2.1B</span>
                    </div>
                    <div className="text-4xl font-bold quantum-text-gradient mt-4">
                      = 42 MILLION QTM
                    </div>
                  </div>
                  <p className="text-center text-gray-400 text-sm mt-4">
                    The more you contribute, the more you earn!
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* LEADERBOARD – always visible */}
        <div className="max-w-4xl mx-auto mt-16">
          <motion.div className="quantum-card" whileHover={{ scale: 1.01 }}>
            <h3 className="text-2xl font-bold mb-6 text-center quantum-text-gradient">🏆 Top Pioneers</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-blue-500/30">
                    <th className="text-left p-4 text-gray-400">Rank</th>
                    <th className="text-left p-4 text-gray-400">Pioneer</th>
                    <th className="text-right p-4 text-gray-400">Points</th>
                    <th className="text-right p-4 text-gray-400">Contributions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardSample.map((pioneer, index) => (
                    <motion.tr
                      key={`${pioneer.rank}-${pioneer.name}-${index}`}
                      className="border-b border-gray-700/30 hover:bg-blue-500/5 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {pioneer.rank === 1 && <span className="text-2xl">🥇</span>}
                          {pioneer.rank === 2 && <span className="text-2xl">🥈</span>}
                          {pioneer.rank === 3 && <span className="text-2xl">🥉</span>}
                          {pioneer.rank > 3 && <span className="text-gray-400">#{pioneer.rank}</span>}
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-white">{pioneer.name}</td>
                      <td className="p-4 text-right">
                        <span className="text-yellow-400 font-bold">
                          {pioneer.points.toLocaleString()}
                        </span>
                      </td>
                      <td className="p-4 text-right text-gray-400">
                        {pioneer.contributions}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-center text-gray-400 text-sm">
              <p>Leaderboard updates every Sunday</p>
              <p className="mt-2">
                Your position will appear here after your first contribution is verified
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="quantum-card max-w-4xl mx-auto bg-gradient-to-r from-blue-500/20 to-purple-500/20">
            <h3 className="text-3xl font-bold mb-4 quantum-text-gradient">
              Ready to Quantum Leap?
            </h3>
            <p className="text-xl text-gray-300 mb-6">
              Join the pioneers building the future of DeFi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => window.open('https://discord.gg/9G5ZDEGJw7', '_blank')}
                className="quantum-button text-lg px-8 py-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Discord
              </motion.button>
              <motion.button
                onClick={() => window.open(GOOGLE_FORM_URL, '_blank')}
                className="border-2 border-blue-500 px-8 py-3 rounded-full text-blue-400 font-semibold text-lg hover:bg-blue-500/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Submit Work
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}