import React from "react";
import { Link } from "react-router-dom";
import Api from "../../servicios/api";

class ListarVentas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datosCargados: false,
      ventas: [],
    };
  }

  cargarDatos() {
    fetch(Api + "ventas")
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        this.setState({ datosCargados: true, ventas: datosRespuesta });
      })
      .catch(console.log);
  }

  componentDidMount() {
    this.cargarDatos();
  }

  render() {
    const { datosCargados, ventas } = this.state;
    if (!datosCargados) {
      return <div>Cargando...</div>;
    } else {
      return (
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-success" to={"/ventas/crear"}>
              Agrega nueva venta
            </Link>
          </div>
          <div className="card-body">
            <h4>Lista de ventas</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Evento</th>
                  <th>Cliente</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {ventas.data.map((venta) => (
                  <tr key={venta.id}>
                    <td>{venta.evento.nombre}</td>
                    <td>{venta.cliente.nombre}</td>
                    <td>{venta.cantidad}</td>
                    <td>{venta.total}</td>
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
export default ListarVentas;
