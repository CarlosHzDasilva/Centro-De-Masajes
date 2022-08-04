import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Ficha from './components/Ficha/Ficha';
import Usuario from './components/Usuario/Usuario';
import Reservas from './components/Reservas/Reservas';

const routing = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/ficha' element={<Ficha />}/>
        <Route path='/usuario' element={<Usuario />}/>
        <Route path='/reservas' element={<Reservas />}/>
    </Routes>
  )
}

export default routing;