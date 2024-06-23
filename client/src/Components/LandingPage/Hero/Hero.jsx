import { Link } from 'react-router-dom'
import './Hero.css'
import HeroImg from '../../../assets/one.jpg'

function Hero() {
  return (
    <div className='hero'>
        <div className='componentWidth heroCard'>
          {/**
           * 
          <div className="bonus">
            <h2>Get up to</h2> <br />
            <span>15%</span> <br />
            <p>deposit bonus</p>
          </div>
           */}

            <div className="left">
                <h1>Get More</h1>
                <div className="floatingText">
                  <div clasName='words'>
                    <span>Followers</span>
                    <span>Sales</span>
                    <span>Comments</span>
                    <span>Audinces</span>
                    <span>Votes</span>
                  </div>
                </div>

                <p>
                  With supergig, get Real, Organic <span>Audience</span>, <span> Engagement</span>,
                  <span> Attention</span>, <span>Retweets</span>,
                  <span className='bold'> Profits!.</span>
                </p>

                <p className="textMuted">
                  No bots. No fake users. Build your community
                </p>

                <div className="cta">
                  <Link className="link" to='/register'>Get Started</Link>
                </div>
            </div>

            <div className="right">
              <img src={HeroImg} alt='More followers more sales more profits' />
            </div>
        </div>
    </div>
  )
}

export default Hero