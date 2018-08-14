import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Sgat from './sgat';
import axios from 'axios'
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/jquery/dist/jquery.js'
import '../node_modules/bootstrap/dist/js/bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'; 


//Para las notificaciones
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';


axios.defaults.baseURL = process.env.PROXY_API || 'http://localhost:3001'

// optional cofiguration de las notificaciones
const options = {
    position: 'bottom center',
    timeout: 5000,
    offset: '30px',
    transition: 'scale'
  }
  //Esto es para hacer el template personlizado y que se ajuste mejor al diseño
  // class AlertTemplate extends React.Component {
  //   render () {
  //     // the style contains only the margin given as offset
  //     // options contains all alert given options
  //     // message is the alert message...
  //     // close is a function that closes the alert
  //     const { style, options, message, close } = this.props
   
  //     return (
  //       <div style={style}>
  //         {options.type === 'info' && '!'}
  //         {options.type === 'success' && ':)'}
  //         {options.type === 'error' && ':('}
  //         {message}
  //         <button onClick={close}>X</button>
  //       </div>
  //     )
  //   }
  // }

class Root extends React.Component  {
    render () {
      return (
        <AlertProvider template={AlertTemplate} {...options}>
          <Sgat.Menu />
        </AlertProvider>
      )
    }
  }

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
