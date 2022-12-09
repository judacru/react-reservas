import React from "react";
import { Link, Navigate } from "react-router-dom";
import Select from "react-select";
import Api from "../../servicios/api";

class CrearVenta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventoId: "",
      evento: null,
      clienteId: "",
      cliente: null,
      cantidad: "",
      total: "",
      guardado: false,
      errores: [],
      eventos: [],
      clientes: [],
    };
  }

  componentDidMount() {
    fetch(Api + "eventos")
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        this.setState((state) => ({
          ...state,
          eventos: datosRespuesta.data.map((item) => ({
            value: item.id,
            label: item.nombre,
            precio: item.precio,
          })),
        }));
      })
      .catch(console.log);

    fetch(Api + "clientes")
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        this.setState((state) => ({
          ...state,
          clientes: datosRespuesta.data.map((item) => ({
            value: item.id,
            label: item.nombre,
          })),
        }));
      })
      .catch(console.log);
  }

  cambioValor = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    if (e.target.name === "cantidad") {
      state["total"] = parseInt(e.target.value) * (state.evento?.precio || 0);
    }
    this.setState({ state, errores: [] });
  };

  cambioValorSelect = (name) => (item) => {
    const state = this.state;
    state[name] = item;
    state[name + "Id"] = item.value;
    if (name === "evento") {
      state["total"] = parseInt(item.precio) * (state.cantidad || 0);
    }
    this.setState({ state, errores: [] });
  };

  verificarError(elemento) {
    return this.state.errores.indexOf(elemento) !== -1;
  }

  enviarDatos = (e) => {
    e.preventDefault();

    const { eventoId, clienteId, cantidad, total } = this.state;

    var errores = [];
    if (!eventoId) errores.push("error_nombreId");
    if (!clienteId) errores.push("error_clienteId");
    if (!cantidad) errores.push("error_cantidad");
    if (!total) errores.push("error_total");

    this.setState({ errores });
    if (errores.length > 0) return false;

    var datosEnviar = {
      eventoId: parseInt(eventoId),
      clienteId: parseInt(clienteId),
      cantidad,
      total,
    };

    fetch(Api + "ventas", {
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
    const { evento, cliente, cantidad, total, guardado, eventos, clientes } =
      this.state;
    return (
      <div className="card">
        {guardado && <Navigate to="/" replace={true} />}
        <div className="card-header">Ventas</div>
        <div className="card-body">
          <form onSubmit={this.enviarDatos}>
            <div className="form-group">
              <label htmlFor="">Evento:</label>
              <Select
                value={evento}
                onChange={this.cambioValorSelect("evento")}
                options={eventos}
              ></Select>

              <small id="helpId" className="invalid-feedback">
                Selecciona un evento de la lista
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="">Cliente:</label>
              <Select
                value={cliente}
                onChange={this.cambioValorSelect("cliente")}
                options={clientes}
              ></Select>
              <small id="helpId" className="invalid-feedback">
                Selecciona un cliente de la lista
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="">Cantidad:</label>
              <input
                type="text"
                name="cantidad"
                onChange={this.cambioValor}
                value={cantidad}
                id="cantidad"
                className={
                  (this.verificarError("error_cantidad") ? "is-invalid" : "") +
                  " form-control"
                }
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback">
                Escribe la cantidad
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="">Total:</label>
              <input
                readOnly
                type="text"
                name="total"
                value={total}
                id="total"
                className={
                  (this.verificarError("error_total") ? "is-invalid" : "") +
                  " form-control"
                }
                placeholder=""
                aria-describedby="helpId"
              />
            </div>
            <div className="btn-group" role="group" aria-label="">
              <button type="submit" className="btn btn-success">
                Agregar nueva venta
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

export default CrearVenta;
