import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';

export default () => {

  return (
    <div>
      <Header />
      <Courses />
    </div>
  )
}

// <Courses />
