import React, { Component } from 'react';
import ErrorsDisplay from '../screens/ErrorsDisplay';

export default class UpdateCourse extends Component {
  constructor(){
    super()
    this.state = {
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      userCourse: "",
      errors: []
    }
  }

  /**
   * Cancel redirect back to the course detail page.
   * @param {object} eventObject.
   */
  cancel = (e) => {
    e.preventDefault()
    const { id } = this.props.match.params;
    this.props.history.push(`/courses/${id}`);
  }

  //update state dynamically base on the event
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount(){
    let emailAddress = ""
    const { user } = this.props.context;

    if(user) {
       emailAddress = user.emailAddress;
    }

    const { id } = this.props.match.params;

    fetch(`http://localhost:5000/api/courses/${id}`)
    .then(res => {
      if(res.ok){
        return res;
      } else {
        let errorMessage = `${res.status} (${res.statusText})`
        let error = new Error(errorMessage);

        if(res.status === 404){
          error = { error, path: '/notfound'}
        } else {
          error = { error, path: '/error'}
        }

        throw(error);
      }
    })
    .then(res => res.json())
    .then(body => {
      this.setState({
        title: body.course.title,
        description: body.course.description,
        estimatedTime: body.course.estimatedTime,
        materialsNeeded: body.course.materialsNeeded,
        userCourse: body.course.userCourse
      })
      //check for user credential validity before allowing the page to render
      if(emailAddress === this.state.userCourse.emailAddress){
        console.log('Access granted');
      } else {
        this.props.history.push('/forbidden');
        console.log('Access denied');
      }
    })
    .catch(error => {
      console.log(error);
      this.props.history.push(error.path);
    })
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, estimatedTime, materialsNeeded } = this.state

    const course = { title, description, estimatedTime, materialsNeeded }

    const { encodedCredentials } = this.props.context.user;

    const { id } = this.props.match.params;

    fetch(`http://localhost:5000/api/courses/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Basic ${encodedCredentials}`
        },
        body: JSON.stringify(course)
      })
      .then(res => {
        if (res.status === 204) {
          this.props.history.push('/');
          return [];
        } else if (res.status === 400 || res.status === 401){
            return res.json()
            .then(body => {
              this.setState( prevState => ({
                errors: body.message
              }))
            })
        } else if (res.status === 403 ){
          this.props.history.push('/forbidden');
          return [];
        } else {
          let errorMessage = `${res.status} (${res.statusText})`
          let error = new Error(errorMessage);
          throw(error);
        }
      })
      .catch( err => {
        console.log(err);
        this.props.history.push('/error');
      })
  }


  render(){
    const { title, description, estimatedTime, materialsNeeded} = this.state;
    const { firstName, lastName } = this.state.userCourse;

    return (
      <div className="bounds course--detail">
        { this.state.userCourse ? (
          <>
          <h1>Update Course</h1>
          <ErrorsDisplay errors={this.state.errors}/>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                      onChange={this.handleChange} value={title}/></div>
                  <p>By {`${firstName} ${lastName}`}</p>
                </div>
                <div className="course--description">
                  <div>
                    <textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.handleChange} value={description}>
                    </textarea>
                  </div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div>
                        <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                          placeholder="Hours" onChange={this.handleChange} value={estimatedTime}/>
                      </div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={this.handleChange} value={materialsNeeded}>
                        </textarea>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button></div>
            </form>
          </div>
          </>)
          :
          (<h1> Loading... </h1>)
        }
      </div>
    );
  }
}
