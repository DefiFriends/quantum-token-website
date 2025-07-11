'use client'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function PrivacyPolicy() {
return (
<main className="relative min-h-screen">
<Header />
<div className="pt-32 pb-16">
<div className="container mx-auto px-6 max-w-4xl">
<motion.div
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
>
<h1 className="text-4xl font-bold mb-8 quantum-text-gradient">Privacy Policy</h1>
<div className="quantum-card">
<div className="prose prose-invert max-w-none">
<p className="text-gray-300 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

<h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
<p className="text-gray-300 mb-6">
Quantum Token ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.
</p>

<h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
<ul className="text-gray-300 mb-6 space-y-2">
<li>• To provide and maintain our services</li>
<li>• To notify you about changes to our services</li>
<li>• To provide customer support</li>
<li>• To gather analysis or valuable information to improve our services</li>
<li>• To monitor the usage of our services</li>
</ul>

<h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
<p className="text-gray-300 mb-6">
The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure.
</p>

<h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Services</h2>
<p className="text-gray-300 mb-6">
Our service may contain links to other sites that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
</p>

<h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
<p className="text-gray-300">
If you have any questions about this Privacy Policy, please contact us at: privacy@qtmtoken.com
</p>
</div>
</div>
</motion.div>
</div>
</div>
<Footer />
</main>
)
}