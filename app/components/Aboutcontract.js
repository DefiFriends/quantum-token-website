
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const CONTRACT_ADDRESS = "0x46D1Dc0753F202b70851E195c1d14CEA4a7D78b3"

export default function AboutContract() {
const [showTestnetInfo, setShowTestnetInfo] = useState(false)
const [copySuccess, setCopySuccess] = useState('')

const copyToClipboard = async (text) => {
try {
await navigator.clipboard.writeText(text)
setCopySuccess('Contract address copied!')
setTimeout(() => setCopySuccess(''), 3000)
} catch {
setCopySuccess('Failed to copy')
setTimeout(() => setCopySuccess(''), 3000)
}
}

const formatAddress = (address) => {
return `${address.slice(0, 6)}...${address.slice(-4)}`
}

return (
<section className="quantum-section bg-gray-900/50">
<div className="container mx-auto px-6">
<motion.div
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
className="text-center mb-12"
>
<h2 className="text-4xl md:text-5xl font-bold mb-6 quantum-title">
<span className="quantum-text-gradient">Contract Information</span>
</h2>
<p className="text-gray-300 text-lg max-w-2xl mx-auto">
Smart contract details and testing environment setup for Phase 0
</p>
</motion.div>

<div className="max-w-6xl mx-auto">
{/* Main Contract Info Card */}
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
className="quantum-card bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-2 border-cyan-500/50 mb-8"
>
<div className="grid md:grid-cols-2 gap-8">
{/* Left Column - Contract Details */}
<div className="space-y-6">
<div>
<h3 className="text-2xl font-bold mb-4 quantum-text-gradient">
QTM Smart Contract
</h3>
<div className="space-y-4">
<div className="flex flex-col space-y-2">
<span className="text-sm text-gray-400">Network:</span>
<div className="flex items-center space-x-2">
<span className="text-cyan-400 font-semibold">Sepolia Testnet</span>
<span className="bg-cyan-500/20 px-2 py-1 rounded text-xs text-cyan-300">
Chain ID: 11155111
</span>
</div>
</div>

<div className="flex flex-col space-y-2">
<span className="text-sm text-gray-400">Current Phase:</span>
<div className="flex items-center space-x-2">
<span className="text-yellow-400 font-semibold">Phase 0 - Testing</span>
<span className="bg-yellow-500/20 px-2 py-1 rounded text-xs text-yellow-300">
FREE
</span>
</div>
</div>

<div className="flex flex-col space-y-2">
<span className="text-sm text-gray-400">Contract Address:</span>
<div className="flex items-center space-x-2 bg-gray-800/50 p-3 rounded-lg">
<span className="text-green-400 font-mono text-sm flex-1">
{formatAddress(CONTRACT_ADDRESS)}
</span>
<button
onClick={() => copyToClipboard(CONTRACT_ADDRESS)}
className="px-3 py-1 bg-blue-600/50 hover:bg-blue-600/70 rounded text-xs transition-colors"
>
Copy Full
</button>
<a
href={`https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`}
target="_blank"
rel="noopener noreferrer"
className="px-3 py-1 bg-purple-600/50 hover:bg-purple-600/70 rounded text-xs transition-colors"
>
Etherscan
</a>
</div>
{copySuccess && (
<span className="text-green-400 text-sm">{copySuccess}</span>
)}
</div>
</div>
</div>

{/* Key Features */}
<div>
<h3 className="text-lg font-semibold mb-3 text-purple-400">Available Features</h3>
<div className="grid grid-cols-2 gap-3 text-sm">
<div className="flex items-center space-x-2">
<span className="w-2 h-2 bg-green-500 rounded-full"></span>
<span>Free Presale</span>
</div>
<div className="flex items-center space-x-2">
<span className="w-2 h-2 bg-green-500 rounded-full"></span>
<span>Token Staking</span>
</div>
<div className="flex items-center space-x-2">
<span className="w-2 h-2 bg-green-500 rounded-full"></span>
<span>Quantum Entanglement</span>
</div>
<div className="flex items-center space-x-2">
<span className="w-2 h-2 bg-green-500 rounded-full"></span>
<span>Reward Calculation</span>
</div>
</div>
</div>
</div>

{/* Right Column - Important Notice */}
<div className="space-y-6">
<div className="p-6 bg-orange-500/10 border border-orange-500/30 rounded-lg">
<div className="flex items-start space-x-3">
<span className="text-2xl">⚠️</span>
<div>
<h3 className="text-orange-400 font-semibold mb-2">Testnet Environment</h3>
<div className="space-y-2 text-sm text-gray-300">
<p>• This is a testing environment using Sepolia testnet</p>
<p>• All tokens and transactions have NO REAL VALUE</p>
<p>• Used for testing functionality before mainnet launch</p>
<p>• Free Sepolia ETH required for gas fees</p>
</div>
</div>
</div>
</div>

<div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
<div className="flex items-start space-x-3">
<span className="text-2xl">🎯</span>
<div>
<h3 className="text-blue-400 font-semibold mb-2">Phase 0 Goals</h3>
<div className="space-y-2 text-sm text-gray-300">
<p>• Test all smart contract functionality</p>
<p>• Gather community feedback</p>
<p>• Validate staking mechanics</p>
<p>• Prepare for mainnet deployment</p>
</div>
</div>
</div>
</div>

<button
onClick={() => setShowTestnetInfo(!showTestnetInfo)}
className="w-full quantum-button"
>
{showTestnetInfo ? 'Hide' : 'Show'} Setup Instructions
</button>
</div>
</div>

{/* Expandable Setup Instructions */}
{showTestnetInfo && (
<motion.div
initial={{ opacity: 0, height: 0 }}
animate={{ opacity: 1, height: 'auto' }}
exit={{ opacity: 0, height: 0 }}
className="mt-8 pt-8 border-t border-cyan-500/30"
>
<h4 className="text-xl font-semibold mb-6 text-cyan-400 text-center">
Setup Instructions
</h4>

<div className="grid md:grid-cols-3 gap-6">
{/* Step 1 */}
<div className="bg-gray-800/30 p-6 rounded-lg border border-blue-500/20">
<div className="flex items-center mb-4">
<span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
-
</span>
<h3 className="text-lg font-semibold text-blue-400">Add Sepolia Network</h3>
</div>
<div className="space-y-2 text-sm text-gray-300">
<p><strong>Network Name:</strong> Sepolia Testnet</p>
<p><strong>RPC URL:</strong> https://sepolia.infura.io/v3/</p>
<p><strong>Chain ID:</strong> 11155111</p>
<p><strong>Symbol:</strong> ETH</p>
<p><strong>Explorer:</strong> https://sepolia.etherscan.io/</p>
</div>
</div>

{/* Step 2 */}
<div className="bg-gray-800/30 p-6 rounded-lg border border-green-500/20">
<div className="flex items-center mb-4">
<span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
-
</span>
<h3 className="text-lg font-semibold text-green-400">Get Test ETH</h3>
</div>
<div className="space-y-3 text-sm text-gray-300">
<p>Visit any Sepolia faucet:</p>
<div className="space-y-1">
<a
href="https://sepoliafaucet.com"
target="_blank"
rel="noopener noreferrer"
className="block text-cyan-400 hover:underline"
>
→ sepoliafaucet.com
</a>
<a
href="https://faucet.sepolia.dev"
target="_blank"
rel="noopener noreferrer"
className="block text-cyan-400 hover:underline"
>
→ faucet.sepolia.dev
</a>
<a
href="https://www.alchemy.com/faucets/ethereum-sepolia"
target="_blank"
rel="noopener noreferrer"
className="block text-cyan-400 hover:underline"
>
→ Alchemy Faucet
</a>
</div>
</div>
</div>

{/* Step 3 */}
<div className="bg-gray-800/30 p-6 rounded-lg border border-purple-500/20">
<div className="flex items-center mb-4">
<span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
-
</span>
<h3 className="text-lg font-semibold text-purple-400">Start Testing</h3>
</div>
<div className="space-y-2 text-sm text-gray-300">
<p>• Get Whitelist aproved</p>
<p>• Connect your MetaMask wallet</p>
<p>• Switch to Sepolia network</p>
<p>• Buy free QTM tokens in presale</p>
<p>• Test staking functionality</p>
<p>• Experiment with quantum entanglement</p>
</div>
</div>
</div>

{/* Additional Info */}
<div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-cyan-500/30">
<h3 className="text-cyan-400 font-semibold mb-2">Need Help?</h3>
<p className="text-sm text-gray-300">
If you encounter any issues during setup or testing, please reach out to our
community on Discord or Telegram. Our team is ready to assist with technical
support during the testing phase.
</p>
</div>
</motion.div>
)}
</motion.div>
</div>
</div>
</section>

)
}
