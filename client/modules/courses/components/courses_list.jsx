import React from 'react';
import {Table, PageHeader, Button} from 'react-bootstrap';

class CoursesList extends React.Component {
  render() {
    const { courses } = this.props;
    return (
      <div>
        <PageHeader>
          Courses
          <Button href='/new-course' className='pull-right'>New Course</Button>
        </PageHeader>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {
            courses.map( course => (
            <tr key={course._id}>
              <td>
                {course.title}
              </td>
              <td>
                {course.description}
              </td>
              <td>
                <Button href={`/courses/${course._id}`}>View</Button>
                <Button onClick={ this.onRemove.bind(this, course._id) }>Delete</Button>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      </div>
    );
  }

  onRemove( _id ) {
    const {remove} = this.props;
    remove(_id);
  }
}

export default CoursesList;
