'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ethers } from 'ethers'

// Your deployed contract address and ABI
const CONTRACT_ADDRESS = "0x46D1Dc0753F202b70851E195c1d14CEA4a7D78b3"
const SEPOLIA_CHAIN_ID = "0xaa36a7" // Sepolia testnet"

// Fixed ABI - includes uncertaintyGenerated field
const CONTRACT_ABI = [
// Read functions
"function balanceOf(address owner) view returns (uint256)",
"function totalSupply() view returns (uint256)",
"function presalePhases(uint256) view returns (string name, uint256 allocation, uint256 price, uint256 minPurchase, uint256 maxPurchase, uint256 soldAmount, bool active, uint256 bonusPercentage)",
"function currentPresalePhase() view returns (uint256)",
"function whitelist(address) view returns (bool)",
"function stakes(address, uint256) view returns (uint256 amount, uint256 startTime, uint256 lockDuration, uint256 rewardMultiplier, bool claimed, uint256 uncertaintyGenerated)",
"function totalStaked(address) view returns (uint256)",
"function communityPoints(address) view returns (uint256)",
"function getContractStats() view returns (uint256, uint256, uint256, uint256, uint256)",
"function getUserStakes(address) view returns (tuple(uint256 amount, uint256 startTime, uint256 lockDuration, uint256 rewardMultiplier, bool claimed, uint256 uncertaintyGenerated)[])",
"function calculatePendingReward(address, uint256) view returns (uint256)",
"function getEntanglementInfo(address) view returns (uint256, uint256)",

// Write functions
"function buyPresale() payable",
"function stakeTokens(uint256 amount, uint256 lockDuration)",
"function unstakeTokens(uint256 stakeIndex)",
"function claimCommunityRewards()",
"function claimTeamTokens()",
"function createQuantumEntanglement(uint256 qtmAmount)",
"function claimEntangledRewards()",
"function breakQuantumEntanglement()",

// Events
"event PresalePurchase(address indexed buyer, uint256 phase, uint256 amount, uint256 tokens, uint256 bonus)",
"event TokensStaked(address indexed staker, uint256 amount, uint256 duration, uint256 stakeIndex)",
"event TokensUnstaked(address indexed staker, uint256 amount, uint256 reward, uint256 stakeIndex)",
]

export default function Web3Integration() {
const [account, setAccount] = useState(null)
const [contract, setContract] = useState(null)
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')
const [success, setSuccess] = useState('')

// Contract data states
const [balance, setBalance] = useState('0')
const [contractStats, setContractStats] = useState(null)
const [userStakes, setUserStakes] = useState([])
const [presalePhase, setPresalePhase] = useState(null)
const [entanglementInfo, setEntanglementInfo] = useState(null)

// Separate form states for each staking period
const [stake30Amount, setStake30Amount] = useState('')
const [stake90Amount, setStake90Amount] = useState('')
const [stake180Amount, setStake180Amount] = useState('')
const [stake365Amount, setStake365Amount] = useState('')

// Other form states
const [buyAmount, setBuyAmount] = useState('')
const [entangleAmount, setEntangleAmount] = useState('')

const checkConnection = useCallback(async () => {
if (typeof window.ethereum !== 'undefined') {
try {
const accounts = await window.ethereum.request({ method: 'eth_accounts' })
if (accounts.length > 0) {
await connectWallet()
}
} catch (connectionError) {
console.error('Error checking connection:', connectionError)
}
}
}, [])

const loadContractData = useCallback(async () => {
if (!contract || !account) return

try {
setLoading(true)

// Load user balance
const userBalance = await contract.balanceOf(account)
setBalance(ethers.formatEther(userBalance))

// Load contract stats
const stats = await contract.getContractStats()
setContractStats({
totalSupply: ethers.formatEther(stats[0]),
totalStaked: ethers.formatEther(stats[1]),
totalPresaleSold: ethers.formatEther(stats[2]),
totalCommunityRewards: ethers.formatEther(stats[3]),
currentPhase: stats[4].toString()
})

// Load current presale phase
const currentPhase = await contract.currentPresalePhase()
const phaseData = await contract.presalePhases(currentPhase)
setPresalePhase({
name: phaseData.name,
price: ethers.formatEther(phaseData.price),
minPurchase: ethers.formatEther(phaseData.minPurchase),
maxPurchase: ethers.formatEther(phaseData.maxPurchase),
active: phaseData.active
})

// Load user stakes with proper field mapping
const stakes = await contract.getUserStakes(account)
setUserStakes(stakes
.filter((stake) => Number(stake[0]) > 0) // Filter out zero amount stakes
.map((stake, index) => ({
index,
amount: ethers.formatEther(stake[0]), // amount
startTime: new Date(Number(stake[1]) * 1000), // startTime
lockDuration: Math.round(Number(stake[2]) / (24 * 3600)), // lockDuration in days
rewardMultiplier: Number(stake[3]), // rewardMultiplier
claimed: stake[4], // claimed
uncertaintyGenerated: ethers.formatEther(stake[5]) // uncertaintyGenerated
}))
)

// Load entanglement info
try {
const entanglementData = await contract.getEntanglementInfo(account)
setEntanglementInfo({
entangledAmount: ethers.formatEther(entanglementData[0]),
pendingRewards: ethers.formatEther(entanglementData[1])
})
} catch (entanglementError) {
console.log("No entanglement data or cross-chain not enabled:", entanglementError)
setEntanglementInfo(null)
}

} catch (loadError) {
setError(`Failed to load contract data: ${loadError.message}`)
} finally {
setLoading(false)
}

}, [contract, account])

useEffect(() => {
checkConnection()
}, [checkConnection])

useEffect(() => {
if (account && contract) {
loadContractData()
}
}, [account, contract, loadContractData])

const connectWallet = async () => {
if (typeof window.ethereum === 'undefined') {
setError('MetaMask is not installed. Please install MetaMask to continue.')
return
}

try {
setLoading(true)
setError('')

// Request account access
const accounts = await window.ethereum.request({
method: 'eth_requestAccounts'
})

// Switch to Sepolia network
try {
await window.ethereum.request({
method: 'wallet_switchEthereumChain',
params: [{ chainId: SEPOLIA_CHAIN_ID }],
})
} catch (switchError) {
if (switchError.code === 4902) {
await window.ethereum.request({
method: 'wallet_addEthereumChain',
params: [{
chainId: SEPOLIA_CHAIN_ID,
chainName: 'Sepolia Testnet',
nativeCurrency: {
name: 'ETH',
symbol: 'ETH',
decimals: 18
},
rpcUrls: ['https://sepolia.infura.io/v3/'],
blockExplorerUrls: ['https://sepolia.etherscan.io/']
}]
})
}
}

setAccount(accounts[0])

// Initialize contract
if (window.ethereum) {
const provider = new ethers.BrowserProvider(window.ethereum)
const signer = await provider.getSigner()
const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
setContract(contractInstance)
setSuccess('Wallet connected successfully!')
}
} catch (walletError) {
setError(`Connection failed: ${walletError.message}`)
} finally {
setLoading(false)
}

}

const buyPresale = async () => {
if (!contract || !buyAmount) return

try {
setLoading(true)
setError('')

const tx = await contract.buyPresale({
value: ethers.parseEther(buyAmount)
})

setSuccess('Presale purchase initiated! Transaction hash: ' + tx.hash)
await tx.wait()
setSuccess('Presale purchase confirmed!')

await loadContractData()
setBuyAmount('')
} catch (buyError) {
setError(`Presale purchase failed: ${buyError.message}`)
} finally {
setLoading(false)
}

}

const stakeTokens = async (amount, duration) => {
if (!contract || !amount) return

try {
setLoading(true)
setError('')

const amountWei = ethers.parseEther(amount)
const durationSeconds = duration * 24 * 3600 // Convert days to seconds

const tx = await contract.stakeTokens(amountWei, durationSeconds)
setSuccess('Staking initiated! Transaction hash: ' + tx.hash)
await tx.wait()
setSuccess(`Tokens staked successfully for ${duration} days!`)

await loadContractData()

// Clear the specific amount field
if (duration === 30) setStake30Amount('')
if (duration === 90) setStake90Amount('')
if (duration === 180) setStake180Amount('')
if (duration === 365) setStake365Amount('')

} catch (stakeError) {
setError(`Staking failed: ${stakeError.message}`)
} finally {
setLoading(false)
}

}

const unstakeTokens = async (stakeIndex) => {
if (!contract) return

try {
setLoading(true)
setError('')

const tx = await contract.unstakeTokens(stakeIndex)
setSuccess('Unstaking initiated! Transaction hash: ' + tx.hash)
await tx.wait()
setSuccess('Tokens unstaked successfully!')

await loadContractData()
} catch (unstakeError) {
setError(`Unstaking failed: ${unstakeError.message}`)
} finally {
setLoading(false)
}

}

const createEntanglement = async () => {
if (!contract || !entangleAmount) return

try {
setLoading(true)
setError('')

const amount = ethers.parseEther(entangleAmount)
const tx = await contract.createQuantumEntanglement(amount)
setSuccess('Quantum entanglement initiated! Transaction hash: ' + tx.hash)
await tx.wait()
setSuccess('Quantum entanglement created successfully!')

await loadContractData()
setEntangleAmount('')
} catch (entanglementError) {
setError(`Quantum entanglement failed: ${entanglementError.message}`)
} finally {
setLoading(false)
}

}

const claimEntangledRewards = async () => {
if (!contract) return

try {
setLoading(true)
setError('')

const tx = await contract.claimEntangledRewards()
setSuccess('Claiming entangled rewards! Transaction hash: ' + tx.hash)
await tx.wait()
setSuccess('Entangled rewards claimed successfully!')

await loadContractData()
} catch (claimError) {
setError(`Claiming rewards failed: ${claimError.message}`)
} finally {
setLoading(false)
}

}

const breakEntanglement = async () => {
if (!contract) return

try {
setLoading(true)
setError('')

const tx = await contract.breakQuantumEntanglement()
setSuccess('Breaking quantum entanglement! Transaction hash: ' + tx.hash)
await tx.wait()
setSuccess('Quantum entanglement broken successfully!')

await loadContractData()
} catch (breakError) {
setError(`Breaking entanglement failed: ${breakError.message}`)
} finally {
setLoading(false)
}

}

const formatAddress = (address) => {
if (!address) return ''
return `${address.slice(0, 6)}...${address.slice(-4)}`
}

const getAPYForDuration = (days) => {
if (days >= 365) return '24%'
if (days >= 180) return '18%'
if (days >= 90) return '15%'
return '12%'
}

const getMultiplierText = (days) => {
if (days >= 365) return '2.0x'
if (days >= 180) return '1.5x'
if (days >= 90) return '1.25x'
return '1.0x'
}

// Pending Rewards Component
const PendingRewards = ({ contract: rewardContract, account: rewardAccount, stakeIndex, stake }) => {
const [pendingReward, setPendingReward] = useState('0')

useEffect(() => {
const fetchPendingReward = async () => {
if (!rewardContract || !rewardAccount || stake.claimed) {
setPendingReward('0')
return
}

try {
const reward = await rewardContract.calculatePendingReward(rewardAccount, stakeIndex)
setPendingReward(ethers.formatEther(reward))
} catch (rewardError) {
console.log("Failed to fetch pending reward:", rewardError)
setPendingReward('0')
}
}

fetchPendingReward()
const interval = setInterval(fetchPendingReward, 30000) // Update every 30 seconds

return () => clearInterval(interval)
}, [rewardContract, rewardAccount, stakeIndex, stake.claimed])

return (
<span className="text-yellow-400">
{parseFloat(pendingReward).toFixed(4)} QTM
</span>
)

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
<span className="quantum-text-gradient">Web3 Interface</span>
</h2>
<p className="text-gray-300 text-lg max-w-2xl mx-auto">
Connect your MetaMask wallet and interact with the QTM smart contract
</p>
</motion.div>

<div className="max-w-6xl mx-auto">
{/* Connection Status */}
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
className="quantum-card mb-8"
>
<div className="flex flex-col md:flex-row items-center justify-between">
<div>
<h3 className="text-xl font-semibold mb-2">Wallet Connection</h3>
{account ? (
<div className="space-y-2">
<p className="text-green-400">✅ Connected: {formatAddress(account)}</p>
<p className="text-gray-300">Balance: {balance} QTM</p>
</div>
) : (
<p className="text-red-400">❌ Not connected</p>
)}
</div>

{!account && (
<motion.button
onClick={connectWallet}
disabled={loading}
className="quantum-button mt-4 md:mt-0"
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
>
{loading ? 'Connecting...' : 'Connect MetaMask'}
</motion.button>
)}
</div>
</motion.div>

{/* Error/Success Messages */}
{error && (
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 text-red-300"
>
{error}
</motion.div>
)}

{success && (
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-6 text-green-300"
>
{success}
</motion.div>
)}

{account && contract && (
<>
<div className="grid md:grid-cols-2 gap-8 mb-8">
{/* Contract Stats */}
<motion.div
initial={{ opacity: 0, x: -20 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 0.6, delay: 0.1 }}
className="quantum-card"
>
<h3 className="text-xl font-semibold mb-4 quantum-text-gradient">Contract Statistics</h3>
{contractStats && (
<div className="space-y-3">
<div className="flex justify-between">
<span>Total Supply:</span>
<span>{parseFloat(contractStats.totalSupply).toLocaleString()} QTM</span>
</div>
<div className="flex justify-between">
<span>Total Staked:</span>
<span>{parseFloat(contractStats.totalStaked).toLocaleString()} QTM</span>
</div>
<div className="flex justify-between">
<span>Presale Sold:</span>
<span>{parseFloat(contractStats.totalPresaleSold).toLocaleString()} QTM</span>
</div>
<div className="flex justify-between">
<span>Current Phase:</span>
<span>{contractStats.currentPhase}</span>
</div>
</div>
)}
</motion.div>

{/* Presale Purchase */}
<motion.div
initial={{ opacity: 0, x: 20 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 0.6, delay: 0.2 }}
className="quantum-card"
>
<h3 className="text-xl font-semibold mb-4 quantum-text-gradient">Buy Presale</h3>
{presalePhase && (
<div className="space-y-4">
<div className="text-sm text-gray-400">
<p>Phase: {presalePhase.name}</p>
<p>Price: {presalePhase.price} ETH per token</p>
<p>Min: {presalePhase.minPurchase} ETH | Max: {presalePhase.maxPurchase} ETH</p>
</div>

<input
type="number"
placeholder="Amount in ETH"
value={buyAmount}
onChange={(e) => setBuyAmount(e.target.value)}
className="w-full p-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white"
step="0.01"
/>

<motion.button
onClick={buyPresale}
disabled={loading || !buyAmount || !presalePhase.active}
className="w-full quantum-button"
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
>
{loading ? 'Processing...' : 'Buy QTM'}
</motion.button>
</div>
)}
</motion.div>
</div>

{/* Separate Staking Panels */}
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
{/* 30 Days Staking */}
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: 0.1 }}
className="quantum-card"
>
<h4 className="text-lg font-semibold mb-2 text-blue-400">30 Days</h4>
<div className="text-sm text-gray-400 mb-4">
<p>APY: 12%</p>
<p>Multiplier: 1.0x</p>
</div>
<input
type="number"
placeholder="Amount"
value={stake30Amount}
onChange={(e) => setStake30Amount(e.target.value)}
className="w-full p-2 mb-3 bg-gray-800/50 border border-blue-500/30 rounded text-white text-sm"
/>
<motion.button
onClick={() => stakeTokens(stake30Amount, 30)}
disabled={loading || !stake30Amount}
className="w-full quantum-button text-sm"
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
>
{loading ? 'Processing...' : 'Stake 30D'}
</motion.button>
</motion.div>

{/* 90 Days Staking */}
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: 0.2 }}
className="quantum-card"
>
<h4 className="text-lg font-semibold mb-2 text-green-400">90 Days</h4>
<div className="text-sm text-gray-400 mb-4">
<p>APY: 15%</p>
<p>Multiplier: 1.25x</p>
</div>
<input
type="number"
placeholder="Amount"
value={stake90Amount}
onChange={(e) => setStake90Amount(e.target.value)}
className="w-full p-2 mb-3 bg-gray-800/50 border border-green-500/30 rounded text-white text-sm"
/>
<motion.button
onClick={() => stakeTokens(stake90Amount, 90)}
disabled={loading || !stake90Amount}
className="w-full quantum-button text-sm"
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
>
{loading ? 'Processing...' : 'Stake 90D'}
</motion.button>
</motion.div>

{/* 180 Days Staking */}
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: 0.3 }}
className="quantum-card"
>
<h4 className="text-lg font-semibold mb-2 text-purple-400">180 Days</h4>
<div className="text-sm text-gray-400 mb-4">
<p>APY: 18%</p>
<p>Multiplier: 1.5x</p>
</div>
<input
type="number"
placeholder="Amount"
value={stake180Amount}
onChange={(e) => setStake180Amount(e.target.value)}
className="w-full p-2 mb-3 bg-gray-800/50 border border-purple-500/30 rounded text-white text-sm"
/>
<motion.button
onClick={() => stakeTokens(stake180Amount, 180)}
disabled={loading || !stake180Amount}
className="w-full quantum-button text-sm"
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
>
{loading ? 'Processing...' : 'Stake 180D'}
</motion.button>
</motion.div>

{/* 365 Days Staking */}
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: 0.4 }}
className="quantum-card"
>
<h4 className="text-lg font-semibold mb-2 text-yellow-400">365 Days</h4>
<div className="text-sm text-gray-400 mb-4">
<p>APY: 24%</p>
<p>Multiplier: 2.0x</p>
</div>
<input
type="number"
placeholder="Amount"
value={stake365Amount}
onChange={(e) => setStake365Amount(e.target.value)}
className="w-full p-2 mb-3 bg-gray-800/50 border border-yellow-500/30 rounded text-white text-sm"
/>
<motion.button
onClick={() => stakeTokens(stake365Amount, 365)}
disabled={loading || !stake365Amount}
className="w-full quantum-button text-sm"
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
>
{loading ? 'Processing...' : 'Stake 365D'}
</motion.button>
</motion.div>
</div>

{/* Quantum Entanglement */}
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: 0.5 }}
className="quantum-card mb-8"
>
<h3 className="text-xl font-semibold mb-4 quantum-text-gradient">Quantum Entanglement</h3>
<p className="text-sm text-gray-400 mb-4">
Lock QTM tokens for PARADOX integration (150% rewards)
</p>

<div className="grid md:grid-cols-2 gap-6">
{/* Create Entanglement */}
<div>
<h4 className="text-lg font-semibold mb-3 text-purple-400">Create Entanglement</h4>
<div className="flex gap-3">
<input
type="number"
placeholder="Amount to entangle"
value={entangleAmount}
onChange={(e) => setEntangleAmount(e.target.value)}
className="flex-1 p-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white"
/>

<motion.button
onClick={createEntanglement}
disabled={loading || !entangleAmount}
className="quantum-button px-6"
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
>
{loading ? 'Processing...' : 'Entangle'}
</motion.button>
</div>
</div>

{/* Entanglement Status */}
<div>
<h4 className="text-lg font-semibold mb-3 text-purple-400">Your Entanglements</h4>
{entanglementInfo ? (
<div className="space-y-3">
<div className="bg-gray-800/30 p-3 rounded-lg">
<div className="flex justify-between text-sm">
<span>Entangled Amount:</span>
<span className="text-purple-400">{entanglementInfo.entangledAmount} QTM</span>
</div>
<div className="flex justify-between text-sm">
<span>Pending Rewards:</span>
<span className="text-green-400">{entanglementInfo.pendingRewards} QTM</span>
</div>
</div>

<div className="flex gap-2">
<motion.button
onClick={claimEntangledRewards}
disabled={loading || entanglementInfo.pendingRewards === '0'}
className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-full text-sm transition-colors"
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
>
Claim Rewards
</motion.button>

<motion.button
onClick={breakEntanglement}
disabled={loading || entanglementInfo.entangledAmount === '0'}
className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-full text-sm transition-colors"
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
>
Break Entanglement
</motion.button>
</div>
</div>
) : (
<div className="text-gray-500 text-sm">
No active entanglements
</div>
)}
</div>
</div>
</motion.div>

{/* User Stakes Display */}
{userStakes.length > 0 && (
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: 0.6 }}
className="quantum-card"
>
<h3 className="text-xl font-semibold mb-4 quantum-text-gradient">Your Stakes</h3>
<div className="overflow-x-auto">
<table className="w-full">
<thead>
<tr className="border-b border-blue-500/30">
<th className="text-left p-2">Amount</th>
<th className="text-left p-2">Duration</th>
<th className="text-left p-2">APY</th>
<th className="text-left p-2">Pending Rewards</th>
<th className="text-left p-2">Start Date</th>
<th className="text-left p-2">Status</th>
<th className="text-left p-2">Action</th>
</tr>
</thead>
<tbody>
{userStakes.map((stake, index) => (
<tr key={index} className="border-b border-gray-700/30">
<td className="p-2">{parseFloat(stake.amount).toFixed(2)} QTM</td>
<td className="p-2">{stake.lockDuration} days</td>
<td className="p-2">{getAPYForDuration(stake.lockDuration)}</td>
<td className="p-2">
<PendingRewards
contract={contract}
account={account}
stakeIndex={index}
stake={stake}
/>
</td>
<td className="p-2">{stake.startTime.toLocaleDateString()}</td>
<td className="p-2">
{stake.claimed ? (
<span className="text-gray-400">Claimed</span>
) : (
<span className="text-green-400">Active</span>
)}
</td>
<td className="p-2">
{!stake.claimed && (
<button
onClick={() => unstakeTokens(index)}
disabled={loading}
className="text-blue-400 hover:text-blue-300 text-sm"
>
Unstake
</button>
)}
</td>
</tr>
))}
</tbody>
</table>
</div>
</motion.div>
)}
</>
)}
</div>
</div>
</section>

)
}
