import './AboutComponent.scss'
import asiel from "../../assets/asiel.png"

const About = () => {
  return (
    <div className="AboutComponent">
      <div className="container">
        <h1>Integrantes</h1>
        <table>
          <thead>
            <tr>
              <th>Alejo Araya</th>
              <th>Rodrigo Vargas</th>
              <th>Asiel Álvarez</th>
              <th>Pedro Contreras</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href="https://github.com/Shacaso" target="_blank"><img src="https://avatars.githubusercontent.com/u/82895574?v=4" alt="alejo" /></a></td>
              <td><a href="https://github.com/RodrigoXVargas" target="_blank"><img src="https://avatars.githubusercontent.com/u/90809287?v=4" alt="rodrigo" /></a></td>
              <td><a href="https://github.com/aSI3L" target="_blank"><img src={asiel} alt="asiel" /></a></td>
              <td><a href="https://github.com/pedro030" target="_blank"><img src="https://avatars.githubusercontent.com/u/66505351?v=4" alt="pedro" /></a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default About