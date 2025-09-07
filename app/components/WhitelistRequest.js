
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function WhitelistRequest() {
const [formData, setFormData] = useState({
walletAddress: '',
email: '',
twitterHandle: '',
telegramHandle: '',
reason: '',
investmentAmount: '',
referralCode: ''
})
const [isSubmitting, setIsSubmitting] = useState(false)
const [submitted, setSubmitted] = useState(false)
const [error, setError] = useState('')
const [submissionId, setSubmissionId] = useState(null)

const handleInputChange = (e) => {
const { name, value } = e.target
setFormData(prev => ({
...prev,
[name]: value
}))
}

const validateForm = () => {
if (!formData.walletAddress || !formData.email || !formData.reason) {
setError('Please fill in all required fields')
return false
}

if (!formData.walletAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
setError('Please enter a valid Ethereum wallet address')
return false
}

if (!formData.email.includes('@') || !formData.email.includes('.')) {
setError('Please enter a valid email address')
return false
}

if (formData.reason.length < 10) {
setError('Please provide a more detailed reason (at least 10 characters)')
return false
}

return true

}

const handleSubmit = async (e) => {
e.preventDefault()

if (!validateForm()) return

setIsSubmitting(true)
setError('')

try {
const response = await fetch('/api/whitelist', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(formData),
})

const data = await response.json()

if (response.ok) {
setSubmissionId(data.submissionId)
setSubmitted(true)

// Clear form data
setFormData({
walletAddress: '',
email: '',
twitterHandle: '',
telegramHandle: '',
reason: '',
investmentAmount: '',
referralCode: ''
})
} else {
throw new Error(data.error || 'Submission failed')
}
} catch (submitError) {
setError(submitError.message || 'Network error. Please try again.')
} finally {
setIsSubmitting(false)
}

}

if (submitted) {
return (
<section className="quantum-section bg-gray-900/50">
<div className="container mx-auto px-6">
<motion.div
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.8 }}
className="max-w-2xl mx-auto text-center"
>
<div className="quantum-card">
<div className="text-6xl mb-6">🎉</div>
<h2 className="text-3xl font-bold mb-4 quantum-text-gradient">Application Submitted!</h2>
<p className="text-gray-300 mb-4">
Thank you for your interest in the Quantum Token presale. Your whitelist application has been submitted successfully.
</p>

{submissionId && (
<div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-6">
<p className="text-sm text-blue-400">
Submission ID: <span className="font-mono">{submissionId}</span>
</p>
<p className="text-xs text-gray-400 mt-1">
Save this ID for reference
</p>
</div>
)}

<div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
<h3 className="font-semibold mb-2 text-blue-400">What happens next?</h3>
<ul className="text-sm text-gray-300 space-y-1 text-left">
<li>• Our team will review your application within 24-48 hours</li>
<li>• You will receive an email confirmation once approved</li>
<li>• Approved addresses will be added to the smart contract whitelist</li>
<li>• Follow our social media for presale announcements</li>
<li>• Join our community channels for updates</li>
</ul>
</div>

<div className="flex flex-col sm:flex-row gap-4 justify-center">
<motion.button
onClick={() => window.open('https://t.me/QuantumTokenOfficial', '_blank')}
className="quantum-button"
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
>
Join Telegram
</motion.button>
<motion.button
onClick={() => window.open('https://twitter.com/QuantumDefiQTM', '_blank')}
className="border-2 border-blue-500 px-6 py-3 rounded-full text-blue-400 font-semibold hover:bg-blue-500/10 transition-all duration-300"
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
>
Follow Twitter
</motion.button>
</div>

<motion.button
onClick={() => {
setSubmitted(false)
setSubmissionId(null)
}}
className="mt-6 text-gray-400 hover:text-gray-300 text-sm underline"
whileHover={{ scale: 1.05 }}
>
Submit another application
</motion.button>
</div>
</motion.div>
</div>
</section>
)

}

return (
<section id="whitelist" className="quantum-section bg-gray-900/50">
<div className="container mx-auto px-6">
<motion.div
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
className="text-center mb-12"
>
<h2 className="text-4xl md:text-5xl font-bold mb-6 quantum-title">
<span className="quantum-text-gradient">Join the Whitelist</span>
</h2>
<p className="text-gray-300 text-lg max-w-2xl mx-auto">
Get early access to the Quantum Token presale. Limited spots available for Phases 0 and 1.
</p>
</motion.div>

<div className="max-w-4xl mx-auto">
<div className="grid lg:grid-cols-2 gap-12 items-start">
{/* Benefits Section */}
<motion.div
initial={{ opacity: 0, x: -30 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 0.8 }}
>
<h3 className="text-2xl font-bold mb-6 quantum-text-gradient">Whitelist Benefits</h3>

<div className="space-y-6">
<div className="quantum-card">
<div className="flex items-start space-x-4">
<div className="w-12 h-12 quantum-glow rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
1
</div>
<div>
<h4 className="text-lg font-semibold mb-2 text-blue-400">Phase 0: Quantum Pioneers</h4>
<ul className="text-sm text-gray-300 space-y-1">
<li>• Price: 0.000001 ETH per QTM</li>
<li>• 20% bonus tokens</li>
<li>• Early supporter additional 20% bonus</li>
<li>• 30-day exclusive access</li>
</ul>
</div>
</div>
</div>

<div className="quantum-card">
<div className="flex items-start space-x-4">
<div className="w-12 h-12 quantum-glow rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-xl">
2
</div>
<div>
<h4 className="text-lg font-semibold mb-2 text-green-400">Phase 1: Probability Wave</h4>
<ul className="text-sm text-gray-300 space-y-1">
<li>• Price: 0.000015 ETH per QTM</li>
<li>• 10% bonus tokens</li>
<li>• Priority access before public sale</li>
<li>• 45-day window</li>
</ul>
</div>
</div>
</div>

<div className="quantum-card">
<div className="flex items-start space-x-4">
<div className="w-12 h-12 quantum-glow rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-xl">
∞
</div>
<div>
<h4 className="text-lg font-semibold mb-2 text-purple-400">Exclusive Benefits</h4>
<ul className="text-sm text-gray-300 space-y-1">
<li>• Priority PARADOX token access</li>
<li>• Special community role</li>
<li>• Quantum uncertainty bonuses</li>
<li>• Governance participation</li>
</ul>
</div>
</div>
</div>
</div>
</motion.div>

{/* Application Form */}
<motion.div
initial={{ opacity: 0, x: 30 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 0.8 }}
className="quantum-card"
>
<h3 className="text-2xl font-bold mb-6 quantum-text-gradient">Application Form</h3>

<form onSubmit={handleSubmit} className="space-y-6">
<div>
<label className="block text-sm font-medium text-gray-300 mb-2">
Wallet Address *
</label>
<input
type="text"
name="walletAddress"
value={formData.walletAddress}
onChange={handleInputChange}
placeholder="0x..."
className="w-full p-3 bg-gray-800/50 border border-blue-500/30 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
required
/>
</div>

<div>
<label className="block text-sm font-medium text-gray-300 mb-2">
Email Address *
</label>
<input
type="email"
name="email"
value={formData.email}
onChange={handleInputChange}
placeholder="your@email.com"
className="w-full p-3 bg-gray-800/50 border border-blue-500/30 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
required
/>
</div>

<div className="grid md:grid-cols-2 gap-4">
<div>
<label className="block text-sm font-medium text-gray-300 mb-2">
Twitter Handle
</label>
<input
type="text"
name="twitterHandle"
value={formData.twitterHandle}
onChange={handleInputChange}
placeholder="@yourusername"
className="w-full p-3 bg-gray-800/50 border border-blue-500/30 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
/>
</div>

<div>
<label className="block text-sm font-medium text-gray-300 mb-2">
Telegram Handle
</label>
<input
type="text"
name="telegramHandle"
value={formData.telegramHandle}
onChange={handleInputChange}
placeholder="@yourusername"
className="w-full p-3 bg-gray-800/50 border border-blue-500/30 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
/>
</div>
</div>

<div>
<label className="block text-sm font-medium text-gray-300 mb-2">
Planned Investment Amount (ETH)
</label>
<select
name="investmentAmount"
value={formData.investmentAmount}
onChange={handleInputChange}
className="w-full p-3 bg-gray-800/50 border border-blue-500/30 rounded-full text-white focus:outline-none focus:border-blue-500"
>
<option value="">Select amount</option>
<option value="0.05-1">0.05 - 1 ETH</option>
<option value="1-5">1 - 5 ETH</option>
<option value="5-10">5 - 10 ETH</option>
<option value="10+">10+ ETH</option>
</select>
</div>

<div>
<label className="block text-sm font-medium text-gray-300 mb-2">
Referral Code (if any)
</label>
<input
type="text"
name="referralCode"
value={formData.referralCode}
onChange={handleInputChange}
placeholder="Optional referral code"
className="w-full p-3 bg-gray-800/50 border border-blue-500/30 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
/>
</div>

<div>
<label className="block text-sm font-medium text-gray-300 mb-2">
Why do you want to join our whitelist? *
</label>
<textarea
name="reason"
value={formData.reason}
onChange={handleInputChange}
placeholder="Tell us about your interest in quantum-powered DeFi..."
rows={4}
className="w-full p-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
required
/>
<p className="text-xs text-gray-500 mt-1">
Minimum 10 characters. Be specific about your interest in quantum mechanics and DeFi.
</p>
</div>

{error && (
<div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-300 text-sm">
{error}
</div>
)}

<motion.button
type="submit"
disabled={isSubmitting}
className="w-full quantum-button text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
whileHover={!isSubmitting ? { scale: 1.02 } : {}}
whileTap={!isSubmitting ? { scale: 0.98 } : {}}
>
{isSubmitting ? 'Submitting Application...' : 'Apply for Whitelist'}
</motion.button>

<p className="text-xs text-gray-500 text-center">
* Required fields. Applications are reviewed within 24-48 hours.
<br />
Each wallet address can only submit one application.
</p>
</form>
</motion.div>
</div>
</div>
</div>
</section>

)
}
