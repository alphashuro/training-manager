import React from 'react';
const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub, assert} from 'sinon';
import {shallow} from 'enzyme';
import NewCourse from '../new_course.jsx';

describe('courses.components.new_course', () => {
  const getProps = () => ({
    error: null,
    handleCreateCourse: spy(),
  });
  describe('if there is error', () => {
    it('should render an alert with error', () => {
      const props = getProps();
      props.error = 'oops';

      const el = shallow(<NewCourse {...props}/>);
      expect(el.contains(props.error)).to.be.equal(true);
    });
  });
  it('should have an input for title', () => {
    const props = getProps();
    const el = shallow(<NewCourse {...props}/>);
    const form = el.find('form[name="new-course"]');

    const titleInput = form.render().find('input[name="title"]');
    expect(titleInput.length).to.be.equal(1);
  });
  it('should have an input for description', () => {
    const props = getProps();
    const el = shallow(<NewCourse {...props}/>);
    const form = el.find('form[name="new-course"]');

    const descriptionInput = form.render().find('input[name="description"]');
    expect(descriptionInput.length).to.be.equal(1);
  });
  it('should call handleCreateCourse when form is submitted', () => {
    const props = getProps();
    const el = shallow(<NewCourse {...props}/>);
    const form = el.find('form[name="new-course"]');

    form.simulate('submit');

    assert.calledOnce(props.handleCreateCourse);
  });
});
