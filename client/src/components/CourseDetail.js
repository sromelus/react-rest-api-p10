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
    //destructure the makeCurrentCourseGlobal from props
    const { makeCurrentCourseGlobal } = this.props.context.actions;
    const { id } = this.props.match.params;
    fetch(`http://localhost:5000/api/courses/${id}`)
    .then(res => {
      if(res.ok){
        return res;
      } else if(res.status === 404){
        this.props.history.push('/notfound')
      }
    })
    .then(res => res.json())
    .then(body => {
      this.setState({
        course: body.course,
        materialsNeeded: body.course.materialsNeeded,
        userCourse: body.course.userCourse
      })

      /**
       * makeCurrentCourseGlobal function sets update state course detail to global state.
       * @param {object} Course.
       * @returns {update state object} Update this.state.course
       * makeCurrentCourseGlobal is declared in context.js
       */
      makeCurrentCourseGlobal(this.state.course)
    })
    .catch( err => {
      console.log(err);
      this.props.history.push('/error');
    })
  }

  render(){
    const { id } = this.props.match.params;
    const { title, description, estimatedTime } = this.state.course;
    const { firstName, lastName, emailAddress} = this.state.userCourse;
    const { materialsNeeded } = this.state;
    //import from context.js
    const { user } = this.props.context;

    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
            {/* Use ternary operator to condionaly display the update and delete buttons based on user Authorization*/}
            { !(emailAddress === user.emailAddress) ?
              <span></span>
            :
              <span>
                <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                <Link className="button" to={`/courses/${id}/delete`}>Delete Course</Link>
              </span>
            }
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
      </div>
    );
  }
}
