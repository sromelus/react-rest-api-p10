import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';

export default () => {

  return (
    <Router>
      <div>
        <Header />
        <CourseDetail />
      </div>
    </Router>
  )
}

// <Courses />
