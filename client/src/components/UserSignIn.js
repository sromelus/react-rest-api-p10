
import React, { Component } from 'react';

export default class UserSignIn extends Component {
  constructor(){
    super()
    this.state = {
      emailAddress: "",
      password: "",
      currentUser: "",
      user: "",
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { signIn } = this.props.context.actions;
    const { from } = this.props.location.state;
    const { emailAddress, password } = this.state;

    signIn(emailAddress, password)
    .then(res => {
      if(res === undefined) {
        this.props.history.push(from);
      } else if(res.status === 401) {
          this.setState({
              errors: [ 'Sign-in was unsuccessful' ]
          });
      }
    })
    .catch(err => {
      console.log(err);
      this.props.history.push('/error');
    })
  }


  render(){

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <ErrorsDisplay errors={this.state.errors}/>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.handleChange} value={this.state.emailAddress}/></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.handleChange} value={this.state.password}/></div>
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
