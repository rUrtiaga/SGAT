const { Link } = require("react-router-dom");
const React = require("react");
const axios = require("axios");
const _ = require("lodash");
const { Curso } = require("./componentesComunes/MostrarCurso");

class MostrarTalleres extends React.Component {
  render() {
    return this.props.talleres.map(nombreTaller => {
      return (
        <div className="card mb-sm-3 mb-3" key={nombreTaller}>
          <div className="card-header">
            <h4 className="card-title">
              {nombreTaller}

              <Link
                // type="button"
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
                // onClick={taller =>
                //   this.props.irACrearTaller(
                //     (taller = {
                //       _categoria: this.props.categoria,
                //       _nombre: nombreTaller
                //     })
                //   )
                // }
              >
                <span className="fa fa-pencil" />
              </Link>
            </h4>
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
}

class NavItem extends React.Component {
  render() {
    return (
      <li className="nav-item">
        <Link
          className={"nav-link btn " + this.props.extraName}
          onClick={() => this.props.select()}
          to={"/talleres/" + this.props.categoria}
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
    const params = props.match.params;
    this.state = {
      listaDeCursos: [],
      listaDeTalleres: [],
      listaDeCategorias: [],
      prevSelectedCategory: params ? params.categoria : ""
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

  // editarCurso(curso) {
  //   this.props.rootComponent.setState({ curso: curso, pantallaActual: 3 });
  // }

  // seleccionarListaDeEspera(cursoId) {
  //   this.props.rootComponent.setState({ cursoId: cursoId, pantallaActual: 6 });
  // }

  // seleccionarAlumnos(cursoId) {
  //   this.props.rootComponent.setState({ cursoId: cursoId, pantallaActual: 4 });
  // }

  // inscribirAlumno(cursoId) {
  //   this.props.rootComponent.setState({
  //     cursoId: cursoId,
  //     pantallaActual: 5
  //   });
  // }
  // cambiarACrearTaller(taller) {
  //   this.props.rootComponent.setState({
  //     taller: taller,
  //     pantallaActual: 2
  //   });
  // }

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
              // irACrearTaller={taller => this.cambiarACrearTaller(taller)}
            />
          </div>
        </div>
      </div>
    );
  }

  selecCategoria(cat) {
    this.setState({ selectedCategory: cat });
    // console.log(this.props.onChangeCategoria);
    // this.props.onChangeCategoria(cat);
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
  botonListaDeEspera() {
    let onClick = v => this.props.seleccionarListaDeEspera(v);
    let text = "Espera";
    let className = "col-md-3 btn btn-primary mr-1 mb-1 ";
    if (this.props.hayCupo) {
      return null;
    }

    return (
      <button
        className={className}
        onClick={onClick}
        // to={{
        //   pathname: "/alumnos",
        //   props: { cursoId: this.props.cursoId }
        // }}
      >
        {text}
      </button>
    );
  }

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
        {this.botonListaDeEspera()}
        <Link
          className={"btn btn-primary col-md-3 mr-1 mb-1 " + this.disabled()}
          to={"/alumnos/" + this.props.cursoId}
        >
          Alumnos
        </Link>
        <Link
          className="btn btn-primary col-md-4 mb-1"
          to={"/agregarAlumno/" + this.props.cursoId}
        >
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
          hash: "#" + this.props.curso._id,
          state: { curso: this.props.curso }
        }}
      >
        <span className="fa fa-pencil" />
      </Link>
    );
  }
}
module.exports.Talleres = Talleres;
