import React from 'react';

import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { PageHeader } from 'react-bootstrap';


class NewCourse extends React.Component {
  render() {
    const {error} = this.props;
    return (
      <div>
        <PageHeader >
          <span>New Course</span>
        </PageHeader>
        <Row>
          <Col md={ 6 }
           mdOffset={ 3 }
           >
            {error ? <Alert bsStyle="danger" >{error}</Alert> : null}
            <Input type="text"
              hasFeedback={ false }
              placeholder="Enter the course's title"
              label="Title"
              ref="titleRef"
              ></Input>
            <Input type="description"
              hasFeedback={ false }
              placeholder="Enter the course's description"
              label="Description"
              ref="descriptionRef"
              ></Input>
            <Button
            ref='saveRef'
            onClick={ this._createCourse.bind(this) }
            bsStyle="default" >
              <span >Save</span>
                </Button>
          </Col>
        </Row>
      </div>
    );
  }

  _createCourse() {
    const {create} = this.props;

    const { titleRef, descriptionRef } = this.refs;

    const title = titleRef.getValue();
    const description = descriptionRef.getValue();

    create( title, description );
  }
}

export default NewCourse;
