'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'


const STAKING_CONTRACT_ADDRESS = "0xC7238b4b297fcf63f90EC1843b7d64E0c155d950";
const CONTRACT_ADDRESS = "0x46D1Dc0753F202b70851E195c1d14CEA4a7D78b3"

export default function AboutContract() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

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
    <section id="contract-info" className="quantum-section" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 quantum-title">
            <span className="quantum-text-gradient">Contract Information</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Smart contract details and testing environment setup for Phase 0
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Network Information */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            whileHover={{ y: -10, transition: { duration: 0.1 } }}
            className="quantum-card"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold">
                Network Details
              </div>
              <div className="text-sm text-gray-400">Sepolia Testnet</div>
            </div>

            <h3 className="text-2xl font-bold mb-6 quantum-text-gradient">QTM Smart Contracts</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <span className="text-gray-400 text-sm">Network:</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-cyan-400 font-semibold">Sepolia Testnet</span>
                    <span className="bg-cyan-500/20 px-2 py-1 rounded text-xs text-cyan-300">
                      Chain ID: 11155111
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Current Phase:</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-yellow-400 font-semibold">Phase 0 - Testing</span>
                    <span className="bg-yellow-500/20 px-2 py-1 rounded text-xs text-yellow-300">
                      FREE
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Available Features:</span>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Free Presale</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Quantum Staking</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Multi-sig Security</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Time-locked Withdrawals</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Token Contract Address */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -10, transition: { duration: 0.1 } }}
            className="quantum-card"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-semibold">
                Token Contract
              </div>
              <div className="text-sm text-gray-400">Verified ✅</div>
            </div>

            <h3 className="text-2xl font-bold mb-6 quantum-text-gradient">QTM Token Contract</h3>

            <div className="space-y-4">
              <div className="bg-gray-800/30 p-4 border border-gray-700/50">
                <div className="flex items-center justify-between">
                  <span className="text-green-400 font-mono text-sm">
                    {formatAddress(CONTRACT_ADDRESS)}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyToClipboard(CONTRACT_ADDRESS)}
                      className="px-3 py-1 bg-blue-600/50 hover:bg-blue-600/70 text-xs transition-colors"
                    >
                      Copy Full
                    </button>
                    <a
                      href={`https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-purple-600/50 hover:bg-purple-600/70 text-xs transition-colors"
                    >
                      View on Etherscan
                    </a>
                  </div>
                </div>
                {copySuccess && (
                  <div className="mt-2">
                    <span className="text-green-400 text-sm">{copySuccess}</span>
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-400">
                <p>🪙 ERC-20 Token Contract - 42 billion fixed supply. Deployed and verified on Sepolia testnet.</p>
              </div>
            </div>
          </motion.div>

          {/* Staking Contract Address - NEW! */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            whileHover={{ y: -10, transition: { duration: 0.1 } }}
            className="quantum-card"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold">
                Staking Contract
              </div>
              <div className="text-sm text-gray-400">Verified ✅ NEW!</div>
            </div>

            <h3 className="text-2xl font-bold mb-6 quantum-text-gradient">Quantum Staking Contract</h3>

            <div className="space-y-4">
              <div className="bg-gray-800/30 p-4 border border-cyan-700/50">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 font-mono text-sm">
                    {formatAddress(STAKING_CONTRACT_ADDRESS)}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyToClipboard(STAKING_CONTRACT_ADDRESS)}
                      className="px-3 py-1 bg-blue-600/50 hover:bg-blue-600/70 text-xs transition-colors"
                    >
                      Copy Full
                    </button>
                    <a
                      href={`https://sepolia.etherscan.io/address/${STAKING_CONTRACT_ADDRESS}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-purple-600/50 hover:bg-purple-600/70 text-xs transition-colors"
                    >
                      View on Etherscan
                    </a>
                  </div>
                </div>
                {copySuccess && (
                  <div className="mt-2">
                    <span className="text-green-400 text-sm">{copySuccess}</span>
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-400">
                <p>⚛️ Quantum Staking Mechanism v2.0 - Features multi-sig approvals, 2-hour time-locked withdrawals, and probabilistic rewards (12-24% APY). Three tiers: 30/90/180 days.</p>
              </div>
            </div>
          </motion.div>

          {/* Important Notices */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ y: -10, transition: { duration: 0.1 } }}
              className="quantum-card"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold">
                  Warning
                </div>
                <span className="text-2xl">⚠️</span>
              </div>

              <h3 className="text-2xl font-bold mb-6 quantum-text-gradient">Testnet Environment</h3>

              <div className="space-y-3 text-sm text-gray-300">
                <p>• This is a testing environment using Sepolia testnet</p>
                <p>• All tokens and transactions have NO REAL VALUE</p>
                <p>• Used for testing functionality before mainnet launch</p>
                <p>• Free Sepolia ETH required for gas fees</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ y: -10, transition: { duration: 0.1 } }}
              className="quantum-card"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold">
                  Goals
                </div>
                <span className="text-2xl">🎯</span>
              </div>

              <h3 className="text-2xl font-bold mb-6 quantum-text-gradient">Phase 0 Goals</h3>

              <div className="space-y-3 text-sm text-gray-300">
                <p>• Test quantum staking mechanics</p>
                <p>• Gather community feedback</p>
                <p>• Validate security features</p>
                <p>• Prepare for mainnet deployment</p>
              </div>
            </motion.div>
          </div>

          {/* Setup Instructions Button */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <button
              className="quantum-button"
              onClick={() => setShowTestnetInfo(!showTestnetInfo)}
            >
              {showTestnetInfo ? 'Hide' : 'Show'} Setup Instructions
            </button>
          </motion.div>

          {/* Expandable Setup Instructions */}
          {showTestnetInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-8"
            >
              <h4 className="text-3xl font-bold text-center quantum-text-gradient mb-12">
                Setup Instructions
              </h4>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  whileHover={{ y: -10, transition: { duration: 0.1 } }}
                  className="quantum-card"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold">
                      Step 1
                    </div>
                    <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center text-sm font-bold rounded-full">
                      1
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-6 quantum-text-gradient">Add Sepolia Network</h3>

                  <div className="space-y-3 text-sm text-gray-300">
                    <p><strong>Network Name:</strong> Sepolia Testnet</p>
                    <p><strong>RPC URL:</strong> https://sepolia.infura.io/v3/</p>
                    <p><strong>Chain ID:</strong> 11155111</p>
                    <p><strong>Symbol:</strong> ETH</p>
                    <p><strong>Explorer:</strong> https://sepolia.etherscan.io/</p>
                  </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  whileHover={{ y: -10, transition: { duration: 0.1 } }}
                  className="quantum-card"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold">
                      Step 2
                    </div>
                    <div className="w-8 h-8 bg-green-500 text-white flex items-center justify-center text-sm font-bold rounded-full">
                      2
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-6 quantum-text-gradient">Get Test ETH</h3>

                  <div className="space-y-3 text-sm text-gray-300">
                    <p>Visit any Sepolia faucet:</p>
                    <div className="space-y-2">
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
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  whileHover={{ y: -10, transition: { duration: 0.1 } }}
                  className="quantum-card"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 text-white text-sm font-semibold">
                      Step 3
                    </div>
                    <div className="w-8 h-8 bg-purple-500 text-white flex items-center justify-center text-sm font-bold rounded-full">
                      3
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-6 quantum-text-gradient">Start Testing</h3>

                  <div className="space-y-3 text-sm text-gray-300">
                    <p>• Get Whitelist approved</p>
                    <p>• Connect your MetaMask wallet</p>
                    <p>• Switch to Sepolia network</p>
                    <p>• Get free QTM tokens</p>
                    <p>• Test quantum staking (all 3 tiers!)</p>
                    <p>• Report bugs & earn Pioneer points</p>
                  </div>
                </motion.div>
              </div>

              {/* Additional Help */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ y: -10, transition: { duration: 0.1 } }}
                className="quantum-card max-w-2xl mx-auto"
              >
                <h3 className="text-2xl font-bold mb-6 quantum-text-gradient text-center">Need Help?</h3>
                <p className="text-sm text-gray-300 text-center">
                  If you encounter any issues during setup or testing, please reach out to our
                  community on Discord or Telegram. Our team is ready to assist with technical
                  support during the testing phase. Report bugs to earn up to 10,000 Pioneer points!
                </p>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
