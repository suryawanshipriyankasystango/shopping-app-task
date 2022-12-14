import React from 'react';
// import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux"
import { BrowserRouter } from 'react-router-dom';
import store from "./store.js"


// const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
     <React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')

);


