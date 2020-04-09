import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends PureComponent {
    render() {
      const { user } = this.props.context;

      return (
        <div className="header">
          <div className="bounds">
            <h1 className="header--logo"><Link to="/">Courses</Link></h1>
            { user ?
              <nav>
                <span>Welcome, {user}!</span>
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
}




// Header- Displays the top menu bar for the application and includes buttons for signing in and signing up (if there's not an authenticated user) or the user's first and last name and a button for signing out (if there's an authenticated user).
