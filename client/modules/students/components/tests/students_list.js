const {describe, it} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {spy} from 'sinon';
import StudentsList from '../students_list.jsx';
import React from 'react';

describe('students.components.studentslist', () => {
  const studentIds = [ '1', '2' ];

  it('should list the given number of students', () => {
    const props = {
      create: spy(),
      clientId: 'client-one',
      studentIds
    };

    const el = shallow(<StudentsList {...props} />);
    expect(el.find('UseDeps(Container(StudentsListItem))').length).to.be.equal(studentIds.length);
  });

  it('should show an error when given error', () => {
    const props = {
      create: spy(),
      clientId: 'client-one',
      studentIds,
      error: 'oops'
    };

    const el = shallow(<StudentsList {...props} />);
    expect(el.find('Alert').length).to.be.equal(1);
  });
});
