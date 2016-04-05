import React, { PropTypes } from 'react';
import {Input, ListGroupItem, Glyphicon, Button} from 'react-bootstrap';

const StudentsListItem = ({_id, name, phone, ID, email, handleRemove, handleUpdate}) => (
  <ListGroupItem>
    <form name='edit-student' onSubmit={handleUpdate.bind(null, _id)}>
      <div className="form-inline">
        <Input type='text' name='name' placeholder='Student x...' addonBefore='Name' defaultValue={name}/>
        <Input type='text' name='ID' placeholder='1234...' addonBefore='ID' defaultValue={ID}/>
      </div>
      <div className="form-inline">
        <Input type='text' name='phone' placeholder='(012) 345 6789' addonBefore={<Glyphicon glyph='earphone'/>} defaultValue={phone}/>
        <Input type='email' name='email' placeholder='student@address.com' addonBefore='@' defaultValue={email} />
      </div>
      <div className="inline-form">
        <Button type='submit'> Save </Button>
        <Button type='button' name='remove' onClick={handleRemove.bind(null, _id)}> Delete </Button>
      </div>
    </form>
  </ListGroupItem>
);

StudentsListItem.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
  ID: PropTypes.string,
  email: PropTypes.string,
  handleRemove: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default StudentsListItem;
