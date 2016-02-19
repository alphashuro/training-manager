import React from 'react';
const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import {shallow, mount} from 'enzyme';
import NewCourse from '../new_course.jsx';

describe('courses.components.new_course', () => {
  describe('if there is error', () => {
    it('should render an alert with error', () => {
      const props = {
        error: 'oops'
      };

      const el = shallow(<NewCourse {...props}/>);
      const alert = el.find('Alert[bsStyle="danger"]');
      expect(alert.length).to.be.equal(1);
      expect(alert.prop('children')).to.be.equal(props.error);
    });
  });
  describe('if there is no error', () => {
    it('should not render an alert', () => {
      const props = {
      };

      const el = shallow(<NewCourse {...props}/>);
      const alert = el.find('Alert[bsStyle="danger"]');
      expect(alert.length).to.be.equal(0);
    });
  });
  it('should have an input for title', () => {
    const el = mount(<NewCourse/>);
    const titleI = el.ref('titleRef');
    expect(titleI.length).to.be.equal(1);
  });
  it('should have an input for description', () => {
    const el = mount(<NewCourse/>);
    const descriptionI = el.ref('descriptionRef');
    expect(descriptionI.length).to.be.equal(1);
  });
  it('should call create when save is clicked', () => {
    const props = {
      create: spy()
    };

    const el = mount(<NewCourse {...props}/>);
    const saveBtn = el.ref('saveRef');
    saveBtn.simulate('click');

    expect(props.create.calledOnce).to.be.equal(true);
  });
  it('should pass new title and description on to create', () => {
    const props = {
      create: spy()
    };

    const el = mount(<NewCourse {...props}/>);

    const titleI = el.ref('titleRef').get(0);
    const descriptionI = el.ref('descriptionRef').get(0);
    titleI.getValue = stub().returns('new_title');
    descriptionI.getValue = stub().returns('new_description');

    const saveBtn = el.ref('saveRef');
    saveBtn.simulate('click');

    expect(props.create.args[0]).to.deep.equal([
      'new_title', 'new_description'
    ]);
  });
});
