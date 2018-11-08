import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Talleres } from "./talleres";
import { NuevoAlumno } from "./nuevoAlumno";
import { NuevoCurso, EditarCurso } from "./nuevoCurso";
import { CrearTaller, EditarTaller } from "./nuevoTallerReact";
import { ListarAlumnos } from "./alumnos";

class Routing extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/talleres/" />} />
        <Route exact path="/talleres/" component={Talleres} />
        <Route exact path="/agregarAlumno" component={NuevoAlumno} />
        <Route exact path="/alumnos/" component={ListarAlumnos} />
        <Route path="/nuevaCursada/" component={NuevoCurso} />
        <Route path="/editarCursada/" component={EditarCurso} />
        <Route path="/nuevoTaller/" component={CrearTaller} />
        <Route path="/editarTaller/" component={EditarTaller} />
      </Switch>
    );
  }
}
export default Routing;
