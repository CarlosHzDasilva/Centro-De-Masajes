import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsuarioContext } from '../Context/UsuarioContext';
import { enlacesHttp } from '../Librerias/accesoAPI';

// eslint-disable-next-line
import styles from './Usuario.css';

const Usuario = () => {
  const { usuarioActual, setUsuarioActual } = useContext(UsuarioContext);
  const [input, setInput] = useState({
    nombre: "",
    apellidos: "",
    telefono: "",
    password1: "",
    password2: ""
  })
  const [actualizando, setActualizando] = useState(false);
  const [borrando, setBorrando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [foto, setFoto] = useState("");
  const navigate = useNavigate();

  const updateState = () => {
    setActualizando(!actualizando);
    setMensaje("");
  }

  const deleteState = () => {
    setBorrando(!borrando);
    setMensaje("");
  }

  const cargaFoto = (e) => {
    let fr = new FileReader();
    fr.onload = function () {
      setFoto(fr.result);
    }
    fr.readAsDataURL(e.target.files[0]);
  }

  const actualizar = () => {
    if (input.password2 === usuarioActual.password) {
      let Usuario = {
        id: usuarioActual._id,
        email: usuarioActual.email,
        password: "",
        nombre: "",
        apellidos: "",
        telefono: "",
        imagen: foto
      }
      Usuario.password = input.password1 === "" ? usuarioActual.password : input.password1;
      Usuario.nombre = input.nombre === "" ? usuarioActual.nombre : input.nombre;
      Usuario.apellidos = input.apellidos === "" ? usuarioActual.apellidos : input.apellidos;
      Usuario.telefono = input.telefono === "" ? usuarioActual.telefono : input.telefono;

      const api = enlacesHttp();
      let opciones = {};
      opciones.method = "PUT";
      opciones.headers = {
        "Content-Type": "application/json"
      }
      opciones.body = JSON.stringify(Usuario);
      api.remove(process.env.REACT_APP_SERVER_USUARIOS, opciones)
        .then(respuesta => {
          if (Usuario.imagen !== "") {
            Usuario.imagen = "";
          }
          setUsuarioActual({ ...Usuario });
          navigate('/');
        })
    } else {
      setMensaje("Datos incorrectos, revise los campos");
    }
  }

  const eliminar = () => {
    if (input.password2 === usuarioActual.password) {
      setMensaje("");

      const api = enlacesHttp();
      let opciones = {};
      opciones.method = "DELETE";
      opciones.headers = {
        "Content-Type": "application/json"
      }
      opciones.body = {
        id: usuarioActual._id,
        email: usuarioActual.email,
        imagen: usuarioActual.imagen
      }
      opciones.body = JSON.stringify(opciones.body);
      api.remove(process.env.REACT_APP_SERVER_USUARIOS, opciones)
        .then(respuesta => {
          setUsuarioActual({
            _id: "",
            nombre: "",
            apellidos: "",
            telefono: "",
            email: "",
            imagen: ""
          })
        })
      navigate('/');
    } else {
      setMensaje("Datos incorrectos, revise los campos");
    }
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

  let source = usuarioActual.imagen === null ? process.env.REACT_APP_SERVER_PUBLIC + "usuarios/undefined.jpg" : process.env.REACT_APP_SERVER_PUBLIC + "usuarios/" + usuarioActual.email + ".jpg";

  let usuario = null;
  if ((actualizando === false && borrando === false) || (actualizando === true && borrando === true)) {
    usuario = <div className='usuario-Usuario'>
      <h2>Bienvenido, {usuarioActual.nombre} {usuarioActual.apellidos}</h2>
      <img className='user-image-Usuario' src={source} alt={usuarioActual.nombre} />
      <div className='datos-Usuario'>
        <div>
          <span>Usuario:</span><p> {usuarioActual.nombre} {usuarioActual.apellidos}</p>
        </div>
        <div>
          <span>Email:</span><p> {usuarioActual.email}</p>
        </div>
        <div>
          <span>Teléfono:</span><p> {usuarioActual.telefono}</p>
        </div>
      </div>
      <div className='botonera-Usuario'>
        <button onClick={updateState}>Modificar perfil</button>
        <button onClick={deleteState}>Eliminar perfil</button>
      </div>
    </div>
  } else if (borrando === true) {
    usuario = <div className='borrando-Usuario'>
      <p>{mensaje}</p>
      <p className='aviso-borrado-Usuario'>ATENCIÓN</p>
      <p><strong>Para eliminar su usuario, introduzca su contraseña actual y pulse Eliminar. Todos sus datos serán borrados. Recuerde que, para eliminar su usuario, primero debe anular todas sus reservas y citas.</strong></p>
      <input onChange={cambios} type="text" name="password2" value={input.password2} placeholder="Introduzca su contraseña actual..." />
      <div className='botonera-Usuario'>
        <button className='boton-especial-Usuario' onClick={eliminar}>Eliminar</button>
        <button onClick={deleteState}>Cancelar</button>
      </div>
    </div>
  } else if (actualizando === true) {
    usuario = <div className='actualizando-Usuario'>
      <p>{mensaje}</p>
      <div className='nuevo-dato-Usuario'>
        <label htmlFor="foto">Nueva foto de usuario: </label>
        <input className="foto-Usuario" onChange={cargaFoto} name='foto' type="file" />
      </div>
      <div className='nuevo-dato-Usuario'>
        <label htmlFor="nombre">Nuevo nombre: </label>
        <input onChange={cambios} type="text" name="nombre" value={input.nombre} placeholder={usuarioActual.nombre} />
      </div>
      <div className='nuevo-dato-Usuario'>
        <label htmlFor="apellidos">Nuevos apellidos: </label>
        <input onChange={cambios} type="text" name="apellidos" value={input.apellidos} placeholder={usuarioActual.apellidos} />
      </div>
      <div className='nuevo-dato-Usuario'>
        <label htmlFor="telefono">Nuevo teléfono: </label>
        <input onChange={cambios} type="text" name="telefono" value={input.telefono} placeholder={usuarioActual.telefono} />
      </div>
      <div className='nuevo-dato-Usuario'>
        <label htmlFor="password1">Nueva contraseña: </label>
        <input onChange={cambios} type="text" name="password1" value={input.password1} placeholder="Introduzca una nueva contraseña..." />
      </div>
      <p className='aviso-Usuario'><strong>Para modificar sus datos, introduzca a continuación su contraseña actual.</strong></p>
      <div className='nuevo-dato-Usuario'>
        <label htmlFor="password1">Contraseña actual: </label>
        <input onChange={cambios} type="text" name="password2" value={input.password2} placeholder="Introduzca su contraseña actual..." />
      </div>
      <div className='botonera-Usuario'>
        <button className='boton-especial-Usuario' onClick={actualizar}>Modificar</button>
        <button onClick={updateState}>Cancelar</button>
      </div>
    </div>
  }

  useEffect(() => {
    if (usuarioActual.nombre === "") {
      navigate('/login');
    }
  }, [navigate, usuarioActual])

  return (
    <main className='main-Usuario'>
      {usuario}
    </main>
  )
}

export default Usuario;
