import React, { Component } from 'react';
import Cookies from 'js-cookie';
const Context = React.createContext();

export class Provider extends Component {
  constructor(){
    super()
    this.state = {
      user: "",
      userCredential: "",
      course: ""
    }
  }

  /**
   * Set mounted course detail to global state.
   * @param {object} Course.
   * @returns {update state object} Update this.state.course
   */

  makeCurrentCourseGlobal = (course) => {
    this.setState({
      course: course
    })
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
        .then(name => {
          this.setState({
            user: {
              firstName: name.firstName,
              lastName: name.lastName
            },
            userCredential: {
              emailAddress,
              password
            }
          })
        })
      } else {
        return res;
      }
    })
    return fetchRes;
  }

  signOut = () => {
    this.setState({ user: null });
  }


  render(){
    const { user, userCredential, course } = this.state;


    const value = {
      user,
      userCredential,
      course,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        makeCurrentCourseGlobal: this.makeCurrentCourseGlobal
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

// dynamically display erros based on the http response status
export const ErrorsDisplay = ({ errors }) => {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
}
