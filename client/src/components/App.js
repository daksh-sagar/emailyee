import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Header from './Header'
const Dashboard = () => <h2>Dashboard</h2>;
const Landing = () => <h2>Landing</h2>;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Header />
          <Switch>
            <Route path='/dashboard' component={Dashboard}/>
            <Route exact path='/' component={Landing}/>
          </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
