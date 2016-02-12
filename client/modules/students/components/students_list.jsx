import React, { Component } from 'react';

import { Panel, PageHeader, Button, Input, ListGroup, ListGroupItem, Alert, Glyphicon }
  from 'react-bootstrap';

class StudentsList extends Component {
  render() {
    console.log(this.props);
    const { error, students, create, clientId, update, remove } = this.props;

    return (
      <Panel>
        <PageHeader>
          <span>Students</span>
          <Button bsStyle="default"
            className="pull-right"
            onClick={ create.bind(this, clientId) }
            >
            <span>Add</span>
          </Button>
        </PageHeader>
        { error ? <Alert bsStyle='danger'>{error}</Alert> : null}
        <ListGroup>
          {
            students.map(student => (
              <StudentListItem
                student={student}
                key={ student._id }
                saveStudent={update}
                removeStudent={remove} />
            ))
          }
        </ListGroup>
      </Panel>
    );
  }
}

class StudentListItem extends Component {
  render() {
    const {student} = this.props;

    return (
      <ListGroupItem>
        <Input
          type='text'
          placeholder='Name'
          label='Name'
          defaultValue={student.name}
          ref='nameRef'/>
        <div className="form-inline">
          <Input
            type='text'
            placeholder='Phone'
            addonBefore={<Glyphicon glyph='earphone'/>}
            ref='phoneRef'
            defaultValue={student.phone} />
          <Input
            type='email'
            placeholder='Email'
            addonBefore='@'
            ref='emailRef'
            defaultValue={student.email} />
        </div>
        <div className="inline-form">
          <Button onClick={this._save.bind(this)}>Save</Button>
          <Button onClick={this._remove.bind(this)}>Delete</Button>
        </div>
      </ListGroupItem>
    );
  }

  _save() {
    const {student, saveStudent} = this.props;
    const {nameRef, phoneRef, emailRef} = this.refs;

    const name = nameRef.getValue();
    const phone = phoneRef.getValue();
    const email = emailRef.getValue();

    saveStudent(student._id, { name, phone, email });
  }

  _remove() {
    const {removeStudent} = this.props;
    const {_id} = this.props.c;

    removeStudent(_id);
  }
}

export default StudentsList;
