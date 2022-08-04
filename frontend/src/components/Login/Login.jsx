import React from 'react';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { enlacesHttp } from '../Librerias/accesoAPI';
import { UsuarioContext } from '../Context/UsuarioContext';

// eslint-disable-next-line
import styles from './Login.css';

const Login = () => {
  const { setUsuarioActual } = useContext(UsuarioContext);
  const [password, setPassword] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const showPassword = () => {
    setPassword(password ? false : true)
  }

  const cambios = (e) => {
    const { name, value } = e.target;
    setInput(prevInput => {
      return {
        ...prevInput,
        [name]: value
      }
    })
  }

  const login = (e) => {
    e.preventDefault();
    let api = enlacesHttp();
    let opciones = {};
    opciones.headers = {
      "Content-Type": "application/json",
      "email": input.email,
      "password": input.password
    };
    api.get(process.env.REACT_APP_SERVER_LOGIN, opciones)
      .then(respuesta => {
        if (respuesta.Error) {
          setMensaje(respuesta.Error);
        } else {
          setMensaje("Sesión iniciada con éxito");
          setUsuarioActual({
            _id: respuesta._id,
            nombre: respuesta.nombre,
            apellidos: respuesta.apellidos,
            email: respuesta.email,
            telefono: respuesta.telefono,
            imagen: respuesta.imagen,
            password: input.password
          });
          navigate('/usuario');
        }
      });
  }

  return (
    <main className='formulario-Login'>
      <div className="camposFormulario-Login">
        <label htmlFor="email">Email: </label>
        <input onChange={cambios} value={input.email} name='email' type="email" placeholder="Introduzca su email..." />
      </div>
      <div className="camposFormulario-Login">
        <label htmlFor="password">Contraseña: </label>
        <input onChange={cambios} value={input.password} name='password' type={password ? "text" : "password"} placeholder="Introduzca su contraseña..." />
      </div>
      <div className="show-password-Register">
        <label>Mostrar contraseña</label>
        <input onClick={showPassword} type="checkbox" id="show-Register" />
      </div>
      <button onClick={login}>Iniciar sesión</button>
      <div className="registro-Login">
        <span>¿No está registrado?</span><Link to="/register">Regístrate</Link>
      </div>
      <span>{mensaje}</span>
    </main>
  )
}

export default Login;