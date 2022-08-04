import React from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';
import { UsuarioContext } from '../Context/UsuarioContext';

// eslint-disable-next-line
import styles from './Header.css';

const Header = () => {
  const{usuarioActual, setUsuarioActual} = useContext(UsuarioContext);
  const navigate = useNavigate();

  const logout = () => {
    setUsuarioActual({
        _id: "",
        nombre: "",
        apellidos: "",
        telefono: "",
        email: "",
        imagen: ""
    })
    navigate('/');
  }

  let source = usuarioActual.imagen === null ? process.env.REACT_APP_SERVER_PUBLIC + "usuarios/undefined.jpg" : process.env.REACT_APP_SERVER_PUBLIC + "usuarios/" + usuarioActual.email + ".jpg";

  let sesion = null;
  if (usuarioActual.nombre !== "") {
    sesion =  <div className='navbar-Header'>
                <Link to="/">Inicio</Link>
                <Link to="/usuario">Perfil de {usuarioActual.nombre}</Link>
                <Link to="/reservas">Mis reservas</Link>
                <img className="user-image-Header" src={source} alt={usuarioActual.nombre} />
                <button onClick={logout}>Cerrar sesión</button>
              </div>
  } else {
    sesion =  <div className='navbar-Header'>
                <Link to="/">Inicio</Link>
                <Link to="/login">Iniciar sesión</Link>
              </div>
  }

  return (
    <header className="header-Header">
        <img className="logo-Header" src={logo} alt="Centro de masaje" />

        <h1>Centro de masaje</h1>

        {sesion}
    </header>
  )
};

export default Header;
