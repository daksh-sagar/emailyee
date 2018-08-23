import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import Payments from './Payments';

class Header extends Component{
  renderHeaderContent = () => {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <li><a href="/auth/google">LogIn with Google</a>a></li>;
      default:
        return [
          <li key='1'><Payments/></li>,
          <li key='3' style={{margin: '0 5px'}}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key='2'><a href="/auth/logout">Logout</a></li>
        ]
    }
  };
  render(){
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.props.auth ? "/dashboard" : "/" } className="left brand-logo">Emailyee</Link>
          <ul className="right">
            {this.renderHeaderContent()}
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps({ auth }){
  return { auth };
}

export default connect(mapStateToProps)(Header);