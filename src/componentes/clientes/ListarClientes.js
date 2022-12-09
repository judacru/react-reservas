import React from "react";
import { Link } from "react-router-dom";
import Api from "../../servicios/api";

class ListarClientes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datosCargados: false,
      clientes: [],
    };
  }

  borrarRegistros = (id) => {
    fetch(Api + "clientes/" + id, { method: "DELETE" })
      .then(() => {
        this.cargarDatos();
      })
      .catch(console.log);
  };

  cargarDatos() {
    fetch(Api + "clientes")
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        this.setState({ datosCargados: true, clientes: datosRespuesta });
      })
      .catch(console.log);
  }

  componentDidMount() {
    this.cargarDatos();
  }

  render() {
    const { datosCargados, clientes } = this.state;
    if (!datosCargados) {
      return <div>Cargando...</div>;
    } else {
      return (
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-success" to={"/clientes/crear"}>
              Agrega nuevo cliente
            </Link>
          </div>
          <div className="card-body">
            <h4>Lista de clientes</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Documento</th>
                  <th>Correo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clientes.data.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.nombre}</td>
                    <td>{cliente.documento}</td>
                    <td>{cliente.correo}</td>
                    <td>
                      <div className="btn-group" role="group" aria-label="">
                        <Link
                          className="btn btn-warning"
                          to={"/clientes/editar/" + cliente.id}
                        >
                          Editar
                        </Link>
                        <Link
                          className="btn btn-danger"
                          onClick={() => this.borrarRegistros(cliente.id)}
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
export default ListarClientes;
