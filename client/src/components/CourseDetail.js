import React, { Component } from 'react';

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
        const error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        course: res.course,
        materialsNeeded: res.course.materialsNeeded,
        userCourse: res.course.userCourse
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    const { title, description, estimatedTime } = this.state.course;
    const { firstName, lastName } = this.state.userCourse;
    const { materialsNeeded } = this.state;

    let materialsList = []
    if(materialsNeeded.charAt() === '*'){
      materialsList = materialsNeeded.split('*');
      materialsList.shift()
    } else {
      materialsList = materialsNeeded.split(',');
    }

    let materialKey = 0
    const formattedMaterialsList = materialsList.map(material => {
      materialKey += 1;
      return (
        <li key={materialKey}>{material}</li>
      )
    })

    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100"><span><a className="button" href="update-course.html">Update Course</a><a className="button" href="#">Delete Course</a></span><a
                className="button button-secondary" href="/">Return to List</a></div>
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
                  <h3>{estimatedTime} hours</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    {formattedMaterialsList}
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
