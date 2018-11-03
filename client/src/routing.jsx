import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Talleres } from "./talleres";
import { NuevoAlumno } from "./nuevoAlumno";
import { NuevoCurso } from "./nuevoCurso";
import { CrearTaller } from "./nuevoTallerReact";
import { ListarAlumnos } from "./alumnos";

class Routing extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/talleres/" />} />
        <Route exact path="/talleres/" component={Talleres} />
        <Route exact path="/talleres/:categoria" component={Talleres} />
        <Route exact path="/agregarAlumno" component={NuevoAlumno} />
        <Route exact path="/agregarAlumno/:cursoId" component={NuevoAlumno} />
        <Route exact path="/alumnos/:id" component={ListarAlumnos} />
        {/* <Route path='/nuevoCurso' component={NuevoCurso}/>
                <Route path='/nuevoTaller' component={CrearTaller}/> */}
      </Switch>
    );
  }
}
export default Routing;
// module.exports.Routing = Routing;
