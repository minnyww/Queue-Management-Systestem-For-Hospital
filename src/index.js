import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Homeuser from './Homeuser';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import Modal from 'react-modal';
import Root from './Root';

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
