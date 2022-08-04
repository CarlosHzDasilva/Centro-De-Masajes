import './App.css';
import Footer from './components/auxiliarComponents/Footer';
import Header from './components/auxiliarComponents/Header';
import Routing from './Routing';
import { useState, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UsuarioContext } from './components/Context/UsuarioContext';

function App() {

  const[usuarioActual, setUsuarioActual] = useState({
    _id: "",
    nombre: "",
    apellidos: "",
    telefono: "",
    email: "",
    imagen: ""
  });
  const valor = useMemo(() => ({usuarioActual, setUsuarioActual}), [usuarioActual, setUsuarioActual]);

  return (
    <BrowserRouter>
      <UsuarioContext.Provider value = {valor}>
          <Header />
          <Routing />
          <Footer />
      </UsuarioContext.Provider>
    </BrowserRouter>
  )
};

export default App;
