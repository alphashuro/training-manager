import React,{Component} from 'react';

import {ListGroupItem, Input, Button} from 'react-bootstrap';

class ClassesListItem extends Component {
  render() {
    const {title, description, duration, price} = this.props;

    return (
      <ListGroupItem>
        <Input
          type='text'
          name='classTitle'
          placeholder='Title'
          label='Title'
          defaultValue={title}
          ref={input => this.title = input} />
        <Input
          type='text'
          name='classDescription'
          placeholder='Description'
          label='Description'
          ref={input => this.description = input}
          defaultValue={description} />
        <div className="form-inline">
          <Input
            type='number'
            name='classDuration'
            placeholder='Duration'
            addonAfter='hrs'
            ref={input => this.duration = input}
            defaultValue={duration} />
          <Input
            type='number'
            name='classPrice'
            placeholder='Price'
            addonBefore='R'
            ref={input => this.price = input}
            defaultValue={price} />
        </div>
        <div className="inline-form">
          <Button
          className='update'
          onClick={() => {
            const {update, _id} = this.props;

            const title = this.title.getValue();
            const description = this.description.getValue();
            const duration = Number(this.duration.getValue());
            const price = Number(this.price.getValue());

            update(_id, { title, description, duration, price });
          }}>Save</Button>
          <Button
          className='remove'
          onClick={()=> {
            const {remove, _id} = this.props;
            remove(_id);
          }}
          >Delete</Button>
        </div>
      </ListGroupItem>
    );
  }
}

export default ClassesListItem;
