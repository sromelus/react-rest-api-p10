import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import NotFound from './components/NotFound';

export default () => {

  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Courses} />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

// <Courses />
