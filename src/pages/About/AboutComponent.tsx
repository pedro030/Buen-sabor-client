import Header from '../../components/header/Header'
import './AboutComponent.scss'

const About = () => {
  return (
    <>
    <Header/>
    <div className=" bg-base-100 w-full h-[28rem]  max-lg:h-[23rem] text-center pt-5">
      <h1 className='mb-10 text-2xl stat-title'>Integrantes</h1>

      <div className='flex place-content-center'> 
        <div className="grid grid-cols-4 gap-4 text-lg text-center place-items-center max-lg:gap-3">

          <div>
            <h1 className='mb-1 text-2xl font-bold text-primary max-lg:text-lg'>Araya Alejo</h1>

            <a href="https://github.com/Shacaso" target="_blank" className="hero w-64 h-64  max-lg:w-44 max-lg:h-44 hover:shadow-[inset_0_40rem_40rem_0_rgba(0,0,0,.7)] transition-all duration-700 ease-in-out rounded-full bg-[url(https://avatars.githubusercontent.com/u/82895574?v=4)]">
              <div className="bg-opacity-60"></div>
              <div className="text-center hero-content text-neutral-content">
                <div className="max-w-md">
                  {/* <h1 className='text-2xl font-bold text-primary hover:inline'>Araya Alejo</h1> */}
                </div>
              </div>
            </a>
          </div>

          <div>
            <h1 className='mb-1 text-2xl font-bold text-primary max-lg:text-lg'>Rodrigo Vargas</h1>

            <a href="https://github.com/RodrigoXVargas" target="_blank" className="hero w-64 h-64  max-lg:w-44 max-lg:h-44 hover:shadow-[inset_0_40rem_40rem_0_rgba(0,0,0,.7)] transition-all duration-700 ease-in-out rounded-full bg-[url(https://avatars.githubusercontent.com/u/90809287?v=4)]" >
              <div className="bg-opacity-60"></div>
              <div className="text-center hero-content text-neutral-content">
                <div className="max-w-md">
                  {/* <h1 className='text-2xl font-bold text-primary hover:inline'>Araya Alejo</h1> */}
                </div>
              </div>
            </a>
          </div>

          <div>
            <h1 className='mb-1 text-2xl font-bold text-primary max-lg:text-lg'>Pedro Contreras</h1>

            <a href="https://github.com/pedro030" target="_blank" className="hero w-64 h-64 max-lg:w-44 max-lg:h-44 hover:shadow-[inset_0_40rem_40rem_0_rgba(0,0,0,.7)] transition-all duration-700 ease-in-out rounded-full bg-[url(https://avatars.githubusercontent.com/u/66505351?v=4)]" >
              <div className="bg-opacity-60"></div>
              <div className="text-center hero-content text-neutral-content">
                <div className="max-w-md">
                  {/* <h1 className='text-2xl font-bold text-primary hover:inline'>Araya Alejo</h1> */}
                </div>
              </div>
            </a>
          </div>

          <div>
            <h1 className='mb-1 text-2xl font-bold text-primary max-lg:text-lg'>Asiel Álvarez</h1>

            <a href="https://github.com/aSI3L" target="_blank" className="hero w-64 h-64  max-lg:w-44 max-lg:h-44 hover:shadow-[inset_0_40rem_40rem_0_rgba(0,0,0,.7)] transition-all duration-700 ease-in-out rounded-full bg-[url(https://avatars.githubusercontent.com/u/104910483?v=4)]" >
              <div className="bg-opacity-60"></div>
              <div className="text-center hero-content text-neutral-content">
                <div className="max-w-md">
                  {/* <h1 className='text-2xl font-bold text-primary hover:inline'>Araya Alejo</h1> */}
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default About