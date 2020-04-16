import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CourseScreen from '../screens/CourseScreen';

export default class Courses extends Component {
  constructor(){
    super()
    this.state = {
      courses: [],
      className: "show"
    }
  }


  componentDidMount(){

    const { state } = this.props.location;

    if(state){
      const { pathname } = state.from;
      const isSingOutPath = (pathname === "/signout")
      //check if previous location path is "/signout"
      if (isSingOutPath) {
        this.props.context.actions.signOut();
      }
    }

    fetch('http://localhost:5000/api/courses')
    .then(res => {
      if(res.ok){
        return res;
      }
    })
    .then(res => res.json())
    .then(body => {
      this.setState({
        courses: body.courses,
        className: "hidden"
      })
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
        <h1 className={this.state.className}> Loading... </h1>

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
