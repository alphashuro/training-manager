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
          id='name'
          defaultValue={name}
          ref='nameRef'/>
        <div className="form-inline">
          <Input
            type='text'
            placeholder='Phone'
            id='phone'
            addonBefore={<Glyphicon glyph='earphone'/>}
            ref='phoneRef'
            defaultValue={phone} />
          <Input
            type='email'
            placeholder='Email'
            id='email'
            addonBefore='@'
            ref='emailRef'
            defaultValue={email} />
        </div>
        <div className="inline-form">
          <Button className='save' onClick={this._save.bind(this)}>Save</Button>
          <Button className='remove' onClick={remove.bind(this, _id)}>Delete</Button>
        </div>
      </ListGroupItem>
    );
  }

  _save() {
    const {_id, update} = this.props;
    const {nameRef, phoneRef, emailRef} = this.refs;

    const name = nameRef.getValue();
    const phone = phoneRef.getValue();
    const email = emailRef.getValue();

    update(_id, { name, phone, email });
  }
}

export default StudentsListItem;
