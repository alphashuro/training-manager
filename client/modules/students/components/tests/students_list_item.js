import React from 'react';
const {describe, it} = global;
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import {spy} from 'sinon';
import StudentsListItem from '../students_list_item.jsx';

var jsdom = require('jsdom').jsdom;

var exposedProperties = [ 'window', 'navigator', 'document' ];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

describe('students.components.student_list_item', () => {
  it('should show an input with the name', () => {
    const props = {
      _id: '1',
      name: 's1',
      phone: '123',
      email: 'e1@e.com',
      remove: spy()
    };

    const el = shallow(<StudentsListItem {...props} />);
    expect(el.find({ defaultValue: props.name }).length).to.be.equal(1);
  });
  it('should show an input with the phone', () => {
    const props = {
      _id: '1',
      name: 's1',
      phone: '123',
      email: 'e1@e.com',
      remove: spy()
    };

    const el = shallow(<StudentsListItem {...props} />);
    expect(el.find({ defaultValue: props.phone }).length).to.be.equal(1);
  });
  it('should show an input with the email', () => {
    const props = {
      _id: '1',
      name: 's1',
      phone: '123',
      email: 'e1@e.com',
      remove: spy()
    };

    const el = shallow(<StudentsListItem {...props} />);
    expect(el.find({ defaultValue: props.email }).length).to.be.equal(1);
  });
  it('should call remove when .remove is clicked', () => {
    const props = {
      _id: '1',
      name: 's1',
      phone: '123',
      email: 'e1@e.com',
      remove: spy()
    };

    const el = shallow(<StudentsListItem {...props}/>);
    el.find('Button.remove').simulate('click');
    expect(props.remove.calledOnce).to.be.equal(true);
  });

  it('should call update when .save is clicked', () => {
    const props = {
      _id: '1',
      name: 's1',
      phone: '123',
      email: 'e1@e.com',
      remove: spy(),
      update: spy()
    };

    const el = mount(<StudentsListItem {...props}/>);
    el.find('Button.save').simulate('click');
    expect(props.update.calledOnce).to.be.equal(true);
  });
});
