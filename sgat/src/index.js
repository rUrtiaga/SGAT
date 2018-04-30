import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Sgat from './sgat';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/jquery/jquery.js'


ReactDOM.render(<Sgat.Menu />, document.getElementById('root'));
registerServiceWorker();
