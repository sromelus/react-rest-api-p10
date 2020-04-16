import React, { Component } from 'react';
import Cookies from 'js-cookie';
const Context = React.createContext();

export class Provider extends Component {
  constructor(){
    super()
    this.state = {
      user: Cookies.getJSON('authenticatedUser') || null,
      userCredential: ""
    }
  }

  /**
   * Sing in a user and set the response in global state.
   * @param {string, string} EmailAddress . Password.
   * @returns {promise} A declaration that someting will happen.
   */

  signIn = async (emailAddress, password) => {

    const encodedCredentials = btoa(`${emailAddress}:${password}`);

    const fetchRes = await fetch('http://localhost:5000/api/users', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Basic ${encodedCredentials}`
      }
    })
    .then(res => {
      if(res.status === 200){
        return res.json()
        .then(user => user.name)
        .then(user => {
          this.setState({
            user: {
              firstName: user.firstName,
              lastName: user.lastName,
              emailAddress,
              encodedCredentials
            }
          })
          Cookies.set('authenticatedUser', JSON.stringify(this.state.user), { expires: 1 });
        })
      } else {
        return res;
      }
    })
    return fetchRes;
  }

  signOut = () => {
    Cookies.remove('authenticatedUser');
    this.setState({ user: null });
  }


  render(){
    const { user } = this.state;

    const value = {
      user,
      // Add the 'actions' property and object
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      }
    }

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(OriginalComponent) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <OriginalComponent {...props} context={context} />}
      </Context.Consumer>
    );
  }
}
