import React from 'react';
import { Consumer } from './Context';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: Component }) => {
  debugger
    return (
      <Consumer>
        {context => (
          <Route>
            {Component }
          </Route>
        )}
      </Consumer>
    );
}
