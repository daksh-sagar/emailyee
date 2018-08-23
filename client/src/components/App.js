import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions/index'
import './App.css';
import Header from './Header'
import Landing from './Landing'
const Dashboard = () => <h2>Dashboard</h2>;

class App extends Component {
  componentDidMount(){
    this.props.fetchUser()
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Header />
            <div className='container'>
          <Switch>
            <Route path='/dashboard' component={Dashboard}/>
            <Route exact path='/' component={Landing}/>
          </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(null, actions)(App);
