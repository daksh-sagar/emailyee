import React, { Component } from 'react';
import {connect} from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import * as actions from '../actions/index';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        amount={500}
        name={'Emailyee'}
        description={'$5 for five survey credits'}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
