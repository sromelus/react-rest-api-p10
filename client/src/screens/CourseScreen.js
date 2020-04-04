import React from 'react';

export default ({title}) => {
    return (
      <>
      <div className="grid-33">
        <a className="course--module course--link" href="course-detail.html">
          <h4 className="course--label">Course</h4>
          <h3 className="course--title">{title}</h3>
        </a>
      </div>
      </>
    );
}
