import React from 'react'
import './Carousel.scss'
import img_carousel from '../../assets/A0_MainDinning_Tight_v1s-1440x765.jpg'

const Carousel = () => {
    return(
        <section>
            <div className="carousel">
                <img className='img_carousel' src={img_carousel} />
            </div>
        </section>
    )
}

export default Carousel
