
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


  handleChange = (e) => {
    this.setState({
        [e.target.name] : e.target.value
      })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {firstName, lastName, emailAddress, password, confirmPassword } = this.state

    let passErrorMsg;

    if(password !== confirmPassword){
      passErrorMsg = "Password and Confirm Password does not match"
      this.setState( prevState => ({
          errors: [ passErrorMsg ]
      }))
    } else {

      const user = { firstName, lastName, emailAddress, password };

      const { signIn } = this.props.context.actions;

      fetch('http://localhost:5000/api/users', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(user)
      })
      .then(res => {
        if (res.status === 201) {
          signIn(emailAddress, password)
          .then(() => {
              this.props.history.push('/');
            });
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
            this.setState(prevState => ({
              errors: [ body.error ]
            }))
          })
        }
      })
      .catch( err => {
        console.log(err);
        this.props.history.push('/error');
      })
    }
  }


  render() {

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <ErrorsDisplay errors={this.state.errors}/>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={this.handleChange} value={this.state.firstName}/>
              </div>
              <div>
                <input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={this.handleChange} value={this.state.lastName}/>
              </div>
              <div>
                <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.handleChange} value={this.state.emailAddress}/>
              </div>
              <div>
                <input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.handleChange} value={this.state.password}/>
              </div>
              <div>
                <input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" onChange={this.handleChange} value={this.state.confirmPassword}/>
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
              </div>
            </form>
          </div>
          <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
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



// UserSignUp -  The component also renders a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and signs in the user. This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).
