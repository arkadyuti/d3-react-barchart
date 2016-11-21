import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//stylesheets
//import './styles/main.scss';
//import './fonts/font-darkenstone/darkenstone.scss';
import './styles/dashboard.scss';

//Components
import { configureStore } from './store/configureStore';
import { Root } from './containers/Root';
import LayoutComponent from './components/dashboard/trends-chart/jsx/Layout.js';

const store = configureStore();

//Render the application
ReactDOM.render(
	< Provider store={store} >
  		< LayoutComponent />
  	</ Provider >,document.getElementById('root')
);





