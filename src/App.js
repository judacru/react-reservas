import './App.css';

import {
  ListarEventos,
  EditarEvento,
  CrearEvento,
} from "./componentes/eventos";

import {
  ListarClientes,
  EditarCliente,
  CrearCliente,
} from "./componentes/clientes";

import {
  ListarVentas,
  CrearVenta,
} from "./componentes/ventas";



import { Routes, Route, BrowserRouter as Router } from "react-router-dom"; 
import {Link} from "react-router-dom";



function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light">
          <div className="nav navbar-nav">
               <Link className="nav-item nav-link" to={"/"}>Ventas</Link>
              <Link className="nav-item nav-link" to={"/clientes"}>Clientes</Link>              
              <Link className="nav-item nav-link active" to={"/eventos"}>Eventos <span className="sr-only"></span></Link>
          </div>
      </nav>

    <div className="container">
      <br></br>
      <Routes>
        <Route path="/" element={<ListarVentas/>} />
        <Route path="/ventas/crear" element={<CrearVenta/>} />
        <Route path="/clientes" element={<ListarClientes/>} />
        <Route path="/clientes/crear" element={<CrearCliente/>} />
        <Route path="/clientes/editar/:id" element={<EditarCliente/>} />
        <Route path="/eventos" element={<ListarEventos/>} />
        <Route path="/eventos/crear" element={<CrearEvento/>} />
        <Route path="/eventos/editar/:id" element={<EditarEvento/>} />
        
      </Routes>   
      
    </div>
    </Router>
  );
}

export default App;
