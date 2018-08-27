import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Homeuser from './containners/Homeuser';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import Modal from 'react-modal';
import Root from './Root';

require("react-big-calendar/lib/css/react-big-calendar.css")

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
