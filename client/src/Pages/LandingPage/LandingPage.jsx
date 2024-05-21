import React from 'react'
import Navbar from '../../Components/LandingPage/Navbar/Navbar'
import Hero from '../../Components/LandingPage/Hero/Hero'
import Prospect from '../../Components/LandingPage/Prospect/Prospect'
import { platform } from '../../data/platform'
import Accordion from '../../Components/LandingPage/Accordion/Accordion'
import Footer from '../../Components/LandingPage/Footer/Footer'

function LandingPage() {
  return (
    <div className='landingPage'>
      <Navbar />
      <Hero />
      <Prospect data={platform} />
      <Accordion />
      <Footer />
    </div>
  )
}

export default LandingPage