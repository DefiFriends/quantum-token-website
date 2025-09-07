import { NextResponse } from 'next/server'

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
{ error: 'Invalid wallet address' },
{ status: 400 }
)
}

// Send to Discord
const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL

if (discordWebhookUrl) {
const embed = {
title: "New Whitelist Request",
color: 0x0080FF,
fields: [
{ name: "Wallet Address", value: formData.walletAddress, inline: false },
{ name: "Email", value: formData.email, inline: true },
{ name: "Twitter", value: formData.twitterHandle || "Not provided", inline: true },
{ name: "Telegram", value: formData.telegramHandle || "Not provided", inline: true },
{ name: "Investment Amount", value: formData.investmentAmount || "Not specified", inline: true },
{ name: "Referral Code", value: formData.referralCode || "None", inline: true },
{ name: "Reason", value: formData.reason, inline: false }
],
timestamp: new Date().toISOString()
}

await fetch(discordWebhookUrl, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ embeds: [embed] })
})
}

return NextResponse.json({ success: true })

} catch (error) {
console.error('API error:', error)
return NextResponse.json(
{ error: 'Internal server error' },
{ status: 500 }
)
}
}