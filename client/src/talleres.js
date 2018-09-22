const React = require("react");
const axios = require("axios");
const { Curso } = require("./componentesComunes/MostrarCurso.jsx");

class Talleres extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listaDeCursos: [],
      listaDeTalleres: []
    };
  }

  componentDidMount() {
    this.getDataTalleres();
    this.getDataCursos();
  }

  getDataTalleres() {
    let self = this;
    return axios
      .get("/api/talleres")
      .then(function(response) {
        const listTalleres = response.data;
        self.setState({
          listaDeTalleres: listTalleres
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
        return Promise.resolve();
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
      <div className="container">
        {this.state.listaDeTalleres.map(tallerDesnormalizado => {
          return (
            <div className="card border-0">
              <div className="card-body">
                <h3 className="card-title">
                  {" "}
                  {tallerDesnormalizado._nombre +
                    " " +
                    tallerDesnormalizado._subCategoria}{" "}
                </h3>
                {this.desplegarCursosDeTaller(tallerDesnormalizado)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  desplegarCursosDeTaller(tdsn) {
    return this.state.listaDeCursos
      .filter(c => c._tallerID == tdsn._id)
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
  /**
   * 

   */
  // tblTalleres(){
  // 	return(
  // 		<table className = "table table-striped" >
  // 			<thead>
  // 				<tr>
  // 					{this.encabezadoDeLaTabla(["Talleres"])}
  // 				</tr>
  // 			</thead>
  // 			<tbody className="table table-bordered">
  // 				{ this.state.listaDeTalleres.map(taller => this.nombreDeTaller(taller)) }
  // 			</tbody>
  // 		</table>
  // 	)
  // }

  /** --- Datos de la Tabla --- */
  // Aca completo la tabla con los datos del taller
  // nombreDeTaller(unTaller){
  // 	console.log(unTaller);
  // 	const rowDatosDelTaller = (
  // 		<tr id="infoTaller" key={unTaller._nombre}>
  // 			<td>{unTaller._nombre}</td>
  // 			<td>{unTaller._categoria}</td>
  // 			<td>{unTaller._subCategoria}</td>
  // 		</tr>
  // 	)
  // 	return rowDatosDelTaller
  // }

  /** --- Encabezado de la Tabla --- */
  // Acá le doy formato a los titulos de la tabla
  // encabezadoDeLaTabla(titulos) {
  // 	return titulos.map((titulo, x) => (<th key={x}>{titulo}</th>))
  // }
}

class Botones extends React.Component {
  render() {
    return (
      <React.Fragment>
        <button className="col-md-3 btn btn-primary mr-1 mb-1">Espera</button>
        <button
          className="btn btn-primary col-md-3 mr-1 mb-1"
          onClick={v => this.props.seleccionarAlumnos(v)}
        >
          Alumnos
        </button>
        <button
          className="btn btn-primary col-md-3 mb-1"
          onClick={v => this.props.inscribirAlumno(v)}
        >
          Inscribir
        </button>
      </React.Fragment>
    );
  }
}

module.exports.Talleres = Talleres;
