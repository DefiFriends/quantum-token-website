
import { NextResponse } from 'next/server'

// In-memory storage for submissions (resets on each deployment)
// For production, you’d use a database like PostgreSQL, MongoDB, or Vercel KV
let whitelistSubmissions = []

export async function GET() {
try {
return NextResponse.json({
submissions: whitelistSubmissions,
count: whitelistSubmissions.length
})
} catch (err) {
  console.error('Database error:', err)
  return NextResponse.json({ error: 'Database error' }, { status: 500 })
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

// Optional: Send Discord notification if webhook URL is provided
await sendDiscordNotification(submission)

return NextResponse.json({
success: true,
message: 'Whitelist application submitted successfully',
submissionId: submission.id
})

} catch (error) {
console.error('API error:', error)
return NextResponse.json(
{ error: 'Internal server error' },
{ status: 500 }
)
}
}

async function sendDiscordNotification(submission) {
const webhookUrl = process.env.DISCORD_WEBHOOK_URL

if (!webhookUrl) {
return // Skip if no webhook configured
}

try {
const embed = {
title: "New Whitelist Application",
color: 0x0080FF,
fields: [
{ name: "Wallet Address", value: submission.walletAddress, inline: false },
{ name: "Email", value: submission.email, inline: true },
{ name: "Twitter", value: submission.twitterHandle || "Not provided", inline: true },
{ name: "Telegram", value: submission.telegramHandle || "Not provided", inline: true },
{ name: "Investment Amount", value: submission.investmentAmount || "Not specified", inline: true },
{ name: "Referral Code", value: submission.referralCode || "None", inline: true },
{ name: "Reason", value: submission.reason.length > 1000 ? submission.reason.substring(0, 1000) + "…" : submission.reason, inline: false },
{ name: "Submission ID", value: submission.id.toString(), inline: true },
{ name: "IP Address", value: submission.ipAddress, inline: true }
],
timestamp: submission.timestamp,
footer: {
text: "Quantum Token Whitelist System"
}
}

await fetch(webhookUrl, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ embeds: [embed] })
})

} catch (discordError) {
console.error('Discord notification failed:', discordError)
// Don’t throw error - submission should still succeed even if Discord fails
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

} catch (error) {
return NextResponse.json(
{ err: 'Failed to clear submissions' },
{ status: 500 }
)
}
}
