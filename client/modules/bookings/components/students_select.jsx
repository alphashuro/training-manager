import React from 'react';
import { Alert, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import _ from 'lodash';
Array.prototype.includes = function(value) {
  return _(this).includes(value);
};

const StudentsSelect = ({
  students,
  add, remove,
  bookingId, bookingStudents,
  error
}) => (
  <div>
    <div>Select students</div>
    { error ? <Alert>{ error }</Alert> : null }

    <ListGroup>
      {
        students.map(student => (
          <ListGroupItem key={student._id}>
            <span>{ student.name } </span>
            {
              bookingStudents.includes(student._id) ? (
                <Button
                  className='remove'
                  onClick={ () => remove(bookingId, student._id)}
                  active>
                    Click to Remove
                </Button>
              ) : (
                <Button
                  className='add'
                  onClick={ () => add(bookingId, student._id) }>
                  Click to Add
                </Button>
              )
            }
          </ListGroupItem>
        ))
      }
    </ListGroup>
  </div>
);

export default StudentsSelect;
