import React from 'react';
import {expect} from 'chai';
const {describe, it} = global;
import {spy, assert} from 'sinon';
import {shallow} from 'enzyme';
import ClassesListItem from '../classes_list_item.jsx';

describe('class.components.class_list_item', () => {
  const getProps = () => ({
    _id: '1',
    title: 'title',
    description: 'description',
    duration: 1,
    price: 1,
    handleUpdate: spy(),
    handleRemove: spy(),
  });

  it('should show the title', () => {
    const props = getProps();

    const el = shallow(<ClassesListItem {...props}/>);
    const form = el.find('form[name="edit-class"]').render();

    const title = form.find('input[name="title"]');
    expect(title).to.have.length(1);
    expect(title.get(0).attribs.value).to.be.equal(props.title)
  });
  it('should show the description', () => {
    const props = getProps();

    const el = shallow(<ClassesListItem {...props}/>);
    const form = el.find('form[name="edit-class"]').render();

    const description = form.find('input[name="description"]');
    expect(description).to.have.length(1);
    expect(description.get(0).attribs.value).to.be.equal(props.description)
  });
  it('should show the duration', () => {
    const props = getProps();

    const el = shallow(<ClassesListItem {...props}/>);
    const form = el.find('form[name="edit-class"]').render();

    const duration = form.find('input[name="duration"]');
    expect(duration).to.have.length(1);
    expect(Number(duration.get(0).attribs.value)).to.be.equal(props.duration)
  });
  it('should show the price', () => {
    const props = getProps();

    const el = shallow(<ClassesListItem {...props}/>);
    const form = el.find('form[name="edit-class"]').render();

    const price = form.find('input[name="price"]');
    expect(price).to.have.length(1);
    expect(Number(price.get(0).attribs.value)).to.be.equal(props.price)
  });
  it('should call handleRemove with given id when remove button is clicked', () => {
    const props = getProps();

    const el = shallow(<ClassesListItem {...props}/>);

    const removeButton = el.find('Button[name="remove"]');
    removeButton.simulate('click');

    expect(props.handleRemove.calledOnce).to.be.equal(true);
    assert.calledWithExactly(props.handleRemove, props._id);
  });
  it('should call handleUpdate with id when form is submitted', () => {
    const props = getProps();

    const el = shallow(<ClassesListItem {...props}/>);
    const form = el.find('form[name="edit-class"]');

    form.simulate('submit');

    assert.calledOnce(props.handleUpdate);
    assert.calledWith(props.handleUpdate, props._id);
  });
});
