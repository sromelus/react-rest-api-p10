import React from 'react';
import { Redirect } from 'react-router-dom';

export default (props) => {

  return (
    <Redirect to={{
      pathname: '/',
      state: { from: props.location }
    }}/>
  );
}
