import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class DeleteCourse extends Component {


  submit = (e) => {
    e.preventDefault();

    const { emailAddress, password } = this.props.context.userCredential;

    const encodedCredentials = btoa(`${emailAddress}:${password}`);

    const { id } = this.props.match.params;

    fetch(`http://localhost:5000/api/courses/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Basic ${encodedCredentials}`
        }
      })
      .then(res => {
        if (res.status === 204) {
          this.props.history.push('/');
          return [];
        } else if (res.status === 403){
          this.props.history.push('/forbidden');
          return [];
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      })
  }

  render(){

    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
            <p> Are you sure want to delete this course?</p>
              <Link className="button button-secondary" to="/">CANCEL</Link>
              <button className="button" onClick={this.submit}>YES</button>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">title</h3>
              <p>By Allen Malta</p>
            </div>
            <div className="course--description">
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
