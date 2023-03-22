import React from 'react'
import './Carousel.scss'
import img_carousel from '../../assets/A0_MainDinning_Tight_v1s-1440x765.jpg'
import clock from '../../assets/clock2.svg'
import location from '../../assets/location.svg'

const Carousel = () => {
    return (
        <section>
            <div className="carousel">
                <div className="text_carousel">
                    <h1>Welcome to <span>Buen Sabor</span></h1>
                    <h1 className='msg'>Feel The Autenthic & </h1>
                    <h1 className='msg'>Orgin Of Food</h1>
                    <button>Order Food</button>
                    <button className='btn_back'>About us</button>
                </div>
                <img className='img_carousel' src={img_carousel} />
                <div className='info'>

                    <div className='detail_info'>
                        <img src={location} height="50" />
                        <div className="text">
                        <h2>Locate us</h2>
                        <p>Coronel Rodríguez 273, Mendoza</p>
                        </div>
                    </div>
                    <div className='detail_info'>
                        <img src={clock} height="50" />
                        <div className="text">
                        <h2>Open hours</h2>
                        <p>Mon To Fri 9:00AM - 9:00PM</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Carousel
