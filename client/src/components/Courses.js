import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CourseScreen from '../screens/CourseScreen';

export default class Courses extends Component {
  constructor(){
    super()
    this.state = {
      courses: []
    }
  }


  componentDidMount(){
    fetch('http://localhost:5000/api/courses')
    .then(res => {
      if(res.ok){
        return res;
      }
    })
    .then(res => res.json())
    .then(body => {
      this.setState({ courses: body.courses})
    })
    .catch( err => {
      console.log(err);
      this.props.history.push('/error');
    })
  }

  render(){
    const { user } = this.props.context;
    //map over the courses and return each course within and li tag
    const courses = this.state.courses.map(course => {
      return (
        <CourseScreen
          key={course.id}
          id={course.id}
          title={course.title}
        />
      )
    });

    return (
      <div className="bounds">
        {courses}
        {/* Use ternary operator to condionaly display the create course tag based on user Authorization */}
        { user ?
        <div className="grid-33">
          <Link className="course--module course--add--module" to="/courses/create">
            <h3 className="course--add--title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course
            </h3>
          </Link>
        </div>
        : " "}
      </div>
    );
  }
}
