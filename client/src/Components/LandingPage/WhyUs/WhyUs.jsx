import { useEffect, useRef, useState } from 'react'
import './WhyUs.css'

function WhyUs({textData, imgData}) {
    const [ current, setCurrent ] = useState(0)
    const length = imgData?.length
    const timeout = useRef(null)

    useEffect(() => {
        const nextSlide = () => {
          setCurrent((current) => (current === length - 1 ? 0 : current + 1)) // Increment current
          console.log('CURRENT 1', current)
        }
        timeout.current = setTimeout(nextSlide, 3000)
    
        return function () {
          if (timeout.current) {
            clearTimeout(timeout.current)
            console.log('CURRENT 2', current)
          }
        }
      }, [current, length])


    if(!Array.isArray(imgData) || imgData.length <= 0){
        return null
    }

  return (
    <div className='whyUs'>
        <h1>Why choose Supergig ?</h1>

        <div className="bodyInfo">
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
            <div className="rigth">
                <div className="imgCard">
                    <div className="content">
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
  )
}

export default WhyUs