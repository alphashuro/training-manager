import React from 'react';

import { Alert, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

const StudentsSelect = ({students, add, remove,bookingId, bookingStudents, error}) => (
    <div>
    <div>Select students</div>
    { error ? <Alert>{ error }</Alert> : null }

    <ListGroup>
      {
        (students) ? students.map(student => (
          <ListGroupItem key={student._id}>
            <span>{ student.name } </span>
            {
              bookingStudents.includes(student._id) ? (
                <Button
                  onClick={ remove.bind(this,bookingId, student._id)}
                  active>
                    Click to Remove
                </Button>
              ) : (
                <Button
                  onClick={ add.bind(this,bookingId, student._id)}>
                  Click to Add
                </Button>
              )
            }
          </ListGroupItem>
        )) : null
      }
    </ListGroup>
    </div>
);

export default StudentsSelect;
