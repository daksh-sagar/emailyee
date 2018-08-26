import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions/index'
import './App.css';
import Header from './Header'
import Landing from './Landing'
import Dashboard from './Dashboard'
import NewSurvey from './surveys/SurveyNew'

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
            <Route path='/surveys/new' component={NewSurvey} />
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
