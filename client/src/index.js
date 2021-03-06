import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import axios from "axios";
import registerServiceWorker from "./registerServiceWorker";
import "../node_modules/jquery/dist/jquery.js";
import "../node_modules/bootstrap/dist/js/bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import proxyApi from "./forBuild/proxyApi.js";

import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./routing";
import Menu from "./menu";

//Para las notificaciones
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

console.log(proxyApi);
axios.defaults.baseURL = proxyApi;

// optional cofiguration de las notificaciones
const options = {
  position: "bottom center",
  timeout: 5000,
  offset: "30px",
  transition: "scale"
};
//Esto es para hacer el template personlizado y que se ajuste mejor al diseño
// class AlertTemplate extends React.Component {
//   render () {
//     // the style contains only the margin given as offset
//     // options contains all alert given options
//     // message is the alert message...
//     // close is a function that closes the alert
//     const {  options, message, close } = this.props

//     return (
//       <div class={"alert alert-"+ options.type} role="alert">
//         {options.type === 'info' && ''}
//         {options.type === 'success' && '=D' }
//         {options.type === 'error' && ''}
//         {message}
//         <button onClick={close}>X</button>
//       </div>
//     )
//   }
// }

class Root extends React.Component {
  render() {
    return (
      <Router>
        <AlertProvider template={AlertTemplate} {...options}>
          <Menu />
          <Routing />
        </AlertProvider>
      </Router>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
