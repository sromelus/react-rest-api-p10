import React, { Component } from 'react';
import ErrorsDisplay from '../screens/ErrorsDisplay';

export default class CreateCourse extends Component {
  constructor(){
    super()
    this.state = {
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      errors: []
    }
  }

  // redirect to homepage
  cancel = (e) => {
    e.preventDefault()
    this.props.history.push('/');
  }

  //dynamically update state based on event name
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { title, description, estimatedTime, materialsNeeded } = this.state;

    const course = { title, description, estimatedTime, materialsNeeded }

    const { encodedCredentials } = this.props.context.user;

      fetch('http://localhost:5000/api/courses', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Basic ${encodedCredentials}`
        },
        body: JSON.stringify(course)
      })
      .then(res => {
        if (res.status === 201) {
          this.props.history.push('/');
          return [];
        //update the errors state if the request is bad or unthorized
        } else if (res.status === 400 ||res.status === 401 ){
          return res.json()
          .then(body => {
            this.setState({
              errors: body.message
            })
          })
        } else {
          let errorMessage = `${res.status} (${res.statusText})`
          let error = new Error(errorMessage);
          throw(error);
        }
      })
      .catch( err => {
        console.error(err);
        this.props.history.push('/error');
      })
  }

  render(){

    const { user } = this.props.context;

    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <ErrorsDisplay errors={this.state.errors}/>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                    onChange={this.handleChange} value={this.state.title}/></div>
                <p>By
                { user ? ` ${user.firstName} ${user.lastName}` : " "}
                </p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.handleChange} value={this.state.description}></textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        placeholder="Hours" onChange={this.handleChange} value={this.state.estimatedTime}/></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea id="materialsNeeded" name="materialsNeeded" className=""
                        placeholder={'List materials Format Example... \n * Address Line1\n * Address Line2\n * City State\n OR\n 1. Address Line1\n 2. Address Line2\n 3. City State'}
                        onChange={this.handleChange} value={this.state.materialsNeeded}>
                      </textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button></div>
          </form>
        </div>
      </div>
    );
  }
}
