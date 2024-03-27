import { useEffect, useRef, useState } from 'react'
import './ImageSlider.css'

function ImageSlider({slides}) {
    const timeRef = useRef(null)
    const [ currentSlide, setCurrentSlide ] = useState(0)

    const slideStyle = {
        width: '100%',
        height: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        //backgroundImage: `${slides[currentSlide].image}`
        backgroundColor: `${slides[currentSlide].color}`
    }

    const goPrev = () => {
        const isFirstslide = currentSlide === 0
        const newSlide = isFirstslide ? slides.length - 1 : currentSlide - 1
        setCurrentSlide(newSlide)
    }

    const goNext = () => {
        const isLastSlide = currentSlide === slides.length - 1
        const newSlide = isLastSlide ? 0 : currentSlide + 1
        setCurrentSlide(newSlide)
    }

    useEffect(() => {
        timeRef.current = setTimeout(() => {
            goNext()
        }, 2000)

        // Clean up the timeout when component unmounts or currentSlide changes
        return () => clearTimeout(timeRef.current)
    }, [currentSlide])
    
  return (
    <div className='imageSlider'>
        <div className="rightArrw" onClick={goPrev}>&gt;</div>
        <div className="leftArrw" onClick={goNext}>&lt;</div>
        <div style={slideStyle}>
        </div>
    </div>
  )
}

export default ImageSlider