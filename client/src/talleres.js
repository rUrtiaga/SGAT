const React = require("react");
const axios = require("axios");
const { Curso } = require("./componentesComunes/MostrarCurso.jsx");

class Talleres extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listaDeCursos: []
    };
  }

  componentDidMount() {
    this.getDataCursos();
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
        {this.state.listaDeCursos.map(curso => (
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
        ))}
      </div>
    );
  }
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
      <div className="col-md-3 text-right">
        <button className="col-md-4 btn btn-primary">Espera</button>
        <button
          className="btn btn-primary col-md-4"
          onClick={v => this.props.seleccionarAlumnos(v)}
        >
          Alumnos
        </button>
        <button
          className="btn btn-primary col-md-4"
          onClick={v => this.props.inscribirAlumno(v)}
        >
          Inscribir
        </button>
      </div>
    );
  }
}

module.exports.Talleres = Talleres;
