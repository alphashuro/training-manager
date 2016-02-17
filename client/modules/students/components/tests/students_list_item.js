import React from 'react';
const {describe, it} = global;
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import {spy} from 'sinon';
import StudentsListItem from '../students_list_item.jsx';

describe('students.components.student_list_item', () => {
  it('should show an input with the name', () => {
    const props = {
      _id: '1',
      name: 's1',
      phone: '123',
      email: 'e1@e.com',
      ID: 'anidnumber',
      remove: spy()
    };

    const el = mount(<StudentsListItem {...props} />);
    const nameInput = el.ref('nameRef');

    expect(nameInput.length).to.be.equal(1);
    expect(nameInput.prop('defaultValue')).to.be.equal(props.name);
  });
  it('should show an input with the phone', () => {
    const props = {
      _id: '1',
      name: 's1',
      phone: '123',
      email: 'e1@e.com',
      ID: 'anidnumber',
      remove: spy()
    };

    const el = mount(<StudentsListItem {...props} />);
    const phoneInput = el.ref('phoneRef');

    expect(phoneInput.length).to.be.equal(1);
    expect(phoneInput.prop('defaultValue')).to.be.equal(props.phone);
  });
  it('should show an input with the email', () => {
    const props = {
      _id: '1',
      name: 's1',
      phone: '123',
      email: 'e1@e.com',
      ID: 'anidnumber',
      remove: spy()
    };

    const el = mount(<StudentsListItem {...props} />);
    const emailInput = el.ref('emailRef');

    expect(emailInput.length).to.be.equal(1);
    expect(emailInput.prop('defaultValue')).to.be.equal(props.email);
  });
  it('should show an input with the ID', () => {
    const props = {
      _id: '1',
      name: 's1',
      phone: '123',
      email: 'e1@e.com',
      ID: 'anidnumber',
      remove: spy()
    };

    const el = mount(<StudentsListItem {...props} />);
    const IDInput = el.ref('IDRef');
    expect(IDInput.length).to.be.equal(1);
    expect(IDInput.prop('defaultValue')).to.be.equal(props.ID);
  });
  it('should call remove when .remove is clicked', () => {
    const props = {
      _id: '1',
      name: 's1',
      phone: '123',
      email: 'e1@e.com',
      ID: 'anidnumber',
      remove: spy()
    };

    const el = mount(<StudentsListItem {...props}/>);
    const removeButton = el.ref('removeRef');
    removeButton.simulate('click');
    expect(props.remove.calledOnce).to.be.equal(true);
  });

  it('should call update when .save is clicked', () => {
    const props = {
      _id: '1',
      name: 's1',
      phone: '123',
      email: 'e1@e.com',
      ID: 'anidnumber',
      remove: spy(),
      update: spy()
    };

    const el = mount(<StudentsListItem {...props}/>);
    const saveButton = el.ref('saveRef');
    saveButton.simulate('click');
    expect(props.update.calledOnce).to.be.equal(true);
  });
});
