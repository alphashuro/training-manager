import React, { PropTypes } from 'react';

import {ListGroupItem, Input, Button} from 'react-bootstrap';

const ClassesListItem = ({ _id, title, description, duration, price, handleUpdate, handleRemove}) => (
  <ListGroupItem>
    <form name='edit-class' onSubmit={handleUpdate.bind(this, _id)}>
      <Input
        type='text'
        name='title'
        placeholder='Class X...'
        label='Title'
        defaultValue={title}/>
      <Input
        type='text'
        name='description'
        placeholder='In this class you learn...'
        label='Description'
        defaultValue={description}/>
      <div className="form-inline">
        <Input
          type='number'
          name='duration'
          placeholder='10hrs'
          addonAfter='hrs'
          defaultValue={duration}/>
        <Input
          type='number'
          name='price'
          placeholder='2000'
          addonBefore='R'
          defaultValue={price}/>
      </div>
      <div className="inline-form">
        <Button type='submit'>Save</Button>
        <Button name='remove' type='button' onClick={handleRemove.bind(null, _id)}>Delete</Button>
      </div>
    </form>
  </ListGroupItem>
);

ClassesListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  duration: PropTypes.number,
  price: PropTypes.number,
  handleUpdate: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default ClassesListItem;
