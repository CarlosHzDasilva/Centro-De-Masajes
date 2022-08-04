import React, { useEffect, useState } from 'react';
import { enlacesHttp } from '../Librerias/accesoAPI';
import { Link } from 'react-router-dom';
// eslint-disable-next-line
import styles from './Home.css';

const LandingPage = () => {
  const [registros, setRegistros] = useState([]);
  useEffect(() => {
    let api = enlacesHttp();
    api.get(process.env.REACT_APP_SERVER_TRATAMIENTOS)
      .then(data => setRegistros(data))
  }, [])
  return (
    <main className='main-Home'>
        <h2>Bienvenido a la página principal del Centro de Masaje</h2>
        <p>Puede disfrutar de los siguientes tratamientos:</p>
        <ul className='cardList-Home'>
          {registros.map((element) => 
            <li className="card-Home" key={(element._id)}>
              <img className="imagenTratamiento-Home" src={process.env.REACT_APP_SERVER_PUBLIC + "/tratamientos/" + ((element.tratamiento).replace(/ /g, "-")) + ".png"} alt={element.tratamiento} />
              {element.tratamiento}
              <Link className="informacion-Home" to="/ficha" state={element}>Más información</Link>
            </li>)}
        </ul>
    </main>
  )
};

export default LandingPage;