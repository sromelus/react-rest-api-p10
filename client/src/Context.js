import React, { Component } from 'react';
import Cookies from 'js-cookie';
const Context = React.createContext();

export class Provider extends Component {
  constructor(){
    super()
    this.state = {
      user: null
    }
  }

  signIn = async (emailAddress, password, history) => {

    const encodedCredentials = btoa(`${emailAddress}:${password}`);

    const fetchRes = await fetch('http://localhost:5000/api/users', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Basic ${encodedCredentials}`
      }
    })
    .then(res => {
       if(res.ok) {
        return res.json()
        .then(user => {
          this.setState({ user: user.name.firstName })
          history.push('/');
        })
      }
    })
    console.log(fetchRes)
    return fetchRes;
  }

  signOut = () => {
    this.setState({ user: null });
  }


  render(){
    const { user, errors } = this.state;

    const value = {
      user,
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
