import './Slide.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Slide({data}) {

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
    
         
  return (
    <div className='slide'>
        <h1>Take charge of your brand online reputation</h1>
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
    </div>
  )
}

export default Slide