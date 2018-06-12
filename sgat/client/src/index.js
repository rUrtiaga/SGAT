import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Sgat from './sgat';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/jquery/dist/jquery.js'
import '../node_modules/bootstrap/dist/js/bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

ReactDOM.render(<Sgat.Menu />, document.getElementById('root'));
registerServiceWorker();
