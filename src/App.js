import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import Store from './Store/configureStore'
import MesFilms from './Page/MesFilms'

export default class App extends Component {

  render(){
    console.log(Store.getState())
    return (
      <Provider store={Store} >
       <MesFilms/> 
      </Provider>
    );
  }
}


