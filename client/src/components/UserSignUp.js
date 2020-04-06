
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UserSignUp extends Component {
  constructor(){
    super()
    this.state = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
      errors: []
    }
  }

  cancel = (e) => {
    e.preventDefault()
    this.props.history.push('/');
  }

  handleLastNameChange = (e) => {
    this.setState({
      lastName: e.target.value
    })
  }

  handleFirstNameChange = (e) => {
    this.setState({
      firstName: e.target.value
    })
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

  handleConfirmPasswordChange = (e) => {
    this.setState({
      confirmPassword : e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {firstName, lastName, emailAddress, password, confirmPassword } = this.state
    console.log(firstName, lastName, emailAddress, password, confirmPassword);

    const user = { firstName, lastName, emailAddress, password }

    fetch('http://localhost:5000/api/users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(user)
    })
    .then(res => {
      if (res.status === 201) {
        return [];
      } else if (res.status === 400){
        return res.json()
          .then(body => {
            this.setState({
              errors: body.errors
            })
          })
      } else if (res.status === 409){
        return res.json()
          .then(body => {
            this.setState({
              errors: body.error.split()
            })
          })
      } else {
        let errorMessage = `${res.status}(${res.statusText})` ,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  render(){
    // const {firstName, lastName, emailAddress, password, confirmPassword } = this.state
    console.log(this.state.errors);

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <ErrorsDisplay errors={this.state.errors}/>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={this.handleFirstNameChange} value={this.state.firstName}/>
              </div>
              <div>
                <input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={this.handleLastNameChange} value={this.state.lastName}/>
              </div>
              <div>
                <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.handleEmailChange} value={this.state.emailAddress}/>
              </div>
              <div>
                <input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.handlePasswordChange} value={this.state.password}/>
              </div>
              <div>
                <input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" onChange={this.handleConfirmPasswordChange} value={this.state.confirmPassword}/>
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
        </div>
      </div>
    );
  }
}

function ErrorsDisplay({ errors }) {
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



// UserSignUp -  The component also renders a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and signs in the user. This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).
