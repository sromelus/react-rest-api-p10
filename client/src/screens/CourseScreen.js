import React from 'react';

export default ({title, id}) => {
    return (
      <>
      <div className="grid-33">
        <a className="course--module course--link" href={`courses/${id}`}>
          <h4 className="course--label">Course</h4>
          <h3 className="course--title">{title}</h3>
        </a>
      </div>
      </>
    );
}
