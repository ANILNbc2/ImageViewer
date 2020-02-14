import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./Common/Header/Header";

class App extends Component {
  render(){
    return (
      <div>
        <Header/>
        Image Loader from app
      </div>
    );
  }
}

export default App;
