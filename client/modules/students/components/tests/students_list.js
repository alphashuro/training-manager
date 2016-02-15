const {describe, it} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {spy} from 'sinon';
import StudentsList from '../students_list.jsx';
import React from 'react';

describe('students.components.studentslist', () => {
  const students = [
    {
      _id: '1',
      name: 's-one',
      phone: 'sp-one',
      email: 's1@email.com',
      clientId: 'client-one'
    },
    {
      _id: '2',
      name: 's-two',
      phone: 'sp-one',
      email: 's2@email.com',
      clientId: 'client-one'
    }
  ];

  it('should list the given number of students', () => {
    const props = {
      create: spy(),
      update: spy(),
      remove: spy(),
      clientId: 'client-one'
    };

    const el = shallow(<StudentsList students={students} {...props} />);
    expect(el.find('StudentListItem').length).to.be.equal(students.length);
  });

  // it('should list student ');
});
