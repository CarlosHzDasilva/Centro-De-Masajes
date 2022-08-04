/* eslint-disable eqeqeq */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { enlacesHttp } from '../Librerias/accesoAPI';

// eslint-disable-next-line
import styles from './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const[password, setPassword] = useState(false);
  const showPassword = () => {
    setPassword(password ? false : true)
  }

  const[foto, setFoto] = useState("");

  const[mensaje, setMensaje] = useState("");

  const[input, setInput] = useState({
    nombre: "",
    apellidos: "",
    telefono: "",
    email: "",
    password1: "",
    password2: ""
  })

  const cargaFoto = (e) => {
    let fr = new FileReader();
    fr.onload = function() {
      setFoto(fr.result);
    }
    fr.readAsDataURL(e.target.files[0]);
  }

  const aceptar = (e) => {
    e.preventDefault();

    if (input.password1 != input.password2) {
      setMensaje("Las contraseñas no coinciden")
    } else {
      setMensaje("");

      const Usuario = {
        imagen: foto,
        nombre: input.nombre,
        apellidos: input.apellidos,
        telefono: input.telefono,
        email: input.email,
        password: input.password1
      }

      let opciones = {};
      let api = enlacesHttp();
      opciones.method = "POST";
      opciones.headers = {
        "Content-Type": "application/json"
      };
      opciones.body = JSON.stringify(Usuario);
      api.post(process.env.REACT_APP_SERVER_USUARIOS, opciones)
        .then(respuesta => console.log(respuesta))
      navigate('/login');
    }
  }

  const cambios = (e) => {
    const {name, value} = e.target;
      setInput(prevInput => {
        return {
          ...prevInput,
          [name]: value
        }
      })
    }

  return (
    <main className='formulario-Register'>
      <div className='notificacion-Register'>
        <p id="mensaje-Register">{mensaje}</p>
      </div>
      <div className="camposFormulario-Register">
        <label htmlFor="foto">Foto de perfil: </label>
        <input className="foto-Register" onChange={cargaFoto}  name='foto' type="file" />
      </div>
      <div className="camposFormulario-Register">
        <label htmlFor="nombre">Nombre: </label>
        <input onChange={cambios} value={input.nombre} name='nombre' type="text" placeholder="Introduzca su nombre..." />
      </div>
      <div className="camposFormulario-Register">
        <label htmlFor="apellidos">Apellidos: </label>
        <input onChange={cambios} value={input.apellidos} name='apellidos' type="text" placeholder="Introduzca sus apellidos..." />
      </div>
      <div className="camposFormulario-Register">
        <label htmlFor="telefono">Número de teléfono: </label>
        <input onChange={cambios} value={input.telefono} name='telefono' type="text" placeholder="555-555-555" />
      </div>
      <div className="camposFormulario-Register">
        <label htmlFor="email">Email: </label>
        <input onChange={cambios} value={input.email} name='email' type="email" placeholder="usuario@email.com" />
      </div>
      <div className="camposFormulario-Register">
        <label htmlFor="password">Contraseña: </label>
        <input onChange={cambios} value={input.password1} id="password1" name='password1' type={password ? "text" : "password"} placeholder="Introduzca su contraseña..." />
      </div>
      <div className="camposFormulario-Register">
        <label htmlFor="password-repeat">Repetir contraseña: </label>
        <input onChange={cambios} value={input.password2} id="password2" name='password2' type={password ? "text" : "password"} placeholder="Repita su contraseña..." />
      </div>
      <div className="show-password-Register">
        <label htmlFor="show-password">Mostrar contraseñas</label>
        <input onClick={showPassword} type="checkbox" name="show-password" id="show-Register" />
      </div>
      <button onClick={aceptar} type='submit'>Registrar</button>
    </main>
  )
}

export default Register;