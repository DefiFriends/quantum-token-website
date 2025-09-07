
'use client'
import { useState, useEffect } from 'react'

export default function AdminDashboard() {
const [submissions, setSubmissions] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')
const [adminKey, setAdminKey] = useState('')
const [authenticated, setAuthenticated] = useState(false)

const authenticate = () => {
// Simple authentication - in production, use proper auth
if (adminKey === 'quantum-admin-2025') {
setAuthenticated(true)
fetchSubmissions()
} else {
setError('Invalid admin key')
}
}

const fetchSubmissions = async () => {
try {
setLoading(true)
const response = await fetch('/api/whitelist')
const data = await response.json()

if (response.ok) {
setSubmissions(data.submissions || [])
} else {
setError('Failed to fetch submissions')
}
} catch (fetchError) {
setError('Network error')
} finally {
setLoading(false)
}

}

const copyAddresses = () => {
const addresses = submissions.map(sub => sub.walletAddress).join('\n')
navigator.clipboard.writeText(addresses)
alert('Wallet addresses copied to clipboard!')
}

const exportCSV = () => {
const headers = ['Timestamp', 'Wallet Address', 'Email', 'Twitter', 'Telegram', 'Investment Amount', 'Referral Code', 'Reason']
const csvContent = [
headers.join('',''),
submissions.map(sub => [
sub.timestamp,
sub.walletAddress,
sub.email,
sub.twitterHandle || '',
sub.telegramHandle || '',
sub.investmentAmount || '',
sub.referralCode || '',
`"${sub.reason.replace(/"/g, '""')}"`
].join('',''))
].join('\n')

const blob = new Blob([csvContent], { type: 'text/csv' })
const url = URL.createObjectURL(blob)
const a = document.createElement('a')
a.href = url
a.download = `whitelist_submissions_${new Date().toISOString().split('T')[0]}.csv`
a.click()
URL.revokeObjectURL(url)

}

if (!authenticated) {
return (
<div className="min-h-screen bg-gray-900 flex items-center justify-center">
<div className="bg-gray-800 p-8 rounded-lg max-w-md w-full">
<h1 className="text-2xl font-bold text-white mb-6">Admin Access</h1>
<input
type="password"
placeholder="Enter admin key"
value={adminKey}
onChange={(e) => setAdminKey(e.target.value)}
className="w-full p-3 bg-gray-700 text-white rounded mb-4"
onKeyPress={(e) => e.key === 'Enter' && authenticate()}
/>
<button
onClick={authenticate}
className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded"
>
Access Dashboard
</button>
{error && <p className="text-red-400 mt-4">{error}</p>}
</div>
</div>
)
}

return (
<div className="min-h-screen bg-gray-900 p-6">
<div className="max-w-7xl mx-auto">
<div className="flex justify-between items-center mb-8">
<h1 className="text-3xl font-bold text-white">Whitelist Submissions</h1>
<div className="space-x-4">
<button
onClick={fetchSubmissions}
className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
>
Refresh
</button>
<button
onClick={copyAddresses}
className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
disabled={submissions.length === 0}
>
Copy Addresses
</button>
<button
onClick={exportCSV}
className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
disabled={submissions.length === 0}
>
Export CSV
</button>
</div>
</div>

{loading && <p className="text-white">Loading submissions...</p>}

{error && <p className="text-red-400 mb-4">{error}</p>}

<div className="bg-gray-800 rounded-lg p-6">
<div className="mb-4">
<p className="text-gray-300">
Total Submissions: <span className="text-white font-bold">{submissions.length}</span>
</p>
</div>

{submissions.length === 0 ? (
<p className="text-gray-400">No submissions yet.</p>
) : (
<div className="overflow-x-auto">
<table className="w-full text-sm">
<thead>
<tr className="border-b border-gray-700">
<th className="text-left p-3 text-gray-300">ID</th>
<th className="text-left p-3 text-gray-300">Timestamp</th>
<th className="text-left p-3 text-gray-300">Wallet Address</th>
<th className="text-left p-3 text-gray-300">Email</th>
<th className="text-left p-3 text-gray-300">Socials</th>
<th className="text-left p-3 text-gray-300">Investment</th>
<th className="text-left p-3 text-gray-300">Reason</th>
<th className="text-left p-3 text-gray-300">IP</th>
</tr>
</thead>
<tbody>
{submissions.map((submission) => (
<tr key={submission.id} className="border-b border-gray-700 hover:bg-gray-700/50">
<td className="p-3 text-gray-300">{submission.id}</td>
<td className="p-3 text-gray-300">
{new Date(submission.timestamp).toLocaleString()}
</td>
<td className="p-3">
<span className="font-mono text-blue-400 text-xs">
{submission.walletAddress}
</span>
</td>
<td className="p-3 text-gray-300">{submission.email}</td>
<td className="p-3 text-gray-300">
{submission.twitterHandle && (
<div>Twitter: {submission.twitterHandle}</div>
)}
{submission.telegramHandle && (
<div>Telegram: {submission.telegramHandle}</div>
)}
</td>
<td className="p-3 text-gray-300">{submission.investmentAmount || 'Not specified'}</td>
<td className="p-3 text-gray-300 max-w-xs">
<div className="truncate" title={submission.reason}>
{submission.reason}
</div>
</td>
<td className="p-3 text-gray-400 text-xs">{submission.ipAddress}</td>
</tr>
))}
</tbody>
</table>
</div>
)}
</div>

<div className="mt-8 bg-gray-800 rounded-lg p-6">
<h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
<div className="grid md:grid-cols-3 gap-4">
<div className="bg-gray-700 p-4 rounded">
<h3 className="font-semibold text-white mb-2">Add to Whitelist</h3>
<p className="text-gray-300 text-sm mb-3">
Copy addresses and add them to your smart contract whitelist via Etherscan.
</p>
<button
onClick={copyAddresses}
className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm"
disabled={submissions.length === 0}
>
Copy All Addresses
</button>
</div>

<div className="bg-gray-700 p-4 rounded">
<h3 className="font-semibold text-white mb-2">Export Data</h3>
<p className="text-gray-300 text-sm mb-3">
Download all submission data as CSV for external processing.
</p>
<button
onClick={exportCSV}
className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded text-sm"
disabled={submissions.length === 0}
>
Download CSV
</button>
</div>

<div className="bg-gray-700 p-4 rounded">
<h3 className="font-semibold text-white mb-2">Contract Integration</h3>
<p className="text-gray-300 text-sm mb-3">
Use Etherscan Write Contract to call addToWhitelist function.
</p>
<button
onClick={() => window.open('https://sepolia.etherscan.io/address/0x46D1Dc0753F202b70851E195c1d14CEA4a7D78b3#writeContract', '_blank')}
className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm"
>
Open Etherscan
</button>
</div>
</div>
</div>

<div className="mt-6 text-center">
<button
onClick={() => setAuthenticated(false)}
className="text-gray-400 hover:text-gray-300 underline"
>
Logout
</button>
</div>
</div>
</div>

)
}
