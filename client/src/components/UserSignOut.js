import React from 'react';
import { Redirect } from 'react-router-dom';

export default (props) => {
  debugger
  // signs out current user
  props.context.actions.signOut();

  return (
    <Redirect to="/" />
  );
}
