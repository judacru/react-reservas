import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Api from "../../servicios/api";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class EditarEvento extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datosCargados: false,
      evento: {
        id: null,
        nombre: "",
        stock: null,
        precio: null,
      },
      guardado: false,
    };
  }
  cambioValor = (e) => {
    const state = this.state.evento;
    state[e.target.name] = e.target.value;
    this.setState({ evento: state });
  };

  enviarDatos = (e) => {
    e.preventDefault();
    const { id, nombre, stock, precio } = this.state.evento;

    var datosEnviar = { id: id, nombre: nombre, stock: stock, precio: precio };
    fetch(Api + "eventos/" + id, {
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

    fetch(Api + "eventos/" + id)
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        console.log("=>", datosRespuesta);
        this.setState({
          datosCargados: true,
          evento: datosRespuesta.data,
        });
      })
      .catch(console.log);
  }
  render() {
    const { datosCargados, evento, guardado } = this.state;
    if (!datosCargados) {
      return <div>Cargando...</div>;
    } else {
      return (
        <div className="card">
          {guardado && <Navigate to="/eventos" replace={true} />}
          <div className="card-header">Editar eventos</div>
          <div className="card-body">
            <form onSubmit={this.enviarDatos}>
              <div className="form-group">
                <label htmlFor="">Clave: </label>
                <input
                  type="text"
                  readOnly
                  className="form-control"
                  value={evento.id}
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
                <label htmlFor="">Nombre:</label>
                <input
                  required
                  type="text"
                  name="nombre"
                  onChange={this.cambioValor}
                  value={evento.nombre}
                  id="nombre"
                  className="form-control"
                  placeholder=""
                  aria-describedby="helpId"
                />
                <small id="helpId" className="text-muted">
                  Escribe el nombre del evento
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="">Stock:</label>
                <input
                  required
                  type="text"
                  name="stock"
                  onChange={this.cambioValor}
                  value={evento.stock}
                  id="stock"
                  className="form-control"
                  placeholder=""
                  aria-describedby="helpId"
                />
                <small id="helpId" className="text-muted">
                  Escribe el stock
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="">Precio:</label>
                <input
                  required
                  type="text"
                  name="precio"
                  onChange={this.cambioValor}
                  value={evento.precio}
                  id="precio"
                  className="form-control"
                  placeholder=""
                  aria-describedby="helpId"
                />
                <small id="helpId" className="text-muted">
                  Escribe el precio
                </small>
              </div>
              <div className="btn-group" role="group" aria-label="">
                <button type="submit" className="btn btn-success">
                  Actualizar datos del evento
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
}

export default withParams(EditarEvento);
