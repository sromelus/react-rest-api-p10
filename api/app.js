'use strict';

const cors = require('cors');
const express = require('express');
const routes = require('./routes')
const morgan = require('morgan');
const users = require('./routes/users');
const courses = require('./routes/courses');
const { sequelize } = require('./db');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// Enable All CORS Requests
app.use(cors());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

const checkDatabaseConnection = (async () => {
  // Check the Database connection.
    try {
      await sequelize.authenticate();
      console.log('Connection to the database successful!');
    } catch (error) {
      console.error('Error connecting to the database: ', error);
    }
})

checkDatabaseConnection();


// Setup a friendly greeting for the root route.
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the course REST API Express!',
  });
});

app.use('/api', routes)
app.use('/api/users', users)
app.use('/api/courses', courses)

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  if(err.name === 'SequelizeUniqueConstraintError' && err.fields.toString() === 'emailAddress'){
    const msg = 'Sorry! An account with this email address already exists, please use another email.'
    err.message = msg;
    err.status = 409;
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
