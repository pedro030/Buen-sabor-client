import React from 'react'
import './Carousel.scss'
import img_carousel from '../../assets/A0_MainDinning_Tight_v1s-1440x765.jpg'

const Carousel = () => {
    return (
        <section>
            <div className="carousel">
                <div className="text_carousel">
                    <h1>Welcome to <span>Buen Sabor</span></h1>
                    <h1 className='msg'>Feel The Autenthic & </h1>
                    <h1 className='msg'>Orgin Of Food</h1>
                    <button>Order Food</button>
                    <button className='btn_back'>Take Away</button>
                </div>
                <img className='img_carousel' src={img_carousel} />
            </div>
        </section>
    )
}

export default Carousel
