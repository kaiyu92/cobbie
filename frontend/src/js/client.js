import React from "react";
import ReactDOM from "react-dom";
import Routes from './routes.js';

//Run startup scripts
import './startup/injectTapEventPlugin';

ReactDOM.render(<Routes/>, document.getElementById('app'));

