import React, { Component } from 'react';
import './App.css';

class App extends Component {
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
      } else {
        let errorMessage = `${res.status} (${res.statusText})`
        const error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(res => res.json())
    .then(res => {
      this.setState({ courses: res.courses})
      console.log(this.state.courses);
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    
    const courses = this.state.courses.map(course => <li>{course.title}</li>)


    return (
      <div className="">
        <header className="">
          <ul>
            {courses}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
