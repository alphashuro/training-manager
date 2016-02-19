import React from 'react';
import {expect} from 'chai';
const {describe, it} = global;
import {shallow} from 'enzyme';
import CoursesList from '../courses_list.jsx';

describe('courses.components.courses_list', () => {
  it('should render CousesListItem for each id', () => {
    const coursesIds = [
      '1', '2', '3'
    ];

    const el = shallow(<CoursesList courseIds={coursesIds} />);
    const items = el.find('CoursesListItem');
    expect(items.length).to.be.equal(coursesIds.length);
  });
});
