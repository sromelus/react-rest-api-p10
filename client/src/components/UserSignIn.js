import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ErrorsDisplay from '../screens/ErrorsDisplay';

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

 // redirect to homepage
  cancel = (e) => {
    e.preventDefault()
    this.props.history.push('/');
  }

  //update state dynamically base on the event
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { signIn } = this.props.context.actions;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { emailAddress, password } = this.state;

    //if the signin response status is 401 - display 'Sign-in was unsuccessful'
    signIn(emailAddress, password)
    .then(res => {
      if(res === undefined) {
        this.props.history.push(from);
      } else if(res.status === 401) {
        this.setState({
            errors: [ 'Sign-in was unsuccessful' ]
        });
      } else {
        let errorMessage = `${res.status} (${res.statusText})`
        let error = new Error(errorMessage);
        throw(error);
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
          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
        </div>
      </div>
    );
  }
}
