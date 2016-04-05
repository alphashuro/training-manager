import React from 'react';
import {expect} from 'chai';
const {describe, it} = global;
import {shallow} from 'enzyme';
import {spy} from 'sinon';
import ClassesList from '../classes_list.jsx';

describe('classes.components.classes_list', () => {
  const getProps = () => ({
    error: null,
    classesIds: ['1', '2'],
    courseId: 'id',
    handleAddClass: spy(),
  });
  it('should render ClassesListItem for each id', () => {
    const props = getProps();

    const el = shallow(<ClassesList {...props}/>);
    const items = el.find('ClassesListItem');
    expect(items.length).to.be.equal(props.classesIds.length);
  });
  it('should render error when there is error', () => {
    const props = getProps();
    props.error = 'oops';

    const el = shallow(<ClassesList {...props}/>);
    expect(el.contains(props.error)).to.be.equal(true);
  });
  it('should call handleAddClass when .add is clicked', () => {
    const props = getProps();
    const el = shallow(<ClassesList {...props}/>);
    const add = el.find('.add');
    add.simulate('click');
    expect(props.handleAddClass.calledOnce).to.equal(true);
  });
});
