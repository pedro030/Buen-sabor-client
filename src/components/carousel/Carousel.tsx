import React from 'react'
import './Carousel.scss'
import img_carousel from '../../assets/carousel_img_primary.png'
import img_location from '../../assets/location.svg'
import img_clock from '../../assets/clock2.svg'

const Carousel = () => {

    function scrollToSection() {
        const seccionDestino = document.getElementById('menuSeccion');
        if (seccionDestino) {
            seccionDestino.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <section>
            <div className="hero h-[85vh] bg-[url('src/assets/carousel_img_primary.png')]">
                <div className="hero-overlay bg-opacity-50"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className='text-xl mb-1'>Welcome to <span className='text-xl text-primary'>Buen Sabor</span></h1>
                        <h1 className='text-5xl text-white'>Feel The Autenthic & </h1>
                        <h1 className='text-5xl text-white'>Orgin Of Food</h1>
                        <div>
                            <button className='mt-5 mr-5 btn btn-primary' onClick={scrollToSection}>Order Food</button>
                            <button className='btn btn-neutral' onClick={event => window.location.href = 'http://localhost:5173/about'}>About us</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className='grid w-full grid-cols-2 mt-5'>

                <div className='flex flex-row items-center justify-center'>
                    <img className='pr-4' src={img_location} height="50" />
                    <div>
                        <h2>Locate us</h2>
                        <p>Coronel Rodríguez 273, Mendoza</p>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-center'>
                    <img className='pr-4' src={img_clock} height="50" />
                    <div>
                        <h2>Open hours</h2>
                        <p>Mon To Fri 9:00AM - 9:00PM</p>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Carousel
