
import React, { Component } from 'react';

export default class UserSignUp extends Component {
  constructor(){
    super()
    this.state = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      confirmPassword: ""
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

  render(){
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <form>
              <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={this.handleFirstNameChange} value={this.state.firstName}/></div>
              <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={this.handleLastNameChange} value={this.state.lastName}/></div>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.handleEmailChange} value={this.state.emailAddress}/></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.handlePasswordChange} value={this.state.password}/></div>
              <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" onChange={this.handleConfirmPasswordChange} value={this.state.confirmPassword}/></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <a href="/signin">Click here</a> to sign in!</p>
        </div>
      </div>
    );
  }
}


// <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={this.handleFirstNameChange} value={this.state.firstName}/></div>



// UserSignUp - This component provides the "Sign Up" screen by rendering a form that allows a user to sign up by creating a new account. The component also renders a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and signs in the user. This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).
