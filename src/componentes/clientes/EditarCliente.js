import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Api from "../../servicios/api";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class EditarCliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datosCargados: false,
      cliente: {
        id: null,
        documento: null,
        nombre: "",
        correo: "",
      },
      guardado: false,
    };
  }
  cambioValor = (e) => {
    const state = this.state.cliente;
    state[e.target.name] = e.target.value;
    this.setState({ cliente: state });
  };

  enviarDatos = (e) => {
    e.preventDefault();

    const { id, documento, nombre, correo } = this.state.cliente;


    var datosEnviar = { id, documento, nombre, correo };
    fetch(Api + "clientes/" + id, {
      method: "PUT",
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

  componentDidMount() {
    const { id } = this.props.params;

    fetch(Api + "clientes/" + id)
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        this.setState({
          datosCargados: true,
          cliente: datosRespuesta.data,
        });
      })
      .catch(console.log);
  }
  render() {
    const { datosCargados, cliente, guardado } = this.state;
    if (!datosCargados) {
      return <div>Cargando...</div>;
    } else {
      return (
        <div className="card">
          {guardado && <Navigate to="/clientes" replace={true} />}
          <div className="card-header">Editar clientes</div>
          <div className="card-body">
            <form onSubmit={this.enviarDatos}>
              <div className="form-group">
                <label htmlFor="">Clave: </label>
                <input
                  type="text"
                  readOnly
                  className="form-control"
                  value={cliente.id}
                  onChange={this.cambioValor}
                  name="id"
                  id=""
                  aria-describedby="helpId"
                  placeholder=""
                />
                <small id="helpId" className="form-text text-muted">
                  Clave
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="">Documento:</label>
                <input
                  required
                  type="text"
                  name="documento"
                  onChange={this.cambioValor}
                  value={cliente.documento}
                  id="documento"
                  className="form-control"
                  placeholder=""
                  aria-describedby="helpId"
                />
                <small id="helpId" className="text-muted">
                  Escribe el documento
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="">Nombre:</label>
                <input
                  required
                  type="text"
                  name="nombre"
                  onChange={this.cambioValor}
                  value={cliente.nombre}
                  id="nombre"
                  className="form-control"
                  placeholder=""
                  aria-describedby="helpId"
                />
                <small id="helpId" className="text-muted">
                  Escribe el nombre del cliente
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="">Correo:</label>
                <input
                  required
                  type="text"
                  name="correo"
                  onChange={this.cambioValor}
                  value={cliente.correo}
                  id="correo"
                  className="form-control"
                  placeholder=""
                  aria-describedby="helpId"
                />
                <small id="helpId" className="text-muted">
                  Escribe el correo
                </small>
              </div>
              <div className="btn-group" role="group" aria-label="">
                <button type="submit" className="btn btn-success">
                  Actualizar datos del cliente
                </button>
                <Link to={"/clientes"} className="btn btn-primary">
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
}

export default withParams(EditarCliente);
