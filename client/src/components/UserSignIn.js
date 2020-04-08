
import React, { Component } from 'react';

export default class UserSignIn extends Component {
  constructor(){
    super()
    this.state = {
      emailAddress: "",
      password: "",
      currentUser: "",
      errors: []
    }
  }

  cancel = (e) => {
    e.preventDefault()
    this.props.history.push('/');
  }

  signIn = () => {
    this.props.history.push('/');
  }

  handleEmailChange = (e) => {
    this.setState({
      emailAddress: e.target.value
    })
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { emailAddress, password } = this.state

    const encodedCredentials = btoa(`${emailAddress}:${password}`);


    fetch('http://localhost:5000/api/users', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Basic ${encodedCredentials}`
      }
    })
    .then(res => {
      if(res.ok) {
        this.signIn();
        return [];
      } else if (res.status === 401){
          return res.json()
          .then(body => {
            this.setState( prevState => ({
              errors: [body.message]
            }))
          })
      } else {
        let errorMessage = `${res.status} (${res.statusText})`
        const error = new Error(errorMessage);
        throw(error);
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  render(){
    const { emailAddress, password } = this.state

    console.log( emailAddress, password );

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <ErrorsDisplay errors={this.state.errors}/>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.handleEmailChange} value={this.state.emailAddress}/></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.handlePasswordChange} value={this.state.password}/></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <a href="/signup">Click here</a> to sign up!</p>
        </div>
      </div>
    );
  }
}

const ErrorsDisplay = ({ errors }) => {
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


// UserSignIn - This component provides the "Sign In" screen by rendering a form that allows a user to sign using their existing account information. The component also renders a "Sign In" button that when clicked signs in the user and a "Cancel" button that returns the user to the default route (i.e. the list of courses).
