import React, { Component } from 'react';

import { Panel, PageHeader, Button, Input, ListGroup, ListGroupItem, Alert }
  from 'react-bootstrap';

const ClassesList = ({
  classes,
  saveClass,
  removeClass,
  addClass,
  courseId,
  error
}) => (
  <Panel>
    <PageHeader>
      <span>Classes</span>
      <Button bsStyle="default"
        className="pull-right"
        onClick={ addClass.bind(this, courseId) }
        >
        <span>Add</span>
      </Button>
    </PageHeader>
    { error ? <Alert bsStyle='danger'>{error}</Alert> : null}
    <ListGroup>
      {
        classes.map(c => (
          <ClassListItem c={c} key={ c._id } saveClass={saveClass} removeClass={removeClass} ></ClassListItem>
        ))
      }
    </ListGroup>
  </Panel>
);

class ClassListItem extends Component {
  render() {
    const {c, onSave, onRemove} = this.props;

    return (
      <ListGroupItem>
        <Input
          type='text'
          placeholder='Title'
          label='Title'
          defaultValue={c.title}
          ref='titleRef'/>
        <Input
          type='text'
          placeholder='Description'
          label='Description'
          ref='descriptionRef'
          defaultValue={c.description} />
        <div className="form-inline">
          <Input
            type='number'
            placeholder='Duration'
            addonAfter='hrs'
            ref='durationRef'
            defaultValue={c.duration} />
          <Input
            type='number'
            placeholder='Price'
            addonBefore='R'
            ref='priceRef'
            defaultValue={c.price} />
        </div>
        <div className="inline-form">
          <Button onClick={this._save.bind(this)}>Save</Button>
          <Button onClick={this._remove.bind(this)}>Delete</Button>
        </div>
      </ListGroupItem>
    );
  }

  _save() {
    const {c, saveClass} = this.props;
    const {titleRef, descriptionRef, durationRef, priceRef} = this.refs;

    const title = titleRef.getValue();
    const description = descriptionRef.getValue();
    const duration = +durationRef.getValue();
    const price = +priceRef.getValue();

    saveClass(c._id, { title, description, duration, price });
  }

  _remove() {
    const {removeClass} = this.props;
    const {_id} = this.props.c;

    removeClass(_id);
  }
};

export default ClassesList;
