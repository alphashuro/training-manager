import React from 'react';
import {expect} from 'chai';
const {describe, it} = global;
import {shallow} from 'enzyme';
import {spy} from 'sinon';
import ClassesList from '../classes_list.jsx';

describe('classes.components.classes_list', () => {
  it('should render ClassesListItem for each id', () => {
    const classesIds = [
      '1', '2', '3'
    ];

    const el = shallow(<ClassesList classesIds={classesIds} />);
    const items = el.find('ClassesListItem');
    expect(items.length).to.be.equal(classesIds.length);
  });
  it('should render error when there is error', () => {
    const err = 'oops';

    const el = shallow(
      <ClassesList error={err} classesIds={[]} />
    );
    const alert = el.find({children: err});
    expect(alert.length).to.equal(1);
  });
  it('should call addClass when .add is clicked', () => {
    const props = {
      addClass: spy(),
      courseId: 'id',
      classesIds: []
    }
    const el = shallow(
      <ClassesList {...props} />
    );
    const add = el.find('.add');
    add.simulate('click');
    expect(props.addClass.calledOnce).to.equal(true);
  });
});
