import React from "react";
import { Link } from "react-router-dom";
import Api from "../../servicios/api";

class ListarEventos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datosCargados: false,
      eventos: [],
    };
  }

  borrarRegistros = (id) => {
    fetch(Api + "eventos/" + id, { method: "DELETE" })
      .then(() => {
        this.cargarDatos();
      })
      .catch(console.log);
  };

  cargarDatos() {
    fetch(Api + "eventos")
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        this.setState({ datosCargados: true, eventos: datosRespuesta });
      })
      .catch(console.log);
  }

  componentDidMount() {
    this.cargarDatos();
  }

  render() {
    const { datosCargados, eventos } = this.state;
    if (!datosCargados) {
      return <div>Cargando...</div>;
    } else {
      return (
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-success" to={"/eventos/crear"}>
              Agrega nuevo evento
            </Link>
          </div>
          <div className="card-body">
            <h4>Lista de eventos</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Stock</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {eventos.data.map((evento) => (
                  <tr key={evento.id}>
                    <td>{evento.nombre}</td>
                    <td>{evento.stock}</td>
                    <td>{evento.precio}</td>
                    <td>
                      <div className="btn-group" role="group" aria-label="">
                        <Link
                          className="btn btn-warning"
                          to={"/eventos/editar/" + evento.id}
                        >
                          Editar
                        </Link>
                        <Link
                          className="btn btn-danger"
                          onClick={() => this.borrarRegistros(evento.id)}
                        >
                          Borrar
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer text-muted"></div>
        </div>
      );
    }
  }
}
export default ListarEventos;
