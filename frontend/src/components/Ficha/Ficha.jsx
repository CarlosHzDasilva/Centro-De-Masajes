import React from 'react';
import { useLocation, Link } from 'react-router-dom';

// eslint-disable-next-line
import styles from './Ficha.css';

const Ficha = () => {
  // eslint-disable-next-line
    const {_id, tratamiento, descripcion, precio} = useLocation().state;
  return (
    <main className="ficha-Ficha">
        <section className='imagen-Ficha'>
          <img src={process.env.REACT_APP_SERVER_PUBLIC + "tratamientos/" + ((tratamiento).replace(/ /g, "-")) + ".png"} alt={tratamiento} />
          <Link className="reservar-Ficha" to="/reservas">Hacer una reserva</Link>
        </section>
        <div className='contenedor-Ficha'>
          <section className='tratamiento-Ficha'><span className="titulo-Ficha">Tratamiento:</span><span>{tratamiento}</span></section>
          <section className='descripcion-Ficha'><span className="titulo-Ficha">Descripción:</span><span>{descripcion}</span></section>
          <section className='precio-Ficha'><span className="titulo-Ficha">Precio:</span><span>{precio},00€</span></section>
        </div>
    </main>
  )
}

export default Ficha;
