import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class UserSignOut extends Component {

  componentWillUnmount(){
    // signs out current user
    this.props.context.actions.signOut();
  }

  render() {
    return (
      <Redirect to="/" />
    );
  }
}
