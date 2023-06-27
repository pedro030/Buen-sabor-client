import './AboutComponent.scss'
import asiel from "../../assets/asiel.png"

const About = () => {
  return (
    <div className="grid place-items-center bg-base-100 w-full h-[500px]">
      <div className="text-center text-lg">
        <h1 className='stat-title text-2xl mb-5'>Integrantes</h1>
        <table>
          <thead>
            <tr>
              <th className='w-72'>Alejo Araya</th>
              <th className='w-72'>Rodrigo Vargas</th>
              <th className='w-72'>Asiel Álvarez</th>
              <th className='w-72'>Pedro Contreras</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href="https://github.com/Shacaso" target="_blank"><img className='rounded-full h-64 w-64' src="https://avatars.githubusercontent.com/u/82895574?v=4" alt="alejo" /></a></td>
              <td><a href="https://github.com/RodrigoXVargas" target="_blank"><img className='rounded-full h-64 w-64' src="https://avatars.githubusercontent.com/u/90809287?v=4" alt="rodrigo" /></a></td>
              <td><a href="https://github.com/aSI3L" target="_blank"><img className='rounded-full h-64 w-64' src={asiel} alt="asiel" /></a></td>
              <td><a href="https://github.com/pedro030" target="_blank"><img className='rounded-full h-64 w-64' src="https://avatars.githubusercontent.com/u/66505351?v=4" alt="pedro" /></a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default About