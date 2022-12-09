import React from "react";
import { Link, Navigate } from "react-router-dom";
import Api from "../../servicios/api";

class CrearEvento extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      stock: "",
      precio: "",
      guardado: false,
      errores: [],
    };
  }

  cambioValor = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ state, errores: [] });
  };

  verificarError(elemento) {
    return this.state.errores.indexOf(elemento) !== -1;
  }

  enviarDatos = (e) => {
    e.preventDefault();

    const { nombre, stock, precio } = this.state;

    var errores = [];
    if (!nombre) errores.push("error_nombre");
    if (!stock) errores.push("error_stock");
    if (!precio) errores.push("error_precio");

    this.setState({ errores: errores });
    if (errores.length > 0) return false;

    var datosEnviar = { nombre: nombre, stock: stock, precio: precio };

    fetch(Api + "eventos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosEnviar),
    })
      .then((respuesta) => respuesta.json())
      .then(() => {
        this.setState((state) => ({ ...state, guardado: true }));
      })
      .catch(console.log);
  };
  render() {
    const { nombre, stock, precio, guardado } = this.state;
    return (
      <div className="card">
        {guardado && <Navigate to="/eventos" replace={true} />}
        <div className="card-header">Eventos</div>
        <div className="card-body">
          <form onSubmit={this.enviarDatos}>
            <div className="form-group">
              <label htmlFor="">Nombre:</label>
              <input
                type="text"
                name="nombre"
                onChange={this.cambioValor}
                value={nombre}
                id="nombre"
                className={
                  (this.verificarError("error_nombre") ? "is-invalid" : "") +
                  " form-control"
                }
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback">
                Escribe el nombre del evento
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="">Stock:</label>
              <input
                type="text"
                name="stock"
                onChange={this.cambioValor}
                value={stock}
                id="stock"
                className={
                  (this.verificarError("error_stock") ? "is-invalid" : "") +
                  " form-control"
                }
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback">
                Escribe el stock
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="">Precio:</label>
              <input
                type="text"
                name="precio"
                onChange={this.cambioValor}
                value={precio}
                id="precio"
                className={
                  (this.verificarError("error_precio") ? "is-invalid" : "") +
                  " form-control"
                }
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback">
                Escribe el precio
              </small>
            </div>
            <div className="btn-group" role="group" aria-label="">
              <button type="submit" className="btn btn-success">
                Agregar nuevo evento
              </button>
              <Link to={"/"} className="btn btn-primary">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
        <div className="card-footer text-muted"></div>
      </div>
    );
  }
}

export default CrearEvento;
