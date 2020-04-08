import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends PureComponent {
    render() {
      const { authenticatedUser } = this.props.context;

      return (
        <div className="header">
          <div className="bounds">
            <h1 className="header--logo"><Link to="/">Courses</Link></h1>
            { authenticatedUser ?
              <nav>
                <span>Welcome, {authenticatedUser.name}!</span>
                <a className="signin" href="/signout">Sign Out</a>
              </nav>
              :
              <nav>
                <a className="signup" href="/signup">Sign Up</a>
                <a className="signin" href="/signin">Sign In</a>
              </nav>
            }
          </div>
        </div>
      );
    }
}




// Header- Displays the top menu bar for the application and includes buttons for signing in and signing up (if there's not an authenticated user) or the user's first and last name and a button for signing out (if there's an authenticated user).
