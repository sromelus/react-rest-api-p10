import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import withcontext from './Context';

const HeaderWithContext = withcontext(Header);
const UserSignInWithContext = withcontext(UserSignIn);
const UserSignOutWithContext = withcontext(UserSignOut);
const CreateCourseWithContext = withcontext(CreateCourse);
const UpdateCourseWithContext = withcontext(UpdateCourse);
const CourseDetailWithContext = withcontext(CourseDetail);
const CoursesWithContext = withcontext(Courses);

export default () => {

  return (
    <Router>
      <div>
        <HeaderWithContext />
        <Switch>
          <Route exact path="/" component={CoursesWithContext} />
          <Route path="/courses/create" component={CreateCourseWithContext} />
          <Route path="/courses/:id/update" component={UpdateCourseWithContext} />
          <Route path="/courses/:id" component={CourseDetailWithContext} />
          <Route path="/signup" component={UserSignUp} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}
