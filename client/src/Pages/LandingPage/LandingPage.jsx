import { useState } from 'react'
import Navbar from '../../Components/LandingPage/Navbar/Navbar'
import './LandingPage.css'
import Hero from '../../Components/LandingPage/Hero/Hero'
import Slide from '../../Components/LandingPage/Slide/Slide'
import { platform } from '../../data/platform'
import WhyUs from '../../Components/LandingPage/WhyUs/WhyUs'
import { whyUs, whyUsImg } from '../../data/whyUs'
import Footer from '../../Components/LandingPage/Footer/Footer'

function LandingPage() {
  const [ content, setContent ] = useState('business')
  const [ menuOpen, setMenuOpen ] = useState(false)

  const toggle = () => {
    setMenuOpen((prev) => !prev)
    console.log('MENU', menuOpen)
  }

  return (
    <div className='landingPage'>
        <Navbar setContent={setContent} toggle={toggle} menuOpen={menuOpen} />
      <div className='bodyContent heroCard'>
        <Hero content={content} setContent={setContent} />
      </div>
      <Slide data={platform} />
      <div className='bodyContent whyCard'>
        <WhyUs textData={whyUs} imgData={whyUsImg} />
      </div>


      <div className='bodyContent footerCard'>
        <Footer />
      </div>
    </div>
  )
}

export default LandingPage