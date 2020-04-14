import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {

  const { user } = props.context;

  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo" title="Click to navigate to homepage"><Link to="/">Courses</Link></h1>
        {/* Use ternary operator to condionaly display the signin and singout buttons based on user Authorization */}
        { user ?
          <nav>
            <span>Welcome, {user.firstName}!</span>
            <Link className="signout" to="/signout">Sign Out</Link>
          </nav>
          :
          <nav>
            <Link className="signup" to="/signup">Sign Up</Link>
            <Link className="signin" to="/signin">Sign In</Link>
          </nav>
        }
      </div>
    </div>
  );
}
