// React Router
import { NavigateFunction, useNavigate } from 'react-router-dom'

// Assets
import img_location from '../../../assets/location.svg'
import img_clock from '../../../assets/clock2.svg'

const Carousel = () => {
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

            <div id='menuSeccion' className='grid w-full grid-cols-2 mt-5 mb-3'>

                <div className='flex flex-row items-center justify-center'>
                    <img className='h-12 pr-4 max-md:h-10 max-sm:h-8' src={img_location} />
                    <div>
                        <h2 className='max-md:text-sm max-sm:text-xs'>Locate us</h2>
                        <p className='max-md:text-sm max-sm:text-xs'>Coronel Rodríguez 273, Mendoza</p>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-center'>
                    <img className='h-12 pr-4 max-md:h-10 max-sm:h-8' src={img_clock}  />
                    <div>
                        <h2 className='max-md:text-sm max-sm:text-xs'>Open hours</h2>
                        <p className='max-md:text-sm max-sm:text-xs'>Mon To Fri 9:00AM - 9:00PM</p>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default Carousel
