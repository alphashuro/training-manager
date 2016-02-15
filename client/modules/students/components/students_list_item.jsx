import React, { Component } from 'react';

import {Input, ListGroupItem, Glyphicon, Button} from 'react-bootstrap';

class StudentsListItem extends Component {
  render() {
    const {_id, name, phone, email, remove} = this.props;
    return (
      <ListGroupItem>
        <Input
          type='text'
          placeholder='Name'
          label='Name'
          defaultValue={name}
          ref='nameRef'/>
        <div className="form-inline">
          <Input
            type='text'
            placeholder='Phone'
            addonBefore={<Glyphicon glyph='earphone'/>}
            ref='phoneRef'
            defaultValue={phone} />
          <Input
            type='email'
            placeholder='Email'
            addonBefore='@'
            ref='emailRef'
            defaultValue={email} />
        </div>
        <div className="inline-form">
          <Button onClick={this._save.bind(this)}>Save</Button>
          <Button onClick={remove.bind(this, _id)}>Delete</Button>
        </div>
      </ListGroupItem>
    );
  }

  _save() {
    const {student, update} = this.props;
    const {nameRef, phoneRef, emailRef} = this.refs;

    const name = nameRef.getValue();
    const phone = phoneRef.getValue();
    const email = emailRef.getValue();

    update(student._id, { name, phone, email });
  }
}

export default StudentsListItem;
