import { Link } from 'react-router-dom';
import './Hero.css'
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import HeroImg from '../../../assets/herobg.jpg'

function Hero({ content, setContent}) {
    const [text] = useTypewriter({
        words: ['Audience', 'Interaction', 'Awareness', 'Upvotes', 'Reposts'],
        loop: {},
        typeSpeed: 120,
        deleteSpeed: 80,
    });

  return (
    <div className='hero'>
        <div className="top">
            <span onClick={() => setContent('business')} className={`contentOption ${content === 'business' ? 'active1' : ''}`}>Business</span>
            <span onClick={() => setContent('freelance')} className={`contentOption ${content === 'freelance' ? 'active2' : ''}`}>Freelance</span>
        </div>

        <div className='body'>
            <div className="left">
            
                {
                    content === 'business' && (
                        <div className="content contentOne">
                            <h2 className='text'>Get More</h2>
                            <h2 className='text moreText'>
                                <span>{text}</span>
                                <Cursor cursorStyle='<' />
                            </h2>
                            <h2 className='text'>Get More Profit</h2>
                            <p>
                            Expand your business horizons and enhance your global presence.<br /> Elevate your brand visibility and attain your objectives with effective promotion.
                            </p>

                            <div className="btnCard">
                                <Link className='link btn btn-2' to='/register'>Post a Task</Link>
                                <Link className='link btn btn-1' to='/login'>sign in</Link>
                            </div>
                        </div>
                    )
                }

                {
                    content === 'freelance' && (
                        <div className="content contentTwo">
                            <h2 className='text'>Boost Income by completing simple task</h2>
                            <p>with superGig earn extra cash doing what you love</p>

                            <div className="btnCard">
                                <Link className='link btn btn-2' to='/register'>Complete a Task</Link>
                                <Link className='link btn btn-1' to='/login'>sign in</Link>
                            </div>
                        </div>
                    )
                }

            </div>

            <div className="right">
                <div className='imCard'>
                    <img src={HeroImg} alt='hero' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero