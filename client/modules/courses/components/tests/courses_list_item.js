import React from 'react';
import {expect} from 'chai';
const {describe, it} = global;
import {spy} from 'sinon';
import {shallow} from 'enzyme';
import CoursesListItem from '../courses_list_item.jsx';

describe('courses.components.courses_list_item', () => {
  it('should show a title', () => {
    const props = {
      _id: '1',
      title: 't-1',
      description: 'desc',
      onRemove: spy()
    };

    const el = shallow(<CoursesListItem {...props}/>);
    const title = el.find({children: props.title});
    expect(title.length).to.be.equal(1);
  });
  it('should show a description', () => {
    const props = {
      _id: '1',
      title: 't-1',
      description: 'desc',
      onRemove: spy()
    };

    const el = shallow(<CoursesListItem {...props}/>);
    const description = el.find({children: props.description});
    expect(description.length).to.be.equal(1);
  });
  it('should call onRemove when .remove is clicked', () => {
    const props = {
      _id: '1',
      title: 't-1',
      description: 'desc',
      onRemove: spy()
    };

    const el = shallow(<CoursesListItem {...props}/>);
    const remove = el.find('.remove');
    remove.simulate('click');
    expect(props.onRemove.calledOnce).to.be.equal(true);
  });
});
