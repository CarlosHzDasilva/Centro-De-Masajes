import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsuarioContext } from '../Context/UsuarioContext';
import { enlacesHttp } from '../Librerias/accesoAPI';

// eslint-disable-next-line
import styles from './Reservas.css';

const Reservas = () => {
    let fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() + 1);
    fechaActual = fechaActual.toISOString().split('T')[0];

    const navigate = useNavigate();
    const [fechaCalendario, setFechaCalendario] = useState(fechaActual);
    const [horaSeleccionada, setHoraSeleccionada] = useState("8");
    const [tratamientos, setTratamientos] = useState([]);
    const [reservasUsuario, setReservasUsuario] = useState([])
    const [tratamientoSeleccionado, setTratamientoSeleccionado] = useState("Sin seleccionar");
    const [reservas, setReservas] = useState([]);
    const { usuarioActual } = useContext(UsuarioContext);
    const [auxiliar, setAuxiliar] = useState(false)

    const seleccionFecha = (e) => {
        setFechaCalendario(e.target.value);
        setAuxiliar(!auxiliar);
    }

    const seleccionHora = (e) => {
        setHoraSeleccionada(e.target.value);
    }

    const seleccionTratamiento = (e) => {
        setTratamientoSeleccionado(e.target.value);
    }

    useEffect(() => {
        let api = enlacesHttp();
        api.get(process.env.REACT_APP_SERVER_TRATAMIENTOS)
            .then(data => setTratamientos(data))
    }, [])

    useEffect(() => {
        let api = enlacesHttp();
        api.get(process.env.REACT_APP_SERVER_RESERVAS)
            .then(data => { setReservas(data) })
    }, [auxiliar])

    useEffect(() => {
        let horarios = document.getElementById('horas-Reservas').childNodes;
        for (const hora of horarios) {
            reservas.forEach((element) => {
                let fechaReserva = element.fecha.split('T')[0];
                let horaReserva = element.fecha.substring(11, 13);
                if ((parseInt(hora.value) === parseInt(horaReserva)) && (fechaReserva === fechaCalendario)) {
                    hora.classList.add('hora-bloqueada');
                    hora.setAttribute('disabled', "");
                } else if ((parseInt(hora.value) === parseInt(horaReserva)) && !(fechaReserva === fechaCalendario)) {
                    hora.classList.remove('hora-bloqueada');
                    hora.removeAttribute('disabled', "");
                }
            })
        }
    }, [fechaCalendario, reservas, auxiliar])

    const reservar = (e) => {
        if (tratamientoSeleccionado !== "Sin seleccionar") {
            let horarios = document.getElementById('horas-Reservas').childNodes;
            horarios.forEach((element) => {
                if (element.value === horaSeleccionada) {
                    element.classList.add('hora-bloqueada');
                    element.setAttribute('disabled', "");
                }
            })
            let fecha = new Date(`${fechaCalendario}T${horaSeleccionada.length === 1 ? '0' + horaSeleccionada : horaSeleccionada}:00:00.000Z`);
            let Reserva = {
                "_id_usuario": usuarioActual._id,
                "fecha": fecha.toISOString(),
                "tratamiento": tratamientoSeleccionado
            }
            let api = enlacesHttp();
            let opciones = {};
            opciones.method = "POST";
            opciones.headers = {
                "Content-Type": "application/json"
            };
            opciones.body = JSON.stringify(Reserva);
            api.post(process.env.REACT_APP_SERVER_RESERVAS, opciones)
                .then(respuesta => {
                    setAuxiliar(!auxiliar);
                })
        }
    }

    const cancelar = (e) => {
        let Reserva = {
            "id": e.target.id
        }
        let api = enlacesHttp();
        let opciones = {};
        opciones.method = "DELETE";
        opciones.headers = {
            "Content-Type": "application/json"
        };
        opciones.body = JSON.stringify(Reserva);
        api.post(process.env.REACT_APP_SERVER_RESERVAS, opciones)
            .then(respuesta => {
                setAuxiliar(!auxiliar);
            });
    }

    let horas = [];
    for (let i = 0; i < 8; i++) {
        horas.push(<button key={i} id={i} value={i + 8} onClick={seleccionHora}> {i + 8}:00 - {i + 9}:00</button>)
    }

    useEffect(() => {
        let listaReservas = [];
        let arrayReservasUsuario = [];
        reservas.forEach((element) => {
            if (element._id_usuario === usuarioActual._id) {
                arrayReservasUsuario.push(element);
            }
        })
        if (arrayReservasUsuario.length === 0) {
            setReservasUsuario(<p>No se ha encontrado ninguna reserva para {usuarioActual.nombre} {usuarioActual.apellidos}</p>)
        } else {
            arrayReservasUsuario.forEach((element, index) => {
                let fecha = element.fecha.split('T')[0];
                let hora = element.fecha.substring(11, 13);
                listaReservas.push(<div className='carta-reserva-Reservas'>
                    <p>{element.tratamiento}</p>
                    <p>{fecha}, de {hora}:00 a {parseInt(hora) + 1}:00</p>
                    <button className='boton-especial-Reservas' id={element._id} key={index} onClick={cancelar}>Cancelar</button>
                </div>)
            })
            setReservasUsuario(listaReservas);
        }
    }, [setReservasUsuario, reservas, usuarioActual, auxiliar])

    useEffect(() => {
        if (usuarioActual.nombre === "") {
            navigate('/login');
        }
    }, [navigate, usuarioActual])

    return (
        <div className='contenedor-Reservas'>
            <h2 className='titulo-Reservas'>Página de reservas</h2>
            <div className='reservas-usuario-Reservas'>
                {reservasUsuario}
            </div>
            <div className='seleccion-reserva-Reservas'>
                <div className='calendario-Reservas'>
                    <label htmlFor="fecha-Reservas"><strong>Seleccione fecha y hora:</strong></label>
                    <input onChange={seleccionFecha} type="date" name="fecha-Reservas" value={fechaCalendario} min={fechaActual} />
                </div>
                <div id='horas-Reservas'>
                    {horas}
                </div>
                <select id="select-Reservas" name="tratamientos" onChange={seleccionTratamiento} defaultValue={"Sin seleccionar"}>
                    <option value="Sin seleccionar" disabled>Seleccione un tratamiento...</option>
                    {tratamientos.map((element) =>
                        <option value={element.tratamiento} key={element.tratamiento}>{element.tratamiento}</option>
                    )}
                </select>
            </div>
            <div className='menu-reserva-Reservas'>
                <p><strong>Hora seleccionada:</strong> {horaSeleccionada}:00 - {parseInt(horaSeleccionada) + 1}:00</p>
                <p><strong>Fecha seleccionada:</strong> {fechaCalendario}</p>
                <p><strong>Tratamiento seleccionada:</strong> {tratamientoSeleccionado}</p>
                <button onClick={reservar}>Reservar</button>
            </div>
        </div>
    )
}

export default Reservas;
