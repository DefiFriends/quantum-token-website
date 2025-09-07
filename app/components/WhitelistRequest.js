
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

const handleInputChange = (e) => {
const { name, value } = e.target
setFormData(prev => ({
prev,
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

if (!formData.email.includes('@')) {
setError('Please enter a valid email address')
return false
}

return true


}

const sendToDiscord = async (data) => {
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1412170496170266705/X8-hytjGZZDS2SYCI4l8E6B2P6pO6GjuU1wFggpT1Q7DNVRdfceRtOr_AqYWJ-Rtdiyu"

const embed = {
title: "New Whitelist Request",
color: 0x0080FF,
fields: [
{ name: "Wallet Address", value: data.walletAddress, inline: false },
{ name: "Email", value: data.email, inline: true },
{ name: "Twitter", value: data.twitterHandle || "Not provided", inline: true },
{ name: "Telegram", value: data.telegramHandle || "Not provided", inline: true },
{ name: "Investment Amount", value: data.investmentAmount || "Not specified", inline: true },
{ name: "Referral Code", value: data.referralCode || "None", inline: true },
{ name: "Reason", value: data.reason, inline: false }
],
timestamp: new Date().toISOString()
}

try {
await fetch(DISCORD_WEBHOOK_URL, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ embeds: [embed] })
})
} catch (discordError) {
console.log('Discord notification failed:', discordError)
}

}

const handleSubmit = async (e) => {
e.preventDefault()

if (!validateForm()) return

setIsSubmitting(true)
setError('')

try {
// Store in localStorage as primary method
const requests = JSON.parse(localStorage.getItem('whitelistRequests') || '[]')
requests.push({
...formData,
timestamp: new Date().toISOString(),
id: Date.now()
})
localStorage.setItem('whitelistRequests', JSON.stringify(requests))

// Try Discord webhook (may fail due to CORS but won't break the form)
try {
await sendToDiscord(formData)
} catch (discordError) {
console.log('Discord notification failed, but form submitted successfully:', discordError)
}

setSubmitted(true)
} catch (submitError) {
setError('Submission failed. Please try again.')
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
<h2 className="text-3xl font-bold mb-4 quantum-text-gradient">Request Submitted!</h2>
<p className="text-gray-300 mb-6">
Thank you for your interest in the Quantum Token presale. Your whitelist request has been submitted successfully.
</p>
<div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
<h3 className="font-semibold mb-2 text-blue-400">What happens next?</h3>
<ul className="text-sm text-gray-300 space-y-1 text-left">
<li>• Our team will review your application within 24-48 hours</li>
<li>• You'll receive an email confirmation once approved</li>
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
<div className="w-12 h-12 quantum-glow rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
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
<div className="w-12 h-12 quantum-glow rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-xl">
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
className="w-full p-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
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
className="w-full p-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
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
className="w-full p-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
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
className="w-full p-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
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
className="w-full p-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-500"
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
className="w-full p-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
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
</div>

{error && (
<div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-300 text-sm">
{error}
</div>
)}

<motion.button
type="submit"
disabled={isSubmitting}
className="w-full quantum-button text-lg py-4"
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
>
{isSubmitting ? 'Submitting...' : 'Request Whitelist Access'}
</motion.button>

<p className="text-xs text-gray-500 text-center">
* Required fields. We&apos;ll review applications within 24-48 hours.
</p>
</form>
</motion.div>
</div>
</div>
</div>
</section>

)
}
