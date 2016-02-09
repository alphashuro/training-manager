import React, { Component } from 'react';

import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';

class StudentsList extends Component {
  render() {
    const {students} = this.props;

    return (
      <div>Students list</div>

    );
  }
};

export default StudentsList;
