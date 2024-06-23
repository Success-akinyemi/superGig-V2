import React from 'react'
import Navbar from '../../Components/LandingPage/Navbar/Navbar'
import Hero from '../../Components/LandingPage/Hero/Hero'
import Prospect from '../../Components/LandingPage/Prospect/Prospect'
import { platform } from '../../data/platform'
import Accordion from '../../Components/LandingPage/Accordion/Accordion'
import Footer from '../../Components/LandingPage/Footer/Footer'
import UseCase from '../../Components/LandingPage/UseCase/UseCase'
import { useCases } from '../../data/useCase'

function LandingPage() {
  return (
    <div className='landingPage'>
      <Navbar />
      <Hero />
      <Prospect data={platform} />
      <UseCase data={useCases} />
      <Accordion />
      <Footer />
    </div>
  )
}

export default LandingPage