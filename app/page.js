'use client'
import Header from './components/Header'
import Hero from './components/Hero'
import Web3Integration from './components/Web3Integration'
import PioneersSection from './components/PioneersSection'
import AboutContract from './components/Aboutcontract'
import WhitelistRequest from './components/WhitelistRequest'
import About from './components/About'
import Tokenomics from './components/Tokenomics'
import Roadmap from './components/Roadmap'
import Community from './components/Community'
import Footer from './components/Footer'
import WhitepaperSection from './components/WhitepaperSection'
import AdminDashboard from './admin/page'

export default function Home() {
return (
<main className="relative">
<Header />
<Hero />
<Web3Integration />
<PioneersSection />
<AboutContract />
<WhitelistRequest/>
<About />
<Tokenomics />
<Roadmap />
<Community />
<Footer />
<WhitepaperSection />
<AdminDashboard></AdminDashboard>
</main>
)
}