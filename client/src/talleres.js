const React = require("react");
const axios = require("axios");
const _ = require("lodash");
const { Curso } = require("./componentesComunes/MostrarCurso.jsx");

class MostrarTalleres extends React.Component {
  render() {
    return this.props.talleres.map(nombreTaller => {
      return (
        <div className="card mb-sm-3 mb-3" key={nombreTaller}>
          <div className="card-header">
            <h4 className="card-title">{nombreTaller}</h4>
          </div>
          {this.desplegarSubcategorias(nombreTaller)}
        </div>
      );
    });
  }

  desplegarSubcategorias(nombreTaller) {
    return this.props.listTalleres
      .filter(
        t => t._nombre === nombreTaller && t._categoria === this.props.categoria
      )
      .map(tallerDesnormalizado => {
        return (
          <div
            key={tallerDesnormalizado._subCategoria}
          >
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

class ListaCategorias extends React.Component {
  render() {
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
  }
  selectActive(cat) {}
}

class NavItem extends React.Component {
  render() {
    return (
      <li className="nav-item">
        <a
          className={"nav-link btn " + this.props.extraName}
          onClick={() => this.props.select()}
        >
          {this.props.categoria}
        </a>
       </li>
    );
  }
}

class Talleres extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listaDeCursos: [],
      listaDeTalleres: [],
      listaDeCategorias: []
    };
  }

  componentDidMount() {
    this.getDataCursos().then(listCursos => this.getDataTalleres(listCursos));
  }

  getDataTalleres(listCursos) {
    let self = this;
    return axios
      .get("/api/talleres")
      .then(function(response) {
        let listTalleres = response.data.filter(t=>listCursos.some(c=>c._tallerID === t._id));
        let listCategorias = _.sortedUniq(listTalleres.map(t => t._categoria));
        self.setState({
          listaDeTalleres: listTalleres,
          listaDeCategorias: listCategorias,
          selectedCategory: listCategorias ? listCategorias[0] : ""
        });
        return Promise.resolve();
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getDataCursos() {
    let self = this;
    return axios
      .get("/api/cursosCompletos")
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

  seleccionarAlumnos(cursoId) {
    this.props.rootComponent.setState({ cursoId: cursoId, pantallaActual: 4 });
  }

  inscribirAlumno(cursoId) {
    this.props.rootComponent.setState({
      cursoId: cursoId,
      pantallaActual: 5
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
          </div>

          <div className="col-sm-9">
            <h3 className="text-center">{this.state.selectedCategory}</h3>
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
              seleccionarAlumnos={() => this.seleccionarAlumnos(curso._id)}
              inscribirAlumno={() => this.inscribirAlumno(curso._id)}
            />
          }
        />
      ));
  }
}

class Botones extends React.Component {
  render() {
    return (
      <React.Fragment>
        <button className="col-md-3 btn btn-primary mr-1 mb-1">Espera</button>
        <button
          className="btn btn-primary col-md-4 mr-1 mb-1"
          onClick={v => this.props.seleccionarAlumnos(v)}
        >
          Alumnos
        </button>
        <button
          className="btn btn-primary col-md-4 mb-1"
          onClick={v => this.props.inscribirAlumno(v)}
        >
          Inscribir
        </button>
      </React.Fragment>
    );
  }
}

module.exports.Talleres = Talleres;
