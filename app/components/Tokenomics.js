'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

export default function Tokenomics() {
const [ref, inView] = useInView({
threshold: 0.3,
triggerOnce: true
})

const [stakingAmount, setStakingAmount] = useState(10000)
const [lockPeriod, setLockPeriod] = useState(30)

const distribution = [
{ label: "Public Sale", percentage: 30, amount: "300M", color: "from-blue-500 to-blue-600" },
{ label: "Liquidity Pool", percentage: 25, amount: "250M", color: "from-purple-500 to-purple-600" },
{ label: "Team (Vested)", percentage: 15, amount: "150M", color: "from-indigo-500 to-indigo-600" },
{ label: "Development", percentage: 10, amount: "100M", color: "from-cyan-500 to-cyan-600" },
{ label: "Community Rewards", percentage: 10, amount: "100M", color: "from-teal-500 to-teal-600" },
{ label: "Marketing", percentage: 5, amount: "50M", color: "from-blue-400 to-blue-500" },
{ label: "Reserve Fund", percentage: 5, amount: "50M", color: "from-purple-400 to-purple-500" }
]

const calculateRewards = () => {
const multiplier = lockPeriod === 30 ? 1 : lockPeriod === 90 ? 1.25 : 1.5
const baseAPY = 0.12
const annualReward = stakingAmount * baseAPY * multiplier
const monthlyReward = annualReward / 12
return Math.floor(monthlyReward)
}

return (
<section id="tokenomics" className="quantum-section bg-gradient-to-b from-gray-900 to-gray-800" ref={ref}>
<div className="container mx-auto px-6">
<motion.div
initial={{ opacity: 0, y: 50 }}
animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
transition={{ duration: 0.8 }}
className="text-center mb-16"
>
<h2 className="text-4xl md:text-5xl font-bold mb-6 quantum-title">
<span className="quantum-text-gradient">Quantum Tokenomics</span>
</h2>
<p className="text-xl text-gray-300 max-w-3xl mx-auto">
Carefully designed distribution and staking mechanics that ensure long-term sustainability
and community growth through quantum-inspired principles.
</p>
</motion.div>

<div className="grid lg:grid-cols-2 gap-12 items-center">

{/* Token Distribution */}
<motion.div
initial={{ opacity: 0, x: -50 }}
animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
transition={{ duration: 0.8 }}
className="quantum-card"
>
<h3 className="text-2xl font-bold mb-8 quantum-text-gradient text-center">Token Distribution</h3>

{/* Pie Chart Representation */}
<div className="relative w-64 h-64 mx-auto mb-8">
<div className="w-full h-full rounded-full quantum-glow" style={{
background: `conic-gradient(
from 0deg,
#3b82f6 0deg ${distribution[0].percentage * 3.6}deg,
#8b5cf6 ${distribution[0].percentage * 3.6}deg ${(distribution[0].percentage + distribution[1].percentage) * 3.6}deg,
#6366f1 ${(distribution[0].percentage + distribution[1].percentage) * 3.6}deg ${(distribution[0].percentage + distribution[1].percentage + distribution[2].percentage) * 3.6}deg,
#06b6d4 ${(distribution[0].percentage + distribution[1].percentage + distribution[2].percentage) * 3.6}deg ${(distribution[0].percentage + distribution[1].percentage + distribution[2].percentage + distribution[3].percentage) * 3.6}deg,
#14b8a6 ${(distribution[0].percentage + distribution[1].percentage + distribution[2].percentage + distribution[3].percentage) * 3.6}deg ${(distribution[0].percentage + distribution[1].percentage + distribution[2].percentage + distribution[3].percentage + distribution[4].percentage) * 3.6}deg,
#3b82f6 ${(distribution[0].percentage + distribution[1].percentage + distribution[2].percentage + distribution[3].percentage + distribution[4].percentage) * 3.6}deg ${(distribution[0].percentage + distribution[1].percentage + distribution[2].percentage + distribution[3].percentage + distribution[4].percentage + distribution[5].percentage) * 3.6}deg,
#8b5cf6 ${(distribution[0].percentage + distribution[1].percentage + distribution[2].percentage + distribution[3].percentage + distribution[4].percentage + distribution[5].percentage) * 3.6}deg 360deg
)`
}}></div>
<div className="absolute inset-8 bg-gray-900 rounded-full flex items-center justify-center">
<div className="text-center">
<div className="text-2xl font-bold quantum-text-gradient">1B</div>
<div className="text-sm text-gray-400">Total Supply</div>
</div>
</div>
</div>

{/* Distribution List */}
<div className="space-y-4">
{distribution.map((item, index) => (
<motion.div
key={index}
initial={{ opacity: 0, x: -20 }}
animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
transition={{ duration: 0.5, delay: index * 0.1 }}
className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
>
<div className="flex items-center space-x-3">
<div className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.color}`}></div>
<span className="text-gray-300">{item.label}</span>
</div>
<div className="text-right">
<div className="text-white font-semibold">{item.percentage}%</div>
<div className="text-sm text-gray-400">{item.amount}</div>
</div>
</motion.div>
))}
</div>
</motion.div>

{/* Staking Calculator */}
<motion.div
initial={{ opacity: 0, x: 50 }}
animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
transition={{ duration: 0.8 }}
className="quantum-card"
>
<h3 className="text-2xl font-bold mb-8 quantum-text-gradient text-center">Staking Calculator</h3>

<div className="space-y-6">
{/* Staking Amount Input */}
<div>
<label className="block text-sm font-medium text-gray-300 mb-2">
Staking Amount (QTM)
</label>
<input
type="number"
value={stakingAmount}
onChange={(e) => setStakingAmount(Number(e.target.value))}
className="w-full px-4 py-3 bg-gray-800 border border-blue-500/30 rounded-lg text-white focus:border-blue-500 focus:outline-none"
placeholder="Enter amount to stake"
/>
</div>

{/* Lock Period Selection */}
<div>
<label className="block text-sm font-medium text-gray-300 mb-2">
Lock Period
</label>
<div className="grid grid-cols-3 gap-2">
{[30, 90, 180].map((period) => (
<button
key={period}
onClick={() => setLockPeriod(period)}
className={`py-2 px-4 rounded-lg transition-all duration-300 ${
lockPeriod === period
? 'quantum-gradient text-white'
: 'bg-gray-800 text-gray-300 hover:bg-gray-700'
}`}
>
{period} days
</button>
))}
</div>
</div>

{/* Rewards Display */}
<div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-lg border border-blue-500/20">
<div className="text-center">
<div className="text-sm text-gray-400 mb-2">Estimated Monthly Rewards</div>
<div className="text-3xl font-bold quantum-text-gradient quantum-pulse">
{calculateRewards().toLocaleString()} QTM
</div>
<div className="text-sm text-gray-400 mt-2">
APY: {lockPeriod === 30 ? '12%' : lockPeriod === 90 ? '15%' : '18%'}
</div>
</div>
</div>

{/* Staking Benefits */}
<div className="space-y-3">
<h4 className="font-semibold text-gray-300">Staking Benefits:</h4>
<div className="text-sm text-gray-400 space-y-1">
<div>✅ Quantum reward multipliers</div>
<div>✅ Governance voting rights</div>
<div>✅ Exclusive community access</div>
<div>✅ Priority in future features</div>
</div>
</div>
</div>
</motion.div>
</div>
</div>
</section>
)
}