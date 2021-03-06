const { Link } = require("react-router-dom");
const React = require("react");
const axios = require("axios");
const _ = require("lodash");
const { Curso } = require("./componentesComunes/MostrarCurso");

class MostrarTalleres extends React.Component {
  render() {
    if (this.props.talleres.length === 0) {
      return <h3 className="text-center">No hay talleres para mostrar</h3>;
    } else {
      return (
        <React.Fragment>
          <h3 className="text-center">{this.props.categoria}</h3>
          {this.props.talleres.map(nombreTaller => {
            return (
              <div className="card mb-sm-3 mb-3" key={nombreTaller}>
                <div className="card-header">
                  <h4 className="card-title">
                    {nombreTaller}

                    <Link
                      className="btn btn-link"
                      to={{
                        pathname: "/editarTaller/",
                        state: {
                          taller: {
                            _categoria: this.props.categoria,
                            _nombre: nombreTaller
                          }
                        }
                      }}
                    >
                      <span className="fa fa-pencil" />
                    </Link>
                  </h4>
                </div>
                {this.desplegarSubcategorias(nombreTaller)}
              </div>
            );
          })}
        </React.Fragment>
      );
    }
  }

  desplegarSubcategorias(nombreTaller) {
    return this.props.listTalleres
      .filter(
        t => t._nombre === nombreTaller && t._categoria === this.props.categoria
      )
      .map(tallerDesnormalizado => {
        return (
          <div key={tallerDesnormalizado._subCategoria}>
            <div className="card-body">
              <h5 className="card-title">
                {tallerDesnormalizado._subCategoria}
              </h5>

              {this.props.desplegarCursosDeTaller(tallerDesnormalizado)}
            </div>
          </div>
        );
      });
  }
}

class ListaAnios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anios: this.calcularAnios()
    };
  }

  calcularAnios() {
    let anioActual = new Date().getFullYear();
    return [anioActual - 1, anioActual, anioActual + 1];
  }

  seleccionarAnio(anio) {
    this.props.setAnio(anio);
    this.props.getCursos(anio);
  }

  render() {
    return (
      <React.Fragment>
        <h5 className="text-center pt-3">Año</h5>
        <ul className="nav flex-column  nav-pills border rounded">
          {this.state.anios.map(a => (
            <li className="nav-item" key={a}>
              <button
                className={
                  "col-12 nav-link btn " +
                  (this.props.anio.toString() === a.toString() ? "active" : "")
                }
                onClick={() => this.seleccionarAnio(a)}
              >
                {a}
              </button>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

class ListaCategorias extends React.Component {
  render() {
    if (this.props.categorias.length > 0) {
      return (
        <React.Fragment>
          <h5 className="text-center">Categorias</h5>
          <ul className="nav flex-column  nav-pills border rounded">
            {this.props.categorias.map(c => (
              <NavItem
                categoria={c}
                extraName={this.props.selected === c ? "active" : ""}
                select={() => {
                  this.props.select(c);
                }}
                key={c}
              />
            ))}
          </ul>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

class NavItem extends React.Component {
  render() {
    return (
      <li className="nav-item">
        <Link
          className={"nav-link btn " + this.props.extraName}
          onClick={() => this.props.select()}
          to={{
            pathname: "/talleres/",
            state: { categoria: this.props.categoria }
          }}
        >
          {this.props.categoria}
        </Link>
      </li>
    );
  }
}

class Talleres extends React.Component {
  constructor(props) {
    super(props);
    const state = props.location.state;
    this.state = {
      anio: new Date().getFullYear(),
      listaDeCursos: [],
      listaDeTalleres: [],
      listaDeCategorias: [],
      prevSelectedCategory: state ? state.categoria : ""
    };
  }

  componentDidMount() {
    this.datosTalleres(this.state.anio);
  }

  datosTalleres(anio) {
    this.getDataCursos(anio).then(listCursos =>
      this.getDataTalleres(listCursos)
    );
  }

  getDataCursos(anio) {
    let self = this;
    return axios
      .get(`/api/cursosCompletos/${anio}`)
      .then(function(response) {
        const listCursos = response.data;
        self.setState({
          listaDeCursos: listCursos
        });
        return Promise.resolve(listCursos);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getDataTalleres(listCursos) {
    let self = this;
    return axios
      .get(`/api/talleres/`)
      .then(function(response) {
        let listTalleres = response.data.filter(t =>
          listCursos.some(c => c._tallerID === t._id)
        );
        let listCategorias = _.sortedUniq(listTalleres.map(t => t._categoria));
        self.setState({
          listaDeTalleres: listTalleres,
          listaDeCategorias: listCategorias,
          selectedCategory: self.categoriaParamOPrimeroDeLaLista(listCategorias)
        });
        return Promise.resolve();
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  categoriaParamOPrimeroDeLaLista(listCategorias) {
    return (
      this.state.prevSelectedCategory ||
      (listCategorias ? listCategorias[0] : "")
    );
  }

  setAnio(anio) {
    this.setState({
      anio
    });
  }

  render() {
    return (
      <div className="container pt-4">
        <div className="row">
          <div className="col-sm-2 mt-1 mr-1">
            <ListaCategorias
              categorias={this.state.listaDeCategorias}
              select={this.selecCategoria.bind(this)}
              selected={this.state.selectedCategory}
            />
            <ListaAnios
              anio={this.state.anio}
              setAnio={anio => this.setAnio(anio)}
              getCursos={anio => this.datosTalleres(anio)}
            />
          </div>
          <div className="col-sm-9">
            <MostrarTalleres
              categoria={this.state.selectedCategory}
              listTalleres={this.state.listaDeTalleres}
              talleres={this.nombresTalleres()}
              desplegarCursosDeTaller={t => this.desplegarCursosDeTaller(t)}
            />
          </div>
        </div>
      </div>
    );
  }

  selecCategoria(cat) {
    this.setState({ selectedCategory: cat });
  }

  nombresTalleres() {
    return _.sortedUniq(
      this.state.listaDeTalleres
        .filter(t => t._categoria === this.state.selectedCategory)
        .map(t => t._nombre)
    );
  }

  desplegarCursosDeTaller(tdsn) {
    return this.state.listaDeCursos
      .filter(c => c._tallerID === tdsn._id)
      .map(curso => (
        <Curso
          key={curso._id}
          curso={curso}
          botones={
            <Botones
              curso={curso}
              hayCupo={curso._hayCupo}
              cantAlumnos={curso._cantAlumnos}
              cursoId={curso._id}
            />
          }
        />
      ));
  }
}

class Botones extends React.Component {
  hayAlumnos() {
    return this.props.cantAlumnos > 0;
  }

  disabled() {
    return !this.hayAlumnos() ? "disabled" : "";
  }

  render() {
    return (
      <React.Fragment>
        <EditButton curso={this.props.curso} />
        {this.props.curso._espera.length > 0 ? (
          <Link
            className={"col-md-3 btn btn-primary mr-1 mb-1 "}
            to={{
              pathname: "/listaEspera",
              state: { cursoId: this.props.cursoId }
            }}
          >
            Espera
          </Link>
        ) : null}
        <Link
          className={"btn btn-primary col-md-3 mr-1 mb-1 " + this.disabled()}
          to={{ pathname: "/alumnos/", state: { cursoId: this.props.cursoId } }}
        >
          Alumnos
        </Link>
        <Link
          className="btn btn-primary col-md-4 mb-1"
          to={{
            pathname: "/agregarAlumno/",
            state: { cursoId: this.props.cursoId }
          }}
        >
          <span className={"fa fa-edit"} />
          Inscribir
        </Link>
      </React.Fragment>
    );
  }
}

class EditButton extends React.Component {
  render() {
    return (
      <Link
        className="btn btn-link"
        to={{
          pathname: "/editarCursada",
          state: { curso: this.props.curso }
        }}
      >
        <span className="fa fa-pencil" />
      </Link>
    );
  }
}
module.exports.Talleres = Talleres;
