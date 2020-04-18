import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CourseScreen = ({title, id}) => {
    return (
      <>
        <div className="grid-33">
          <Link className="course--module course--link" to={`courses/${id}`}>
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{title}</h3>
          </Link>
        </div>
      </>
    );
}

CourseScreen.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number
};

export default CourseScreen;
