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
import DeleteCourse from './components/DeleteCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
import withcontext from './Context';
import PrivateRoute from './PrivateRoute';

const HeaderWithContext = withcontext(Header);
const UserSignInWithContext = withcontext(UserSignIn);
const UserSignUpWithContext = withcontext(UserSignUp);
const UserSignOutWithContext = withcontext(UserSignOut);
const CreateCourseWithContext = withcontext(CreateCourse);
const UpdateCourseWithContext = withcontext(UpdateCourse);
const CourseDetailWithContext = withcontext(CourseDetail);
const DeleteCourseWithContext = withcontext(DeleteCourse);
const CoursesWithContext = withcontext(Courses);

export default () => {
  return (
    <Router>
      <div>
        <HeaderWithContext />
        <Switch>
          <Route exact path="/" component={CoursesWithContext} />
          <Route exact path="/courses" component={CoursesWithContext} />
          <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
          <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
          <PrivateRoute path="/courses/:id/delete" component={DeleteCourseWithContext} />
          <Route exact path="/courses/:id" component={CourseDetailWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <Route path="/forbidden" component={Forbidden} />
          <Route path="/error" component={UnhandledError} />
          <Route path="/notfound" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}
