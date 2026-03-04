
import { NextResponse } from 'next/server'

// In-memory storage for submissions (resets on each deployment)
// For production, you'd use a database like PostgreSQL, MongoDB, or Vercel KV
let whitelistSubmissions = []

export async function GET() {
try {
return NextResponse.json({
submissions: whitelistSubmissions,
count: whitelistSubmissions.length
})
} catch (err) {
console.error('GET error:', err)
return NextResponse.json(
{ error: 'Failed to fetch submissions' },
{ status: 500 }
)
}
}

export async function POST(request) {
try {
const formData = await request.json()

// Validate required fields
if (!formData.walletAddress || !formData.email || !formData.reason) {
return NextResponse.json(
{ error: 'Missing required fields' },
{ status: 400 }
)
}

// Validate wallet address format
if (!formData.walletAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
return NextResponse.json(
{ error: 'Invalid wallet address format' },
{ status: 400 }
)
}

// Validate email format
if (!formData.email.includes('@') || !formData.email.includes('.')) {
return NextResponse.json(
{ error: 'Invalid email format' },
{ status: 400 }
)
}

// Check for duplicate wallet addresses
const existingSubmission = whitelistSubmissions.find(
sub => sub.walletAddress.toLowerCase() === formData.walletAddress.toLowerCase()
)

if (existingSubmission) {
return NextResponse.json(
{ error: 'Wallet address already submitted' },
{ status: 409 }
)
}

// Create submission object
const submission = {
id: Date.now(),
walletAddress: formData.walletAddress,
email: formData.email,
twitterHandle: formData.twitterHandle || '',
telegramHandle: formData.telegramHandle || '',
reason: formData.reason,
investmentAmount: formData.investmentAmount || '',
referralCode: formData.referralCode || '',
timestamp: new Date().toISOString(),
status: 'pending',
ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
}

// Store submission
whitelistSubmissions.push(submission)

// Send Discord notifications (privacy-protected)
await sendDiscordNotifications(submission)

return NextResponse.json({
success: true,
message: 'Whitelist application submitted successfully',
submissionId: submission.id
})

} catch (err) {
console.error('POST error:', err)
return NextResponse.json(
{ error: 'Internal server error' },
{ status: 500 }
)
}
}

// ==========================================
// PRIVACY-PROTECTED DISCORD NOTIFICATIONS
// ==========================================
async function sendDiscordNotifications(submission) {
// Helper function: Shorten wallet address
const shortenWallet = (wallet) => {
if (!wallet || wallet.length < 10) return wallet
return '${wallet.slice(0, 6)}...${wallet.slice(-4)}'
}
// ==========================================
// PUBLIC WEBHOOK - PRIVACY PROTECTED
// ==========================================
const publicWebhookUrl = process.env.DISCORD_WEBHOOK_URL

if (publicWebhookUrl) {
try {
const publicEmbed = {
title: "🎉 New Pioneer Joined!",
color: 0x0080FF, // Quantum blue
fields: [
{
name: "Wallet Address",
value: '\'${shortenWallet(submission.walletAddress)}',
inline: false
},
{
name: "Twitter",
value: submission.twitterHandle || "Not provided",
inline: true
},
{
name: "Telegram",
value: submission.telegramHandle || "Not provided",
inline: true
},
{
name: "Message",
value: submission.reason.length > 200
? submission.reason.substring(0, 200) + "…"
: submission.reason,
inline: false
}
],
timestamp: submission.timestamp,
footer: {
text: "Welcome to the Quantum Revolution! ⚛️"
}
}

await fetch(publicWebhookUrl, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
content: "🌟 **New Whitelist Application Received!**",
embeds: [publicEmbed]
})
})

} catch (error) {
console.error('Public Discord notification failed:', error)
}

}

// ==========================================
// ADMIN WEBHOOK - FULL DETAILS (PRIVATE)
// ==========================================
const adminWebhookUrl = process.env.DISCORD_ADMIN_WEBHOOK_URL

if (adminWebhookUrl) {
try {
const adminEmbed = {
title: "🔒 New Whitelist Application (Admin View)",
color: 0xFF0000, // Red for admin
fields: [
{
name: "Full Wallet Address",
value: '\'${submission.walletAddress}', inline: false }, { name: "Email", value: '${submission.email}', inline: false }, { name: "Twitter", value: submission.twitterHandle || "Not provided", inline: true }, { name: "Telegram", value: submission.telegramHandle || "Not provided", inline: true }, { name: "Investment Amount", value: submission.investmentAmount || "Not specified", inline: true }, { name: "Referral Code", value: submission.referralCode || "None", inline: true }, { name: "Reason", value: submission.reason.length > 1000 ? submission.reason.substring(0, 1000) + "..." : submission.reason, inline: false }, { name: "Submission ID", value: '${submission.id}', inline: true }, { name: "IP Address", value: '${submission.ipAddress}',
inline: true
}
],
timestamp: submission.timestamp,
footer: {
text: "⚠️ ADMIN ONLY - DO NOT SHARE"
}
}

await fetch(adminWebhookUrl, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
content: "🔐 **Admin: New Whitelist Submission**",
embeds: [adminEmbed]
})
})

} catch (error) {
console.error('Admin Discord notification failed:', error)
}

}
}

// Admin endpoint to export submissions (protect this in production)
export async function DELETE(request) {
try {
const { searchParams } = new URL(request.url)
const adminKey = searchParams.get('key')

// Simple admin protection - use environment variable for admin key
if (adminKey !== process.env.ADMIN_KEY) {
return NextResponse.json(
{ error: 'Unauthorized' },
{ status: 401 }
)
}

whitelistSubmissions = []
return NextResponse.json({ message: 'All submissions cleared' })

} catch (err) {
console.error('DELETE error:', err)
return NextResponse.json(
{ error: 'Failed to clear submissions' },
{ status: 500 }
)
}
}
