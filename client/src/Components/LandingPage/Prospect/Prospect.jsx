import './Prospect.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { whyUs, whyUsImg } from '../../../data/whyUs';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

function Prospect({data}) {
  const textData = whyUs
  const imgData = whyUsImg

    var settings = {
        speed: 500,
        //dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        //pauseOnHover: true,
        responsive: [
          {      
            breakpoint: 950,
            settings: {
              //dots: true,
              infinite: true,
              slidesToShow: 3,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 1000,
              //pauseOnHover: true,
            } 
          },
          {      
            breakpoint: 450,
            settings: {
              //dots: true,
              infinite: true,
              slidesToShow: 2,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 1000,
              //pauseOnHover: true,
            } 
          },
        ]
      }


      const [ current, setCurrent ] = useState(0)
      const length = imgData?.length
      const timeout = useRef(null)
  
      useEffect(() => {
          const nextSlide = () => {
            setCurrent((current) => (current === length - 1 ? 0 : current + 1)) // Increment current
            //console.log('CURRENT 1', current)
          }
          timeout.current = setTimeout(nextSlide, 6000)
      
          return function () {
            if (timeout.current) {
              clearTimeout(timeout.current)
              //console.log('CURRENT 2', current)
            }
          }
        }, [current, length])
  
  
      if(!Array.isArray(imgData) || imgData.length <= 0){
          return null
      }


  return (
    <div className='prospect'>
        <div className="prospectContainer">
            <h1>Take charge, <span>Grow</span> your brand online reputation</h1>
            <p className="text">
            Trusted and used for organic online growth and promotion by leading influencers, brands and individuals.
            </p>
            <div className="btn">
              <Link className='button link'>
                Get Started
              </Link>
            </div>
            <p>We provide value across a range of your preferred platforms, including, but not restricted to, the following</p>
                <div className="imgCard">
                    <Slider {...settings}>
                        {
                            data.map((item, idx) => (
                                    <img style={{width: '50px'}} key={idx}  src={item?.img} alt='platform' />
                                    ))
                                }
                    </Slider>
                </div>

            <div className="whyUs">
              <h1>Why Choose Supergig?</h1>

              <div className="content">
                <div className="left">
                {
                    textData.map((item) => (
                        <div className="card">
                            <img src={item?.img} alt={item?.title}/>
                            <h2>{item?.title}</h2>
                            <p>{item?.text}</p>
                        </div>
                    ))
                }
                </div>

                <div className="right">
                  <div className="imgCardRight">
                    <div className="contentRight">
                        {
                            imgData.map((item, idx) => {
                                return (
                                    <div key={item?._id} className="card">
                                        {
                                            idx === current && (
                                                <img src={item?.img} alt='why choose us' />
                                            )
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                  </div>
                </div>
              </div>
            </div>    
        </div>

    </div>
  )
}

export default Prospect