import React from 'react';
import {Table, PageHeader, Button} from 'react-bootstrap';
import CoursesListItem from '../containers/courses_list_item';

const CoursesList = ({ courseIds }) => (
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
        courseIds.map(id => (
          <CoursesListItem
            key={id}
            courseId={id}
          />
      ))}
      </tbody>
    </Table>
  </div>
);

export default CoursesList;
