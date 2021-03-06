import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// ReactMarkdown provides the formating style to display the list of materials for courses
const ReactMarkdown = require('react-markdown')


export default class CourseDetail extends Component {
  constructor(){
    super()
    this.state = {
      course: '',
      materialsNeeded: '',
      userCourse: ''
    }
  }

  componentDidMount(){
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
        course: body.course,
        materialsNeeded: body.course.materialsNeeded,
        userCourse: body.course.userCourse
      })
    })
    .catch( error => {
      console.error(error);
      this.props.history.push(error.path);
    })
  }

  /**
   * displayPlayButton takes user information as parameter and return update and delete buttons if signed in user and course owner
   has identical email address
   * @param {object, string, integer} currentUser. courseOwnerEmail. id.
   * @returns {jsx} update and delete button 
   * add update and delete buttons to the course detail component
   */
displayPlayButton = (currentUser, courseOwnerEmail, id) => {
    if(currentUser){
      if(currentUser.emailAddress === courseOwnerEmail) {
        return (
          <>
            <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
            <Link className="button" to={`/courses/${id}/delete`}>Delete Course</Link>
          </>
        )
      }
    }
  }

  render(){
    const { title, description, estimatedTime } = this.state.course;
    const { firstName, lastName, emailAddress} = this.state.userCourse;
    const { materialsNeeded } = this.state;
    const { id } = this.props.match.params;
    //import from context.js
    const { user } = this.props.context;

    return (
      <div>
      { this.state.course ? (
        <>
          <div className="actions--bar">
            <div className="bounds">
              <div className="grid-100">
                <span>
                  {this.displayPlayButton(user, emailAddress, id)}
                </span>
                <Link className="button button-secondary" to="/">Return to List</Link>
              </div>
            </div>
          </div>
          <div className="bounds course--detail">
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{title}</h3>
                <p>By {`${firstName} ${lastName}`}</p>
              </div>
              <div className="course--description">
                {description}
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <h3>{estimatedTime}</h3>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <ul>
                    {/* ReactMarkdown provides the formating style to display the list of materials for courses */}
                      <ReactMarkdown
                        source={materialsNeeded}
                      />
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>)
        :
        <h1 className="loading"> Loading... </h1>
      }
      </div>
    );
  }
}
