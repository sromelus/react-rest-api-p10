import React, { Component } from 'react';

export default class DeleteCourse extends Component {

  constructor(){
    super()
    this.state = {
      title: ""
    }
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

  submit = (e) => {
    e.preventDefault();

    const { encodedCredentials } = this.props.context.user;

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
        } else if (res.status === 401){
            return res.json()
            .then(body => {
              this.setState( prevState => ({
                errors: body.message
              }))
            })
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      })
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



  render(){

    const { firstName, lastName } = this.props.context.user;
    const { title } = this.state;


    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
            <p> Are you sure want to delete this course?</p>
              <button className="button button-secondary" onClick={this.cancel}>CANCEL</button>
              <button className="button" onClick={this.submit}>YES</button>
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
