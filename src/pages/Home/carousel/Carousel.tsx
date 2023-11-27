// React Router
import { NavigateFunction, useNavigate } from 'react-router-dom'

// Assets
import img_location from '../../../assets/location.svg'
import img_clock from '../../../assets/clock2.svg'

const Carousel = () => {
    // Navigation
    const navigate: NavigateFunction = useNavigate();

    // Si se clickea en Order Food, se realiza un scroll hacia el Menú
    const scrollToSection = () => {
        const seccionDestino = document.getElementById('menuSeccion');
        if (seccionDestino) {
            seccionDestino.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <section>
            { /* CAROUSEL */ }
            <div className="hero h-[85vh] bg-[url('src/assets/carousel_img_primary.png')]">
                <div className="bg-opacity-70 hero-overlay"></div>
                <div className="text-center hero-content text-neutral-content">
                    <div className="max-w-md">
                        <h1 className='mb-1 text-xl max-md:text-lg'>Welcome to <span className='text-2xl font-bold text-primary'>Buen Sabor</span></h1>
                        <h1 className='text-5xl text-white max-md:text-4xl'>Feel The Autenthic & </h1>
                        <h1 className='text-5xl text-white max-md:text-4xl'>Orgin Of Food</h1>
                        <div>
                            <button className='mt-5 mr-5 btn btn-primary' onClick={scrollToSection}>Order Food</button>
                            <button className='btn btn-neutral' onClick={() => navigate('/about')}>About us</button>
                        </div>
                    </div>
                </div>
            </div>
            { /* RESTAURANT INFO */ }
            <div id='menuSeccion' className='flex flex-col justify-around w-full gap-5 mt-5 px-2 mb-3 min-[450px]:flex-row'>
                <div className='flex flex-row items-center'>
                    <img className='h-12 pr-4 max-md:h-10 max-sm:h-8' src={img_location} />
                    <div>
                        <h2 className='text-xs md:text-sm'>Locate us</h2>
                        <p className='text-xs md:text-sm'>Coronel Rodríguez 273, Mendoza</p>
                    </div>
                </div>
                <div className='flex flex-row items-center'>
                    <img className='h-12 pr-4 max-md:h-10 max-sm:h-8' src={img_clock}  />
                    <div>
                        <h2 className='text-xs md:text-sm'>Open hours</h2>
                        <p className='text-xs md:text-sm'>Mon To Fri 16:00PM - 24:00PM</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Carousel
