import React, { Component } from "react";
import { Link } from "react-router-dom";

class Menu extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
        <a className="navbar-brand bg-primary text-white " href="/">
          S. G. A. T.
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link
                className="nav-link"
                // onClick={() => this.mostrarMuestraTalleres()}
                to="/talleres"
              >
                Talleres
              </Link>
            </li>
            <li className="nav-item dropdown ">
              <a
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Inscribir
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Link className="dropdown-item" to="/agregarAlumno">
                  Nuevo Alumno
                </Link>
              </div>
            </li>
            <li className="nav-item dropdown ">
              <a
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Nuevo/a
              </a>
              <div className="dropdown-menu" aria-labelledby="#">
                <Link className="dropdown-item" to="/nuevoTaller">
                  Taller
                </Link>
                <Link className="dropdown-item" to="/nuevaCursada">
                  Cursada
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Menu;
