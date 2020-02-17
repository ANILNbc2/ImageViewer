import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './screens/login/Login';


class Index extends Component {
    constructor() {
      super();
      this.baseUrl = 'https://api.instagram.com/v1/users/self/';
    }
    render() {
      return (
        <Router>
          <div className="main-container">
            <Route exact path='/' render={(props) => <Login {...props} baseUrl={this.baseUrl} />} />            
          </div>
        </Router>
      )
    }
  }

ReactDOM.render(<Index />, document.getElementById('root'));
