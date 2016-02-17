import React, { Component } from 'react';

import {Input, ListGroupItem, Glyphicon, Button} from 'react-bootstrap';

class StudentsListItem extends Component {
  render() {
    const {_id, name, phone, ID, email, remove} = this.props;
    return (
      <ListGroupItem>
          <div className="form-inline">
            <Input
              type='text'
              id='name'
              ref='nameRef'
              placeholder='Name'
              addonBefore='Name'
              defaultValue={name}
              />
            <Input
              type='text'
              id='ID'
              ref='IDRef'
              placeholder='ID'
              addonBefore='ID'
              defaultValue={ID}
              />
          </div>
        <div className="form-inline">
          <Input
            type='text'
            id='phone'
            ref='phoneRef'
            placeholder='Phone'
            addonBefore={<Glyphicon glyph='earphone'/>}
            defaultValue={phone}
            />
          <Input
            type='email'
            id='email'
            ref='emailRef'
            placeholder='Email'
            addonBefore='@'
            defaultValue={email}
            />
        </div>
        <div className="inline-form">
          <Button
            ref='saveRef'
            className='save'
            onClick={this._save.bind(this)}>
              Save
          </Button>
          <Button
            ref='removeRef'
            className='remove'
            onClick={remove.bind(this, _id)}>
              Delete
          </Button>
        </div>
      </ListGroupItem>
    );
  }

  _save() {
    const {_id, update} = this.props;
    const {nameRef, phoneRef, emailRef, IDRef} = this.refs;

    const name = nameRef.getValue();
    const phone = phoneRef.getValue();
    const email = emailRef.getValue();
    const ID = IDRef.getValue();

    update(_id, { name, phone, email, ID });
  }
}

export default StudentsListItem;
