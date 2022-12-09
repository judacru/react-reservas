import React from "react";
import { Link, Navigate } from "react-router-dom";
import Api from "../../servicios/api";

class CrearCliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documento: "",
      nombre: "",
      correo: "",
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

    const { documento, nombre, correo } = this.state;

    var errores = [];
    if (!nombre) errores.push("error_nombre");
    if (!documento) errores.push("error_documento");
    if (!correo) errores.push("error_correo");

    this.setState({ errores: errores });
    if (errores.length > 0) return false;

    var datosEnviar = { documento: documento, nombre: nombre, correo: correo };

    fetch(Api + "clientes", {
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
    const { documento, nombre, correo, guardado } = this.state;
    return (
      <div className="card">
        {guardado && <Navigate to="/clientes" replace={true} />}
        <div className="card-header">Clientes</div>
        <div className="card-body">
          <form onSubmit={this.enviarDatos}>
            <div className="form-group">
              <label htmlFor="">Documento:</label>
              <input
                type="text"
                name="documento"
                onChange={this.cambioValor}
                value={documento}
                id="documento"
                className={
                  (this.verificarError("error_documento") ? "is-invalid" : "") +
                  " form-control"
                }
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback">
                Escribe el documento
              </small>
            </div>
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
              <label htmlFor="">Correo:</label>
              <input
                type="text"
                name="correo"
                onChange={this.cambioValor}
                value={correo}
                id="correo"
                className={
                  (this.verificarError("error_correo") ? "is-invalid" : "") +
                  " form-control"
                }
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback">
                Escribe el correo
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

export default CrearCliente;
