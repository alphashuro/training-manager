import React from 'react';
import {expect} from 'chai';
const {describe, it} = global;
import {spy} from 'sinon';
import {shallow} from 'enzyme';
import Course from '../course.jsx';

describe('courses.components.course', () => {
  const getProps = () => ({
    error: null,
    course: {
      _id: 'id',
      title: 'title',
      description: 'description',
    },
    handleUpdate: spy(),
  });
  describe('if there is error', () => {
    it('should render error', () => {
      const props = getProps();
      props.error = 'oops';

      const el = shallow(<Course {...props}/>);
      expect(el.contains('oops')).to.be.equal(true);
    });
  });
  it('should have an input with title in the form', () => {
    const props = getProps();

    const el = shallow(<Course {...props}/>);
    const form = el.find('form[name="edit-course"]');

    const titleInput = form.find('Input[name="title"]');
    expect(titleInput).to.have.length(1);
    console.log(titleInput);
    expect(titleInput.prop('defaultValue')).to.be.equal(props.course.title);
  });
  it('should render an input with description', () => {
    const props = getProps();

    const el = shallow(<Course {...props}/>);
    const form = el.find('form[name="edit-course"]');

    const descriptionInput = form.find('Input[name="description"]');
    expect(descriptionInput).to.have.length(1);
    expect(descriptionInput.prop('defaultValue')).to.be.equal(props.course.description);
  });
  it('should call handleUpdate when form is submitted', () => {
    const props = getProps();

    const el = shallow(<Course {...props}/>);
    const form = el.find('form[name="edit-course"]');

    form.simulate('submit');
    expect(props.handleUpdate.calledOnce);
  });
});
