import React from 'react';
const {describe, it} = global;
import {expect} from 'chai';
import {shallow, render} from 'enzyme';
import {assert, spy} from 'sinon';
import StudentsListItem from '../students_list_item.jsx';

describe('students.components.student_list_item', () => {
  const getProps = () => ({
    _id: 'id',
    name: 'name',
    phone: 'phone',
    email: 'email',
    ID: 'ID',
    handleRemove: spy(),
    handleUpdate: spy(),
  });
  it('should show an input with the name', () => {
    const props = getProps();

    const el = render(<StudentsListItem {...props}/>);
    const form = el.find('form[name="edit-student"]');

    const nameInput = form.find('input[name=name]');

    expect(nameInput).to.have.length(1);
    expect(nameInput.get(0).attribs.value).to.be.equal(props.name);
  });
  it('should show an input with the phone', () => {
    const props = getProps();

    const el = render(<StudentsListItem {...props} />);
    const form = el.find('form[name="edit-student"]');

    const phoneInput = form.find('input[name=phone]');

    expect(phoneInput).to.have.length(1);
    expect(phoneInput.get(0).attribs.value).to.be.equal(props.phone);
  });
  it('should show an input with the email', () => {
    const props = getProps();

    const el = render(<StudentsListItem {...props} />);
    const form = el.find('form[name="edit-student"]');

    const emailInput = form.find('input[name=email]');

    expect(emailInput.length).to.be.equal(1);
    expect(emailInput.get(0).attribs.value).to.be.equal(props.email);
  });
  it('should show an input with the ID', () => {
    const props = getProps();

    const el = render(<StudentsListItem {...props} />);
    const form = el.find('form[name="edit-student"]');

    const IDInput = form.find('input[name=ID]');

    expect(IDInput.length).to.be.equal(1);
    expect(IDInput.get(0).attribs.value).to.be.equal(props.ID);
  });
  it('should call remove when .remove is clicked', () => {
    const props = getProps();

    const el = shallow(<StudentsListItem {...props}/>);
    const removeButton = el.find('[name="remove"]');
    removeButton.simulate('click');
    expect(props.handleRemove.calledOnce).to.be.equal(true);
    assert.calledWithExactly(props.handleRemove, props._id);
  });

  it('should call handleUpdate when form is submitted', () => {
    const props = getProps();

    const el = shallow(<StudentsListItem {...props}/>);
    const form = el.find('form[name="edit-student"]');
    form.simulate('submit');
    expect(props.handleUpdate.calledOnce).to.be.equal(true);
  });
});
